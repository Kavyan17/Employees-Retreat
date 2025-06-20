from app import db
from sqlalchemy.orm import relationship


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    question_id = db.Column(db.Integer, nullable=False)
    answer_text = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())


