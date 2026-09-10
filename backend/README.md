# Nalar Backend (FastAPI)

Scaffold API backend untuk platform pembelajaran STEM Nalar (SDG 4).

## Fitur Utama Scaffold
- **Health Check API**: `GET /api/v1/health`
- **Event-Driven AI Tutor (Hint)**: `POST /api/v1/ai-tutor/hint` (petunjuk bertahap level 1-3)
- **Interactive STEM Q&A**: `POST /api/v1/ai-tutor/chat` (tanya-jawab kontekstual dengan KaTeX)
- **Local Mock Service**: Default aktif untuk zero-token testing tanpa kuota API LLM
- **Interactive API Docs**: Swagger UI di `http://127.0.0.1:8000/api/v1/docs`

## Cara Menjalankan

1. Masuk ke environment python:
   ```powershell
   .\backend\.venv\Scripts\Activate.ps1
   ```

2. Jalankan server:
   ```powershell
   python backend\run.py
   ```
   Server akan aktif di `http://127.0.0.1:8000`.
