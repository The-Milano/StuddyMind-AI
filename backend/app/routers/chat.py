from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.services import ai_engine, session_store

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    session = session_store.get_session(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    try:
        answer = ai_engine.answer_question(
            context=session["text"],
            question=request.question,
            history=[{"q": h.q, "a": h.a} for h in request.history]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI processing failed: {str(e)}")
        
    return {"answer": answer, "session_id": request.session_id}
