from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class ShoppingList(Base):
    __tablename__ = "lists"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    items = relationship("Item", back_populates="list")

class Item(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    list_id = Column(Integer, ForeignKey("lists.id"))

    list = relationship("ShoppingList", back_populates="items")
