from app.models import db, City, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

# Adds a demo user, you can add other users here if you want
def seed_cities():
    # new_york = City(
    #     city="New York",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    
    # los_angeles = City(
    #     city="Los Angeles",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    # seattle = City(
    #     city="Seatle",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())

    # db.session.add(new_york)
    # db.session.add(los_angeles)
    # db.session.add(seattle)
    # db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cities"))
        
    db.session.commit()