from pydantic import BaseModel
from db.models import Item as ItemModel
from schemas.responses.category import CategoryObject


class Base(BaseModel):
    name: str
    category_id: int

class ItemResponse(BaseModel):
    id: int
    name: str
    list_id: int
    purchased: bool
    category: CategoryObject | None = None

    @classmethod
    def from_orm(cls, item: ItemModel):
        category = CategoryObject(id=item.category.id, name=item.category.name) if item.category else None
        return cls(
            id=item.id, 
            name=item.name, 
            list_id=item.list_id, 
            purchased=item.purchased,
            category=category
        )
