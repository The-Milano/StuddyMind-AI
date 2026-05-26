"""
AI Engine — StudyMind AI
Primary:  Google Gemini 2.0 Flash (google-generativeai SDK)
Fallback: Groq Free API (llama-3.3-70b-versatile)

Get Gemini key free at: https://aistudio.google.com/app/apikey
Get Groq key free at:   https://console.groq.com
"""

import os, json, re
import google.generativeai as genai
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GROQ_API_KEY   = os.getenv("GROQ_API_KEY", "")
AI_PROVIDER    = os.getenv("AI_PROVIDER", "gemini")  # "gemini" | "groq"

# Configure Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    gemini_model = genai.GenerativeModel("gemini-2.0-flash")

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"


# ─── Core dispatcher ──────────────────────────────────────────────────────────

def ask_ai(prompt: str, max_tokens: int = 1200) -> str:
    """Route to Gemini (primary) or Groq (fallback)."""
    if AI_PROVIDER == "gemini" and GEMINI_API_KEY:
        return _ask_gemini(prompt)
    elif GROQ_API_KEY:
        return _ask_groq(prompt, max_tokens)
    else:
        raise ValueError(
            "No AI API key found. Set GEMINI_API_KEY in your .env file. "
            "Get a free key at https://aistudio.google.com/app/apikey"
        )


def _ask_gemini(prompt: str) -> str:
    response = gemini_model.generate_content(prompt)
    return response.text.strip()


def _ask_groq(prompt: str, max_tokens: int) -> str:
    res = requests.post(
        GROQ_URL,
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens
        },
        timeout=30
    )
    res.raise_for_status()
    return res.json()["choices"][0]["message"]["content"].strip()


# ─── Feature functions ────────────────────────────────────────────────────────

def summarize(text: str) -> str:
    # Gemini 2.0 Flash supports 1M token context — send up to 15k chars
    excerpt = text[:15000]
    prompt = f"""You are an expert academic summarizer.

Summarize the following text into a well-structured markdown document.
- Use ## headings to group related ideas
- Use bullet points (- ) for individual facts or points
- Be thorough but concise — capture every major idea
- Do not add information not present in the text
- Output markdown only

TEXT:
{excerpt}

SUMMARY:"""
    return ask_ai(prompt, max_tokens=1000)


def generate_quiz(text: str) -> list:
    excerpt = text[:10000]
    prompt = f"""You are a professor writing a practice exam.

Generate exactly 5 multiple-choice questions from the text below.
- Questions should test understanding, not just memorization
- Make incorrect options plausible but clearly wrong
- Include a brief explanation for the correct answer

Return ONLY a valid JSON array — no extra text, no markdown fences:
[
  {{
    "id": 1,
    "question": "Question text here?",
    "options": ["A. first option", "B. second option", "C. third option", "D. fourth option"],
    "answer": "A",
    "explanation": "Brief explanation of why A is correct."
  }}
]

TEXT:
{excerpt}

JSON:"""
    raw = ask_ai(prompt, max_tokens=1500)

    # Strip markdown fences if model adds them
    raw = re.sub(r"```json|```", "", raw).strip()

    # Extract JSON array
    match = re.search(r'\[.*\]', raw, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            pass
    return []


def answer_question(context: str, question: str, history: list) -> str:
    history_str = "\n".join(
        [f"Student: {h['q']}\nAssistant: {h['a']}" for h in history[-4:]]
    )
    prompt = f"""You are a helpful study assistant with deep knowledge of the provided document.

Rules:
- Answer ONLY based on the provided context
- If the answer is not in the context, say: "I don't see that covered in this document."
- Be clear, concise, and educational
- Use bullet points for multi-part answers

DOCUMENT CONTEXT:
{context[:8000]}

CONVERSATION SO FAR:
{history_str}

STUDENT QUESTION: {question}

YOUR ANSWER:"""
    return ask_ai(prompt, max_tokens=700)
