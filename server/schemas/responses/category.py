from pydantic import BaseModel


class CategoryObject(BaseModel):
    id: int
    name: str
