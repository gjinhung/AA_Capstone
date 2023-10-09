from app.models import db, Specialty, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

# Adds a demo user, you can add other users here if you want
def seed_specialties():
    # food = Specialty(
    #     specialty="Food",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    
    # history = Specialty(
    #     specialty="History",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    
    # adventure = Specialty(
    #     specialty="Adventure",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())

    # other = Specialty(
    #     specialty="Other",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())

    db.session.add(food)
    db.session.add(history)
    db.session.add(adventure)
    db.session.add(other)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_specialties():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.specialties RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM specialties"))
        
    db.session.commit()