from pydantic import BaseModel

from schemas.responses.item import ItemResponse


class Base(BaseModel):
    name: str

class ShoppingListResponse(Base):
    id: int
    
    class Config:
        from_attributes = True

class ShoppingListWithItemsResponse(Base):
    id: int
    items: list[ItemResponse] = []
    
    class Config:
        from_attributes = True
