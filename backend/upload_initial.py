from app import app
from application.models import db, Admin
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()
    print("All tables created successfully")

    admin = Admin.query.filter_by(username='Admin').first()
    if not admin:
        admin = Admin(id='1', username = "Admin", password=generate_password_hash("Password"))
        db.session.add(admin)
        db.session.commit()


