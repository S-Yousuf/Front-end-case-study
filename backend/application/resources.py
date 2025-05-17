from flask_restful import Resource, Api, reqparse, marshal_with, fields, marshal, request
from .models import *
from flask import jsonify
from werkzeug.security import check_password_hash

api = Api()


profile_parser = reqparse.RequestParser()
profile_parser.add_argument("name", type=str, required=True, help="Name is required")
profile_parser.add_argument("photo", type=str)
profile_parser.add_argument("description", type=str)
profile_parser.add_argument("address", type=str)

profile_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'photo': fields.String,
    'description': fields.String,
    'address': fields.String
}


class ApiProfile(Resource):
    @marshal_with(profile_fields)
    def get(self):
        profiles = Profile.query.all()
        return profiles

    def post(self):
        args = profile_parser.parse_args()
        profile = Profile(**args)
        db.session.add(profile)
        db.session.commit()
        return {'message': 'Profile created', 'id': profile.id}, 201

class ApiProfileDetail(Resource):
    @marshal_with(profile_fields)
    def get(self, profile_id):
        profile = Profile.query.get(profile_id)
        if not profile:
            return {'message': 'Profile not found'}, 404
        return profile

    def put(self, profile_id):
        profile = Profile.query.get(profile_id)
   
        args = profile_parser.parse_args()
        profile.name = args['name']
        profile.photo = args['photo']
        profile.description = args['description']
        profile.address = args['address']
        db.session.commit()
        return {'message': 'Profile updated'}

    def delete(self, profile_id):
        profile = Profile.query.get(profile_id)   
        db.session.delete(profile)
        db.session.commit()
        return {'message': 'Profile deleted'}

api.add_resource(ApiProfile, "/api/profiles")
api.add_resource(ApiProfileDetail, "/api/profiles/<int:profile_id>")