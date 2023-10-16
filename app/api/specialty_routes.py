from flask import Blueprint, jsonify, request
from ..models import db , Specialty

specialty_routes = Blueprint('specialty', __name__)



@specialty_routes.route('/')
def get_all_spec():
    specialties = Specialty.query.all()
    spcl_data=[]
    if request.args.get('specialty'):
        specialty = request.args.get('specialty').lower().title()
        if not Specialty.query.filter_by(specialty=specialty).count():
            return jsonify({"errors": "Specialty does not exist"}), 404
        else: specialties = Specialty.query.filter_by(specialty=specialty)
    for special in specialties:
        spcl_dict = special.to_dict()
        tours = special.tours
        tour_list = []
        for tour in tours:
            t_dic = tour.id
            tour_list.append(t_dic)

        spcl_dict['tours_id'] = tour_list
        spcl_data.append(spcl_dict)
    return {spcl['id']: spcl for spcl in spcl_data}