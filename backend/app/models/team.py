from app import db
from sqlalchemy.orm import relationship

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    answers = relationship("Answer", cascade="all, delete", backref="team")
