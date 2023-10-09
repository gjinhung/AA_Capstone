from .db import db, environment, SCHEMA, add_prefix_for_prod

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,autoincrement=True, primary_key=True)
    tourist_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")))
    tour_guide_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("tour_guides.id")))
    date = db.Column(db.DateTime(), nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False)
    duration = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    tourist = db. relationship("User", back_populates='tourist_tours')
    tour_guide = db.relationship("TourGuide", back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'tour_guide_id': self.tour_guide_id,
            'tourist_id': self.tourist_id,
            'date': self.date,
            'start_time': self.start_time,
            'duration': self.duration,
            'tourist': self.tourist,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
