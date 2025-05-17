from flask import Flask, jsonify
from application.models import db, Profile, Admin
from config import DevelopmetConfig
from application.resources import api
from flask_cors import CORS




def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmetConfig)
    CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})
  
    # Initializing Extensions

    db.init_app(app)
    api.init_app(app) 
 

    with app.app_context():
        import application.views
        return app
    

app = create_app()


if __name__ == "__main__":
    app.run(debug=True)