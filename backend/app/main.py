import os
import sys
import traceback

# Force line buffering so Render logs are emitted immediately without buffering
sys.stdout.reconfigure(line_buffering=True)
sys.stderr.reconfigure(line_buffering=True)

print("INFO: App main.py loaded. Importing dependencies...", flush=True)

os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"

try:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from app.routers import upload, chat, sessions
    from dotenv import load_dotenv
    print("INFO: Dependencies imported successfully.", flush=True)
except Exception as e:
    print(f"CRITICAL: Failed to import dependencies. Error: {e}", flush=True)
    traceback.print_exc(file=sys.stdout)
    sys.stdout.flush()
    sys.stderr.flush()
    raise e

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
