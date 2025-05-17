from flask import current_app as app, jsonify, request, render_template
from .models import *

from flask_cors import cross_origin
from werkzeug.security import check_password_hash


''' 
            ROUTES

'''

@app.get('/')
def home():
    profiles = Profile.query.all()
    return render_template('index.html', profiles=profiles)



@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    admin = Admin.query.filter_by(username=username).first()
    if admin and check_password_hash(admin.password, password):
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'error': 'Invalid credentials'}), 401



