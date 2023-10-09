from .db import db, environment, SCHEMA
from .tour_dates import tour_date

class Date(db.Model):
    __tablename__ = 'dates'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(255), nullable=False, unique=True)

    tours = db.relationship("TourGuide", secondary=tour_date, back_populates="dates", cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'tours': self.tours
        }