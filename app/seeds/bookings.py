from app.models import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

# Adds a demo user, you can add other users here if you want
def seed_bookings():
    # booking1 = Booking(
    #     tourist_id=3, 
    #     tour_guide_id=1, 
    #     date=datetime.date(2024, 1, 1),
    #     start_time=datetime.time(9),
    #     duration=2,
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    
    # booking2 = Booking(
    #     tourist_id=3, 
    #     tour_guide_id=2, 
    #     date=datetime.date(2024, 2, 1),
    #     start_time=datetime.time(9),
    #     duration=3,
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    # booking3 = Booking(
    #     tourist_id=1, 
    #     tour_guide_id=2, 
    #     date=datetime.date(2024, 1, 15),
    #     start_time=datetime.time(13),
    #     duration=2,
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())

    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))
        
    db.session.commit()