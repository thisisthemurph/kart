from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models.model import ShoppingList, Item
from schemas import ShoppingListCreate, ShoppingListUpdate, ShoppingListResponse, ShoppingListWithItemsResponse, ItemCreate, ItemResponse
from database import get_db, engine, Base
from typing import List as ListType

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/list", response_model=ListType[ShoppingListResponse])
def get_all_lists(db: Session = Depends(get_db)):
    lists = db.query(ShoppingList).all()
    return lists

@app.get("/list/{list_id}", response_model=ShoppingListWithItemsResponse)
def get_list(list_id: int, db: Session = Depends(get_db)):
    list_item = db.query(ShoppingList).filter(ShoppingList.id == list_id).first()
    if list_item is None:
        raise HTTPException(status_code=404, detail="List not found")
    return list_item

@app.post("/list", response_model=ShoppingListResponse)
def create_list(list: ShoppingListCreate, db: Session = Depends(get_db)):
    db_list = ShoppingList(name=list.name)
    db.add(db_list)
    db.commit()
    db.refresh(db_list)
    return db_list

@app.post("/list/{list_id}/item", response_model=ItemResponse)
def create_item(list_id: int, item: ItemCreate, db: Session = Depends(get_db)):
    db_list = db.query(ShoppingList).filter(ShoppingList.id == list_id).first()
    if db_list is None:
        raise HTTPException(status_code=404, detail="List not found")

    matching_item = db.query(Item).filter(Item.list_id == list_id, Item.name == item.name).first()
    if matching_item is not None:
        raise HTTPException(status_code=400, detail="Item already exists")

    db_item = Item(name=item.name, list_id=list_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.put("/list/{list_id}", response_model=ShoppingListResponse)
def update_list(list_id: int, list: ShoppingListUpdate, db: Session = Depends(get_db)):
    db_list = db.query(ShoppingList).filter(ShoppingList.id == list_id).first()
    if db_list is None:
        raise HTTPException(status_code=404, detail="List not found")

    db_list.name = list.name
    db.commit()
    db.refresh(db_list)
    return db_list

@app.delete("/list/{list_id}")
def delete_list(list_id: int, db: Session = Depends(get_db)):
    db_list = db.query(ShoppingList).filter(ShoppingList.id == list_id).first()
    if db_list is None:
        raise HTTPException(status_code=404, detail="List not found")
    
    db.delete(db_list)
    db.commit()
    return {"message": "List deleted successfully"}
