from flask import Blueprint, jsonify, request
from ..models import db , Booking, TourGuide
from flask_login import current_user, login_required
from ..forms.booking_form import BookingForm
import datetime
from .auth_routes import validation_errors_to_error_messages

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('/')
def get_all_bookings():
    bookings = Booking.query.all()
    bookings_data = []
    for booking in bookings:
        date_format = '%Y-%m-%d'
        date = (booking.date).strftime(date_format)
        time_format = '%H:%M:%S'
        start_time = (booking.start_time).strftime(time_format)
        # to convert back, use datetime.date.fromisoformat(start_time)
        booking_dict = booking.to_dict()
        booking_dict['start_time'] = start_time
        booking_dict['date'] = date
        
        # tourists = booking.tourist
        # # t_list = []
        # # for tourist in tourists:
        # t_dict = tourists.to_dict()
        # # t_list.append(t_dict)

        # booking_dict['tourist'] = t_dict
        bookings_data.append(booking_dict)
    return jsonify(bookings_data)

@booking_routes.route('/<int:id>')
def get_one_booking(id):
    booking = Booking.query.get_or_404(id)
    booking_dict = booking.to_dict()
    # stringify date
    date_format = '%Y-%m-%d'
    date = (booking.date).strftime(date_format)
    # stringify time
    time_format = '%H:%M:%S'
    start_time = (booking.start_time).strftime(time_format)

    booking_dict['start_time'] = start_time
    booking_dict['date'] = date
    return jsonify(booking_dict)


@booking_routes.route('/tour/<int:tourId>/new', methods=['POST'])
@login_required
def add_booking(tourId):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    tour = TourGuide.query.get_or_404(tourId)  
    print(form.data)
    if form.validate_on_submit():
        print(type(form.data))
        date_format = '%Y-%m-%d'
        time_format = '%H:%M:%S'
        raw_date = form.date.data
        raw_time = form.start_time.data
        normalized_date = raw_date.strftime(date_format)
        normalized_time = raw_time.strftime(time_format)
        booking = Booking(
            tourist_id=current_user.id,
            tour_guide_id=tour.guide_id,
            date=form.date.data,
            start_time=form.start_time.data,
            duration=form.duration.data,
            created_at=datetime.datetime.utcnow(),
            updated_at=datetime.datetime.utcnow()
        )

        db.session.add(booking)
        db.session.commit()

        booking_to_dict = booking.to_dict()

        booking_to_dict['date'] = normalized_date
        booking_to_dict['start_time'] = normalized_time
        return booking_to_dict
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}
    

@booking_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    booking = Booking.query.get(id)
    if current_user.id != booking.tourist_id and current_user.id != booking.tour_guide_id:
        return jsonify({"error": "Unauthorized to edit this booking"}), 403

    if form.validate_on_submit():

        attributes_to_update = ['date', 'start_time', 'duration']
        for attr in attributes_to_update:
            if hasattr(form, attr):
                setattr(booking, attr, getattr(form, attr).data)

        booking.updated_at = datetime.datetime.utcnow()
        db.session.commit()

        return jsonify(booking.to_dict())
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}
    

@booking_routes.route('/<int:id>/', methods=['DELETE'])
def delete_business(b_id):
    booking = Booking.query.get(id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    if current_user.id != booking.tourist_id and current_user.id != booking.tour_guide_id:
        return jsonify({"error": "Unauthorized to edit this booking"}), 403

    try:
        db.session.delete(booking)
        db.session.commit()


        response = {
            "message": "Booking successfully deleted.",
            # "business": temp
        }

        return jsonify(response)

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An error occurred while deleting the Booking", "message": str(e)}), 500
