import uuid
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import UploadResponse
from app.services import pdf_parser, ai_engine, session_store

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.lower().endswith((".pdf", ".txt")):
        raise HTTPException(status_code=400, detail="Only PDF and .txt files are supported.")
        
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit.")

    try:
        text = pdf_parser.extract_text(content, file.filename)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error extracting text: {str(e)}")

    word_count = len(text.split())
    if word_count == 0:
        raise HTTPException(status_code=400, detail="Extracted text is empty.")

    try:
        summary = ai_engine.summarize(text)
        quiz = ai_engine.generate_quiz(text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI processing failed: {str(e)}")

    session_id = str(uuid.uuid4())
    created_at = datetime.utcnow().isoformat() + "Z"

    session_data = {
        "session_id": session_id,
        "filename": file.filename,
        "word_count": word_count,
        "text": text,
        "summary": summary,
        "quiz": quiz,
        "created_at": created_at
    }
    
    session_store.save_session(session_data)
    
    return session_data
