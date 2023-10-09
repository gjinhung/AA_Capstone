from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tour_specialty import tour_specialty

class Specialty(db.Model):
    __tablename__ = 'specialties'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,autoincrement=True, primary_key=True)
    specialty = db.Column(db.String(50), nullable=False)

    tours = db.relationship("TourGuide", secondary=tour_specialty, back_populates='specialties', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'specialty': self.specialty,
            'tours': self.tours
        }
