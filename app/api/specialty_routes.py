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
            return jsonify("Specialty does not exist"), 404
        else: specialties = Specialty.query.filter_by(specialty=specialty)
    for special in specialties:
        # print(f'look here {special}')
        spcl_dict = special.to_dict()
        tours = special.tours
        tour_list = []
        for tour in tours:
            t_dic = tour.to_dict()
            tour_list.append(t_dic)

        spcl_dict['tours'] = tour_list
        spcl_data.append(spcl_dict)
    return jsonify(spcl_data)


# @dates_routes.route('/')
# def get_all_dates():
#     date_data=[]
#     dates = Date.query.all()

#     if request.args.get('date'):
#         date = request.args.get('date').lower().capitalize()
#         dates = Date.query.filter_by(date=date)
#     for date in dates:
#         date_dict = date.to_dict()
#         tours = date.tours
#         tour_list = []
#         for tour in tours:
#             t_dic = tour.to_dict()
#             tour_list.append(t_dic)

#         date_dict['tours'] = tour_list
#         date_data.append(date_dict)
        
#     return jsonify(date_data)


