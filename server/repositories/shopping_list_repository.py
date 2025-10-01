from typing import Optional, List
from sqlalchemy.orm import Session
from db.models import ShoppingList
from .base_repository import BaseRepository

class ShoppingListRepository(BaseRepository[ShoppingList]):
    def __init__(self, db: Session):
        super().__init__(db)
    
    def get_by_id(self, id: int) -> Optional[ShoppingList]:
        return self.db.query(ShoppingList).filter(ShoppingList.id == id).first()
    
    def get_all(self) -> List[ShoppingList]:
        return self.db.query(ShoppingList).all()
    
    def create(self, name: str) -> ShoppingList:
        shopping_list = ShoppingList(name=name)
        return super().create(shopping_list)
    
    def update_name(self, id: int, name: str) -> Optional[ShoppingList]:
        shopping_list = self.get_by_id(id)
        if shopping_list:
            shopping_list.name = name
            return super().update(shopping_list)
        return None
