from app.models import db, Date, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

# Adds a demo user, you can add other users here if you want
def seed_cities():
    # Monday = Date(
    #     date="Monday",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    
    # Tuesday = Date(
    #     date="Tuesday",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    # Wednesday = Date(
    #     date="Wednesday",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    # Thursday = Date(
    #     date="Thursday",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    # Friday = Date(
    #     date="Friday",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    # Saturday = Date(
    #     date="Saturday",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    # Sunday = Date(
    #     date="Sunday",
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())

    db.session.add(Monday)
    db.session.add(Tuesday)
    db.session.add(Wednesday)
    db.session.add(Thursday)
    db.session.add(Friday)
    db.session.add(Saturday)
    db.session.add(Sunday)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dates():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dates RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dates"))
        
    db.session.commit()