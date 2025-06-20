from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from app.routes.teams import teams_bp
    app.register_blueprint(teams_bp, url_prefix="/teams")
    from app.routes.answers import answers_bp
    app.register_blueprint(answers_bp, url_prefix="/answers")

    with app.app_context():
        db.create_all()

    return app
