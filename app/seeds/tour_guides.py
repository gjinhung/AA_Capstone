from app.models import db, TourGuide, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

# Adds a demo user, you can add other users here if you want
def seed_tour_guides():
    tour1 = TourGuide(
        guide_id=1, 
        city_id=1,
        language="English",
        price=40,
        about='This Tour will take you to New York"s greatest chinese communities for an culinary experience you won"t forget.',
        specialties=[food],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    tour2 = TourGuide(
        guide_id=2, 
        city_id=2,
        language="English",
        price=20,
        about='This is a tour for those interested in hearing all about the effects of Hip Hop on the Los Angles community.',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    tour3 = TourGuide(
        guide_id=2, 
        city_id=3,
        language="Chinese",
        price=50,
        about='Join me on an easy to mid difficulty, adventure to climb mount rainier for a site you can"t forget',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())

    db.session.add(tour1)
    db.session.add(tour2)
    db.session.add(tour3)
    tour1.dates.append(Monday)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tours RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tours"))
        
    db.session.commit()