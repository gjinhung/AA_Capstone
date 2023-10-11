from flask import Blueprint, jsonify, request
from ..models import db , City

city_routes = Blueprint('city', __name__)

@city_routes.route('/')
def get_all_cities():
    city_data=[]
    cities = City.query.all()

    if request.args.get('city'):
        city = request.args.get('city').title()
        print('look here!!!!!!' + city)
        if not City.query.filter_by(city=city).count():
            return jsonify("City is currently unavailable"), 404
        else: cities = City.query.filter_by(city=city)
    for city in cities:
        city_dict = city.to_dict()
        tours = city.tours_given
        tour_list = []
        for tour in tours:
            t_dic = tour.to_dict()
            tour_list.append(t_dic)

        city_dict['tours'] = tour_list
        city_data.append(city_dict)
        
    return jsonify(city_data)