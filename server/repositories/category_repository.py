from sqlalchemy.orm import Session
from db.models import Category
from .base_repository import BaseRepository

class CategoryRepository(BaseRepository[Category]):
    def __init__(self, db: Session):
        super().__init__(db)
    
    def get_by_id(self, id: int) -> Category | None:
        return self.db.query(Category).filter(Category.id == id).first()
    
    def get_all(self) -> list[Category]:
        return self.db.query(Category).all()
    
    def get_by_name(self, name: str) -> Category | None:
        return self.db.query(Category).filter(Category.name == name).first()
