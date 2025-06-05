from flask import Blueprint, request, jsonify
from app.services.answer_service import submit_answer, get_team_answers

answers_bp = Blueprint("answers", __name__)

@answers_bp.route("/submit", methods=["POST"])
def submit():
    data = request.json
    answer = submit_answer(data["team_id"], data["question_id"], data["answer_text"])
    return jsonify({"message": "Answer submitted", "answer_id": answer.id})


@answers_bp.route("/team/<int:team_id>", methods=["GET"])
def get_answers_for_team(team_id):
    answers = get_team_answers(team_id)
    return jsonify([
        {
            "question_id": a.question_id,
            "answer": a.answer_text,
            "timestamp": a.timestamp.isoformat()
        }
        for a in answers
    ])
