# StudyMind AI 🧠

> Transform any lecture notes or PDF into summaries, quizzes, and an AI tutor — in seconds.

![Demo](./demo.gif)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-studymind.vercel.app-00E5A0?style=flat-square)](https://studdy-mind-ai.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

## ✨ Features

- **Smart Summarization** — Gemini AI condenses long documents into structured bullet points
- **Auto Quiz Generation** — 5 MCQs with explanations generated from your content
- **Document Q&A Chat** — Ask anything about your upload, get grounded answers
- **Session History** — All past sessions saved and searchable
- **Export Notes** — Download your AI summary as a text file
- **Free Forever** — Powered by Gemini 2.0 Flash free API tier

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TailwindCSS, Framer Motion |
| Backend | FastAPI, Python 3.11, Uvicorn |
| AI Engine | Google Gemini 2.0 Flash |
| Database | TinyDB (zero-config JSON) |
| Deployment | Vercel (frontend) + Render (backend) |
| CI/CD | GitHub Actions |

## 🚀 Quick Start

```bash
# 1. Get free Gemini API key → https://aistudio.google.com/app/apikey

# 2. Backend
cd backend
pip install -r requirements.txt
echo "GEMINI_API_KEY=your_key_here" > .env
uvicorn app.main:app --reload

# 3. Frontend
cd frontend && npm install && npm run dev
# → http://localhost:5173
```


## 🌐 Live Demo

- App: https://studdy-mind-ai.vercel.app/
- API Docs: https://studdymind-ai.onrender.com/docs

## 📄 License

MIT — free to use, modify, and deploy.
