from flask import Blueprint, jsonify, request
from ..models import db , Date

dates_routes = Blueprint('dates', __name__)



@dates_routes.route('/')
def get_all_dates():
    dates = Date.query.all()
    return jsonify([dates.to_dict() for date in dates])

@dates_routes.route('/:dateId')
def get_dates(dateId):
    date = Date.query.filter_by(date=dateId)

    if not date:
        return jsonify({"error": "Date not found"}), 404
    
    # return {"tours": {image.id: image.to_dict() for image in images}}