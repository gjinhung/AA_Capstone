from flask import Blueprint, jsonify, request
from ..models import db , Specialty

specialties_routes = Blueprint('specialties', __name__)



@specialties_routes.route('/')
def get_all_specialties():
    dates = Date.query.all()
    return jsonify([dates.to_dict() for date in dates])

@specialties_routes.route('/:specId')
def get_dates(specId):
    specialty = Specialty.query.filter_by(specialty=specId)

    if not date:
        return jsonify({"error": "Date not found"}), 404
    
    # return {"tours": {image.id: image.to_dict() for image in images}}