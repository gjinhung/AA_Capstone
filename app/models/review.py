from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__= 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer,primary_key=True)
    reviewer_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")))
    tour_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("tour_guides.id")))
    average_rating = db.Column(db.Float, nullable=False)
    communication_rating = db.Column(db.Integer, nullable=False)
    knowledgability_rating = db.Column(db.Integer, nullable=False)
    professionalism_rating = db.Column(db.Integer, nullable=False)
    review_body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    reviewer = db.relationship("User", back_populates="reviews")
    tour = db.relationship("TourGuide", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'reviewer_id': self.reviewer_id,
            'average_rating': self.average_rating,
            'communication_rating': self.communication_rating,
            'knowledgeability_rating': self.knowledgability_rating,
            'professionalism_rating': self.professionalism_rating,
            'review_body': self.review_body,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'guide': self.guide
        }
