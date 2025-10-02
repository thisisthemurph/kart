from fastapi import FastAPI, Depends, HTTPException
from db.database import engine, Base
from db.init_db import init_database
from dependencies import Repositories, get_repositories
from typing import List as ListType
import schemas.responses as response
import schemas.requests as request

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize database with seed data
init_database()
app = FastAPI()

@app.get("/list", response_model=ListType[response.ShoppingListResponse])
def get_all_lists(repos: Repositories = Depends(get_repositories)):
    lists = repos.shopping_list_repo.get_all()
    return [response.ShoppingListResponse.from_orm(list) for list in lists]

@app.get("/list/{list_id}", response_model=response.ShoppingListWithItemsResponse)
def get_list(list_id: int, repos: Repositories = Depends(get_repositories)):
    shopping_list_repo = repos.shopping_list_repo
    
    shopping_list = shopping_list_repo.get_by_id(list_id)
    if shopping_list is None:
        raise HTTPException(status_code=404, detail="List not found")

    items = [response.ItemResponse.from_orm(i) for i in shopping_list.items]
    return response.ShoppingListWithItemsResponse(id=shopping_list.id, name=shopping_list.name, items=items)

@app.post("/list", response_model=response.ShoppingListResponse)
def create_list(list: request.ShoppingListCreate, repos: Repositories = Depends(get_repositories)):
    shopping_list = repos.shopping_list_repo.create(list.name)
    return response.ShoppingListResponse.from_orm(shopping_list)

@app.post("/list/{list_id}/item", response_model=response.ItemResponse)
def create_item(list_id: int, item: request.ItemCreate, repos: Repositories = Depends(get_repositories)):
    shopping_list_repo = repos.shopping_list_repo
    item_repo = repos.item_repo
    category_repo = repos.category_repo
    
    # Check if the list exists
    if shopping_list_repo.get_by_id(list_id) is None:
        raise HTTPException(status_code=404, detail="List not found")

    # Check if item already exists in the list
    if item_repo.exists_in_list(list_id, item.name):
        raise HTTPException(status_code=400, detail="Item already exists")

    # Check if category exists
    if category_repo.get_by_id(item.category_id) is None:
        raise HTTPException(status_code=404, detail="Category not found")

    # Create the item
    db_item = item_repo.create(item.name, list_id, item.category_id)
    return response.ItemResponse.from_orm(db_item)

@app.put("/list/{list_id}", response_model=response.ShoppingListResponse)
def update_list(list_id: int, list: request.ShoppingListUpdate, repos: Repositories = Depends(get_repositories)):
    updated_list = repos.shopping_list_repo.update_name(list_id, list.name)
    if updated_list is None:
        raise HTTPException(status_code=404, detail="List not found")
    
    return response.ShoppingListResponse.from_orm(updated_list)

@app.put("/list/{list_id}/item/{item_id}", response_model=response.ItemResponse)
def update_item(list_id: int, item_id: int, item: request.ItemUpdate, repos: Repositories = Depends(get_repositories)):
    shopping_list_repo = repos.shopping_list_repo
    item_repo = repos.item_repo
    category_repo = repos.category_repo
    
    # Check if the list exists
    if shopping_list_repo.get_by_id(list_id) is None:
        raise HTTPException(status_code=404, detail="List not found")
    
    # Check if the item exists and belongs to the list
    if item_repo.get_by_list_and_id(list_id, item_id) is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Check if the new category exists
    if category_repo.get_by_id(item.category_id) is None:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if another item with the same name already exists in this list (excluding current item)
    if item_repo.exists_in_list(list_id, item.name, exclude_id=item_id):
        raise HTTPException(status_code=400, detail="Item with this name already exists in the list")
    
    updated_item = item_repo.update(item_id, list_id, item.name, item.category_id, item.purchased)
    return response.ItemResponse.from_orm(updated_item)

@app.patch("/list/{list_id}/item/{item_id}/purchased", response_model=response.ItemResponse)
def set_item_purchased_status(list_id: int, item_id: int, status: request.ItemSetPurchasedStatus, repos: Repositories = Depends(get_repositories)):
    shopping_list_repo = repos.shopping_list_repo
    item_repo = repos.item_repo
    
    # Check if the list exists
    if shopping_list_repo.get_by_id(list_id) is None:
        raise HTTPException(status_code=404, detail="List not found")
    
    # Check if the item exists and belongs to the list
    if item_repo.get_by_list_and_id(list_id, item_id) is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Set the purchased status using the repository method
    updated_item = item_repo.update_purchased_status(item_id, list_id, status.purchased)
    return response.ItemResponse.from_orm(updated_item)

@app.delete("/list/{list_id}/item/{item_id}", status_code=200)
def delete_item(list_id: int, item_id: int, repos: Repositories = Depends(get_repositories)):
    shopping_list_repo = repos.shopping_list_repo
    item_repo = repos.item_repo
    
    # Check if the list exists
    if shopping_list_repo.get_by_id(list_id) is None:
        raise HTTPException(status_code=404, detail="List not found")
    
    # Check if the item exists and belongs to the list
    item = item_repo.get_by_list_and_id(list_id, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    item_repo.delete(item)

@app.delete("/list/{list_id}", status_code=200)
def delete_list(list_id: int, repos: Repositories = Depends(get_repositories)):
    shopping_list_repo = repos.shopping_list_repo
    
    shopping_list = shopping_list_repo.get_by_id(list_id)
    if shopping_list is None:
        raise HTTPException(status_code=404, detail="List not found")
    
    shopping_list_repo.delete(shopping_list)
