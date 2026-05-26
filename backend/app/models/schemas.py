from pydantic import BaseModel
from typing import List

class QuizQuestion(BaseModel):
    id: int
    question: str
    options: List[str]
    answer: str
    explanation: str

class UploadResponse(BaseModel):
    session_id: str
    filename: str
    word_count: int
    text: str
    summary: str
    quiz: List[QuizQuestion]
    created_at: str

class ChatHistoryMessage(BaseModel):
    q: str
    a: str

class ChatRequest(BaseModel):
    session_id: str
    question: str
    history: List[ChatHistoryMessage]

class ChatResponse(BaseModel):
    answer: str
    session_id: str

class SessionPreview(BaseModel):
    session_id: str
    filename: str
    word_count: int
    summary_preview: str
    created_at: str

class SessionListResponse(BaseModel):
    sessions: List[SessionPreview]
