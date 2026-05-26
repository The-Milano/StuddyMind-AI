from fastapi import APIRouter, HTTPException
from app.models.schemas import SessionListResponse, SessionPreview, UploadResponse
from app.services import session_store

router = APIRouter()

@router.get("/sessions", response_model=SessionListResponse)
async def get_sessions():
    sessions = session_store.list_sessions()
    previews = []
    for s in sessions:
        previews.append(SessionPreview(
            session_id=s["session_id"],
            filename=s["filename"],
            word_count=s["word_count"],
            summary_preview=s["summary"][:120] + "..." if len(s["summary"]) > 120 else s["summary"],
            created_at=s.get("created_at", "")
        ))
    return {"sessions": previews}

@router.get("/sessions/{session_id}", response_model=UploadResponse)
async def get_session(session_id: str):
    session = session_store.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    success = session_store.delete_session(session_id)
    if not success:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"deleted": True}
