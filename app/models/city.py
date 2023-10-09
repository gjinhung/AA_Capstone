from .db import db, environment, SCHEMA, add_prefix_for_prod

class City(db.Model):
    __tablename__ = 'cities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.Integer, nullable=False, unique=True)

    tours_given = db.relationship("TourGuide", back_populates="cities")

    def to_dict(self):
        return {
            'id': self.id,
            'city': self.city,
            'tours_given': self.tours_given
        }