from pydantic import BaseModel


class Base(BaseModel):
    name: str

class ShoppingListCreate(Base):
    pass

class ShoppingListUpdate(Base):
    pass