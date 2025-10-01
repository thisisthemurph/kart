from dataclasses import dataclass
from functools import lru_cache
from sqlalchemy.orm import Session
from fastapi import Depends
from db.database import get_db
from repositories import ShoppingListRepository, ItemRepository, CategoryRepository

@dataclass
class Repositories:
    shopping_list_repo: ShoppingListRepository
    item_repo: ItemRepository
    category_repo: CategoryRepository

@lru_cache()
def get_shopping_list_repository(db: Session = None) -> ShoppingListRepository:
    if db is None:
        db = next(get_db())
    return ShoppingListRepository(db)

@lru_cache()
def get_item_repository(db: Session = None) -> ItemRepository:
    if db is None:
        db = next(get_db())
    return ItemRepository(db)

@lru_cache()
def get_category_repository(db: Session = None) -> CategoryRepository:
    if db is None:
        db = next(get_db())
    return CategoryRepository(db)

# Alternative approach using dependency injection
def get_repositories(db: Session = Depends(get_db)) -> Repositories:
    return Repositories(
        shopping_list_repo=ShoppingListRepository(db),
        item_repo=ItemRepository(db),
        category_repo=CategoryRepository(db)
    )
