from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    joined_on = db.Column(db.DateTime(), nullable=False)
    student = db.Column(db.Boolean(50), nullable=False)
    graduation_date = db.Column(db.DateTime(), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    tours_given = db.relationship("TourGuide", back_populates='guide')
    reviews = db.relationship("Review", back_populates='reviewer')
    tourist_tours = db. relationship("Booking", back_populates='tourist')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'last_name': self.last_name,
            'first_name': self.first_name,
            'joined_on': self.joined_on,
            'student': self.student,
            'graduation_date': self.graduation_date,
            "profile_pic": self.profile_pic,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'reviews': self.reviews,
            'tourist_tours': self.tourist_tours,

        }