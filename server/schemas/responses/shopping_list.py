from pydantic import BaseModel

from schemas.responses.item import ItemResponse
from db.models import ShoppingList as ShoppingListModel


class Base(BaseModel):
    name: str

class ShoppingListResponse(Base):
    id: int
    item_count: int
    
    class Config:
        from_attributes = True
    
    @classmethod
    def from_orm(cls, list: ShoppingListModel):
        return cls(id=list.id, name=list.name, item_count=len(list.items))

class ShoppingListWithItemsResponse(Base):
    id: int
    items: list[ItemResponse] = []
    
    class Config:
        from_attributes = True
