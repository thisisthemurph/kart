from pydantic import BaseModel


class ItemBase(BaseModel):
    name: str

class ItemCreate(ItemBase):
    pass

class ItemUpdate(ItemBase):
    pass

class ItemResponse(ItemBase):
    id: int
    list_id: int
    
    class Config:
        from_attributes = True

class ShoppingListBase(BaseModel):
    name: str

class ShoppingListCreate(ShoppingListBase):
    pass

class ShoppingListUpdate(ShoppingListBase):
    pass

class ShoppingListResponse(ShoppingListBase):
    id: int
    
    class Config:
        from_attributes = True

class ShoppingListWithItemsResponse(ShoppingListBase):
    id: int
    items: list[ItemResponse] = []
    
    class Config:
        from_attributes = True
