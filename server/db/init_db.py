from sqlalchemy.orm import Session
from db.models import Category
from db.database import SessionLocal


def init_default_categories():
    """Initialize default categories if the database is empty."""
    db = SessionLocal()
    try:
        # Check if any categories exist
        if db.query(Category).first() is None:
            default_categories = [
                Category(name="Produce"),
                Category(name="Dairy"),
                Category(name="Meat"),
                Category(name="Bakery"),
                Category(name="Pantry"),
                Category(name="Frozen"),
                Category(name="Beverages"),
                Category(name="Snacks"),
                Category(name="Health & Beauty"),
                Category(name="Household")
            ]
            
            for category in default_categories:
                db.add(category)
            
            db.commit()
            print("Default categories initialized successfully!")
            return True
        else:
            print("Categories already exist, skipping initialization.")
            return False
    except Exception as e:
        print(f"Error initializing default categories: {e}")
        db.rollback()
        return False
    finally:
        db.close()


def init_database():
    """Initialize the database with any required seed data."""
    print("Initializing database...")
    init_default_categories()
    print("Database initialization complete.")
