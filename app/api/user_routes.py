from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    user_dict = user.to_dict()
    reviews = []
    u_reviews = user.reviews
    for rev in u_reviews:
        reviews.append(rev.average_rating)
    
    rev_sum = sum(reviews)
    if not len(reviews):
        rating = 0
    else:
        rating = round((rev_sum/len(reviews)),2)

    user_dict['rating'] = rating

    return user_dict

@user_routes.route('/current')
@login_required
def current():

    user = User.query.get(current_user.id)
    user_dict = user.to_dict()
    reviews = []
    u_reviews = user.reviews
    for rev in u_reviews:
        reviews.append(rev.average_rating)
    
    rev_sum = sum(reviews)

    if not len(reviews):
        rating = 0
    else:
        rating = round((rev_sum/len(reviews)),2)

    user_dict['rating'] = rating

    return user_dict