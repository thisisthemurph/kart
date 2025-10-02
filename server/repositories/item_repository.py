from typing import Optional, List
from sqlalchemy.orm import Session
from db.models import Item
from .base_repository import BaseRepository

class ItemRepository(BaseRepository[Item]):
    def __init__(self, db: Session):
        super().__init__(db)
    
    def get_by_id(self, id: int) -> Optional[Item]:
        return self.db.query(Item).filter(Item.id == id).first()
    
    def get_all(self) -> List[Item]:
        return self.db.query(Item).all()
    
    def get_by_list_id(self, list_id: int) -> List[Item]:
        return self.db.query(Item).filter(Item.list_id == list_id).all()
    
    def get_by_list_and_id(self, list_id: int, item_id: int) -> Optional[Item]:
        return self.db.query(Item).filter(
            Item.id == item_id, 
            Item.list_id == list_id
        ).first()
    
    def create(self, name: str, list_id: int, category_id: int) -> Item:
        item = Item(name=name, list_id=list_id, category_id=category_id)
        return super().create(item)
    
    def update(self, item_id: int, list_id: int, name: str, category_id: int, purchased: bool = False) -> Optional[Item]:
        item = self.get_by_list_and_id(list_id, item_id)
        if item:
            item.name = name
            item.category_id = category_id
            item.purchased = purchased
            return super().update(item)
        return None
    
    def update_purchased_status(self, item_id: int, list_id: int, purchased: bool) -> Optional[Item]:
        item = self.get_by_list_and_id(list_id, item_id)
        if item:
            item.purchased = purchased
            return super().update(item)
        return None
    
    def toggle_purchased_status(self, item_id: int, list_id: int) -> Optional[Item]:
        item = self.get_by_list_and_id(list_id, item_id)
        if item:
            item.purchased = not item.purchased
            return super().update(item)
        return None
    
    def exists_in_list(self, list_id: int, name: str, exclude_id: Optional[int] = None) -> bool:
        query = self.db.query(Item).filter(
            Item.list_id == list_id, 
            Item.name == name
        )
        if exclude_id:
            query = query.filter(Item.id != exclude_id)
        return query.first() is not None
