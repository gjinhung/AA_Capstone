from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    # review1 = Review(
    #     reviewer_id=3, 
    #     guide_id=1,
    #     communication_rating=5,
    #     knowledgability_rating=4,
    #     professionalism_rating=5,
    #     average_rating=round(((5+4+5)/3), 2),
    #     review_body='Demo was a very friendly person with lots of knowledge of the city',
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    
    # review2 = Review(
    #     reviewer_id=3, 
    #     guide_id=2,
    #     communication_rating=5,
    #     knowledgability_rating=4,
    #     professionalism_rating=5,
    #     average_rating=round(((5+4+5)/3), 2),
    #     review_body='Demo2 was a very friendly person with lots of knowledge of the city',
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())
    # review3 = Review(
    #     reviewer_id=1, 
    #     guide_id=2,
    #     communication_rating=5,
    #     knowledgability_rating=4,
    #     professionalism_rating=5,
    #     average_rating=round(((5+4+5)/3), 2),
    #     review_body='Demo3 was a very friendly person with lots of knowledge of the city',
    #     created_at=datetime.datetime.now(),
    #     updated_at=datetime.datetime.now())

    # db.session.add(review1)
    # db.session.add(review2)
    # db.session.add(review3)
    # db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()