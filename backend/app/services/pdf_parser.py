import pdfplumber
import io

def extract_text(file_bytes: bytes, filename: str) -> str:
    """Extract clean text from PDF or .txt files."""
    if filename.lower().endswith(".txt"):
        return file_bytes.decode("utf-8", errors="ignore").strip()

    # PDF extraction with pdfplumber (handles tables, columns better than PyPDF2)
    text_parts = []
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text.strip())

    full_text = "\n\n".join(text_parts)
    if not full_text.strip():
        raise ValueError("Could not extract text from this PDF. It may be image-based or scanned.")

    return full_text
