from pydantic import BaseModel


class Base(BaseModel):
    name: str
    category_id: int

class ItemCreate(Base):
    pass

class ItemUpdate(Base):
    pass
