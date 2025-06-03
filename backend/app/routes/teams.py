from flask import Blueprint, request, jsonify
from app.services.team_service import add_team, get_all_teams, update_team, delete_team

teams_bp = Blueprint('teams', __name__)

@teams_bp.route("/", methods=["GET"])
def list_teams():
    teams = get_all_teams()
    return jsonify([{"id": t.id, "name": t.name} for t in teams])

@teams_bp.route("/", methods=["POST"])
def create_team():
    data = request.json
    team = add_team(data["name"])
    return jsonify({"id": team.id, "name": team.name}), 201

@teams_bp.route("/<int:team_id>", methods=["PUT"])
def edit_team(team_id):
    data = request.json
    team = update_team(team_id, data["name"])
    if team:
        return jsonify({"id": team.id, "name": team.name})
    return jsonify({"error": "Team not found"}), 404

@teams_bp.route("/<int:team_id>", methods=["DELETE"])
def remove_team(team_id):
    team = delete_team(team_id)
    if team:
        return jsonify({"message": "Deleted successfully"})
    return jsonify({"error": "Team not found"}), 404
