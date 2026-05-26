from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import upload, chat, sessions
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="StudyMind AI API")

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,https://your-app.vercel.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(sessions.router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}
