from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tour_specialty import tour_specialty
from .tour_dates import tour_date

class TourGuide(db.Model):
    __tablename__ = 'tour_guides'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,autoincrement=True, primary_key=True)
    guide_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    city_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('cities.id')), nullable=False)
    language = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    about = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    guide = db.relationship("User", back_populates='tours_given')
    cities = db.relationship("City", back_populates="tours_given")
    bookings = db.relationship("Booking", back_populates='tour_guide')
    reviews = db.relationship("Review", back_populates="tour")

    specialties = db.relationship("Specialty", secondary=tour_specialty, back_populates='tours', cascade='all, delete')
    dates = db.relationship("Date", secondary=tour_date, back_populates='tours', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'guide_id': self.guide_id,
            'city_id': self.city_id,
            'language': self.language,
            'price': self.price,
            'about': self.about,
            'bookings': self.bookings,
            'guide': self.guide,
            'specialties': self.specialities,
            'dates': self.dates,
            'reviews': self.reviews,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
