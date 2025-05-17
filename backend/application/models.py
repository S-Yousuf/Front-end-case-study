from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    photo = db.Column(db.String(2255), nullable=True)
    description = db.Column(db.String(400), nullable=True)
    address = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f"<Profile {self.name}>"
    
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"    

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Admin {self.username}>"