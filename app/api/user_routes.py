from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from ..models import db
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    users_data = []
    for user in users:
        user_dict = user.to_dict()
        reviews = []
        reviews_list = []
        u_reviews = user.reviews
        for rev in u_reviews:
            # reviews.append(rev.average_rating)
            reviews.append(rev.rating)
            reviews_list.append(rev.to_dict())
    
        rev_sum = sum(reviews)
        if not len(reviews):
            rating = 0
        else:
            rating = round((rev_sum/len(reviews)),2)

        tours_given = []

        u_tours_given = user.tours_given
        for tg in u_tours_given:
            tg_dict = tg.to_dict()
            tours_given.append(tg_dict)

        user_dict['rating'] = rating
        user_dict['reviews'] = reviews_list
        user_dict['tours_given'] = tours_given
        users_data.append(user_dict)

    
    return {'users': {user['id']: user for user in users_data}}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    user_dict = user.to_dict()
    reviews = []
    reviews_list = []
    u_reviews = user.reviews
    for rev in u_reviews:
        # reviews.append(rev.average_rating)
        reviews.append(rev.rating)
        reviews_list.append(rev.to_dict())
    
    rev_sum = sum(reviews)
    if not len(reviews):
        rating = 0
    else:
        rating = round((rev_sum/len(reviews)),2)
    
    tours_given = []
    tourist_tours = []

    u_tours_given = user.tours_given
    for tg in u_tours_given:
        tg_dict = tg.to_dict()
        tours_given.append(tg_dict)

    u_tourist_tours = user.tourist_tours
    for tt in u_tourist_tours:
        tourist_tours.append(tt.to_dict())

    user_dict['rating'] = rating
    user_dict['reviews'] = reviews_list
    user_dict['tours_given'] = tours_given
    user_dict['bookings'] = tourist_tours

    return user_dict



@user_routes.route('/current')
@login_required
def current():

    user = User.query.get(current_user.id)
    user_dict = user.to_dict()
    reviews = []
    u_reviews = user.reviews
    for rev in u_reviews:
        # reviews.append(rev.average_rating)
        reviews.append(rev)
    
    rev_sum = sum(reviews)

    if not len(reviews):
        rating = 0
    else:
        rating = round((rev_sum/len(reviews)),2)

    user_dict['rating'] = rating

    return user_dict


@user_routes.route('/<int:id>/', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    db.session.delete(user)
    db.session.commit()

    response = {
        "message": "Tour successfully deleted."
    }

    return jsonify(response)