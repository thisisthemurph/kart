from abc import ABC, abstractmethod
from typing import TypeVar, Generic
from sqlalchemy.orm import Session

T = TypeVar('T')

class BaseRepository(ABC, Generic[T]):
    def __init__(self, db: Session):
        self.db = db
    
    @abstractmethod
    def get_by_id(self, id: int) -> T | None:
        pass
    
    @abstractmethod
    def get_all(self) -> list[T]:
        pass
    
    def create(self, entity: T) -> T:
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        return entity
    
    def update(self, entity: T) -> T:
        self.db.commit()
        self.db.refresh(entity)
        return entity
    
    def delete(self, entity: T) -> None:
        self.db.delete(entity)
        self.db.commit()
