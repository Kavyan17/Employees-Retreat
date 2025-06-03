from app.models.team import Team
from app import db

def add_team(name):
    team = Team(name=name)
    db.session.add(team)
    db.session.commit()
    return team

def get_all_teams():
    return Team.query.all()

def update_team(team_id, new_name):
    team = Team.query.get(team_id)
    if team:
        team.name = new_name
        db.session.commit()
    return team

def delete_team(team_id):
    team = Team.query.get(team_id)
    if team:
        db.session.delete(team)
        db.session.commit()
    return team
