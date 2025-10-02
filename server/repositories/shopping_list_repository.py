from sqlalchemy.orm import Session
from db.models import ShoppingList, Item
from .base_repository import BaseRepository

class ShoppingListRepository(BaseRepository[ShoppingList]):
    def __init__(self, db: Session):
        super().__init__(db)
    
    def get_by_id(self, id: int) -> ShoppingList | None:
        return self.db.query(ShoppingList).filter(ShoppingList.id == id).first()
    
    def get_all(self) -> list[ShoppingList]:
        return self.db.query(ShoppingList).all()
    
    def create(self, name: str) -> ShoppingList:
        shopping_list = ShoppingList(name=name)
        return super().create(shopping_list)
    
    def update_name(self, id: int, name: str) -> ShoppingList | None:
        shopping_list = self.get_by_id(id)
        if shopping_list:
            shopping_list.name = name
            return super().update(shopping_list)
        return None
    
    def update_all_items_purchased_status(self, list_id: int, purchased: bool) -> list[Item]:
        items = self.db.query(Item).filter(Item.list_id == list_id).all()
        for item in items:
            item.purchased = purchased
            super().update(item)
        return items
    
    def clone_list(self, list_id: int) -> ShoppingList | None:
        try:
            original_list = self.get_by_id(list_id)
            if not original_list:
                return None
            
            new_list = ShoppingList(name=original_list.name)
            new_list = super().create(new_list)
            
            for item in original_list.items:
                new_item = Item(
                    name=item.name,
                    list_id=new_list.id,
                    category_id=item.category_id,
                    purchased=False  # All cloned items start as not purchased
                )
                self.db.add(new_item)
            
            self.db.commit()
            return new_list
        except Exception as e:
            self.db.rollback()
            return None
