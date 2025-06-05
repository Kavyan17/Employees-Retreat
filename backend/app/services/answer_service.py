from app.models.answer import Answer
from app import db


def submit_answer(team_id, question_id, answer_text):
    answer = Answer(team_id=team_id, question_id=question_id, answer_text=answer_text)
    db.session.add(answer)
    db.session.commit()
    return answer


def get_team_answers(team_id):
    return Answer.query.filter_by(team_id=team_id).order_by(Answer.timestamp).all()