from tinydb import TinyDB, Query
from typing import Dict, List, Optional
import os

db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "db.json")
db = TinyDB(db_path)

def save_session(session_data: dict):
    db.insert(session_data)

def get_session(session_id: str) -> Optional[dict]:
    Session = Query()
    result = db.search(Session.session_id == session_id)
    return result[0] if result else None

def list_sessions() -> List[dict]:
    sessions = db.all()
    # Sort by created_at descending (newest first)
    return sorted(sessions, key=lambda x: x.get("created_at", ""), reverse=True)

def delete_session(session_id: str) -> bool:
    Session = Query()
    removed = db.remove(Session.session_id == session_id)
    return len(removed) > 0
