from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import datetime

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        user = User.query.get(current_user.id)
        user_dict = user.to_dict()

        #set reviews
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

        #set bookings id

        bookings_id = []
        u_bookings = user.tourist_tours

        for book in u_bookings:
            bookings_id.append(book.id)

        user_dict['booking_ids'] = bookings_id

        #set tours id

        tours_id = []
        u_tours = user.tours_given

        for tours in u_tours:
            tours_id.append(tours.id)

        user_dict['tour_ids'] = tours_id

        return user_dict
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if data['student'] == 'true':
        data['student'] = True
    else:
        data['student'] = False


    if form.validate_on_submit():

        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_pic=form.data['profile_pic'],
            student=data['student'],
            graduation_date=form.data['graduation_date'],
            joined_on=datetime.datetime.utcnow(),
            created_at=datetime.datetime.utcnow(),
            updated_at=datetime.datetime.utcnow()
            )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401