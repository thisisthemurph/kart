from pydantic import BaseModel
from typing import Optional


class Base(BaseModel):
    name: str
    category_id: int

class ItemCreate(Base):
    pass

class ItemUpdate(Base):
    purchased: bool = False

class ItemSetPurchasedStatus(BaseModel):
    purchased: bool
