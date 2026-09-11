# ⚙️ Nalar Backend (FastAPI)

Scaffold API backend berbasis Python dan FastAPI untuk platform pembelajaran STEM **Nalar**, mendukung tema *"Pendidikan Berkualitas: menyediakan pendidikan yang inklusif, merata, dan berkualitas."*

Backend ini dirancang dengan prinsip **Event-Driven & Token-Efficient AI**, di mana panggilan ke Large Language Model (LLM) hanya terjadi *on-demand* saat pengguna meminta bantuan atau gagal menyelesaikan tantangan logika, didukung oleh **Local Mock Service** untuk pengujian tanpa biaya kuota token.

---

## 🌟 Fitur Utama

- 🩺 **Health Check API**: Endpoint verifikasi kesiapan sistem di `/api/v1/health`.
- 💡 **Petunjuk Bertingkat (Hint API)**: Endpoint `/api/v1/ai-tutor/hint` yang menyajikan panduan bertahap (Level 1: *nudge*, Level 2: *conceptual*, Level 3: *breakdown*) berdasarkan state variabel kanvas pengguna.
- 💬 **STEM Interactive Q&A**: Endpoint `/api/v1/ai-tutor/chat` untuk tanya jawab kontekstual dengan dukungan rumus matematika KaTeX.
- 🛡️ **Zero-Token Local Mock**: Secara default berjalan menggunakan mesin *mock rule-based* lokal yang cerdas, aman untuk pengembangan dan pengujian otomatis tanpa kredensial berbayar.
- 📖 **Interactive Swagger UI**: Dokumentasi OpenAPI otomatis yang dapat dicoba langsung dari peramban.

---

## 📂 Struktur Direktori

```text
backend/
├── app/
│   ├── api/v1/
│   │   ├── endpoints/
│   │   │   ├── ai_tutor.py       # Handler /hint dan /chat
│   │   │   └── health.py         # Handler /health
│   │   └── router.py             # Penggabung rute API v1
│   ├── core/
│   │   └── config.py             # Pengaturan Pydantic Settings & CORS
│   ├── schemas/
│   │   └── ai_tutor.py           # Kontrak data Hint/Chat Request & Response
│   ├── services/
│   │   └── ai_service.py         # Logika penyedia Mock AI & LLM Engine
│   └── main.py                   # Inisialisasi aplikasi FastAPI
├── requirements.txt              # Daftar dependensi Python
└── run.py                        # Script peluncur server Uvicorn
```

---

## 🚀 Panduan Menjalankan Backend

### 1. Masuk ke Virtual Environment

Pastikan virtual environment Python telah disiapkan:

- **Windows (PowerShell)**:
  ```powershell
  cd backend
  .\.venv\Scripts\Activate.ps1
  ```

- **Linux / macOS**:
  ```bash
  cd backend
  source .venv/bin/activate
  ```

### 2. Instal Dependensi

```bash
pip install -r requirements.txt
```

### 3. Jalankan Server Uvicorn

```bash
python run.py
```

Server akan aktif secara lokal di:
- **Base URL**: `http://127.0.0.1:8000`
- **Swagger Documentation**: [http://127.0.0.1:8000/api/v1/docs](http://127.0.0.1:8000/api/v1/docs)
- **ReDoc Documentation**: [http://127.0.0.1:8000/api/v1/redoc](http://127.0.0.1:8000/api/v1/redoc)

---

## 📡 Dokumentasi Endpoint

### 1. Health Check
- **Method**: `GET`
- **Path**: `/api/v1/health`
- **Response**:
  ```json
  {
    "status": "healthy",
    "version": "0.1.0",
    "app": "Nalar STEM Backend"
  }
  ```

### 2. Minta Petunjuk Tantangan (Hint)
- **Method**: `POST`
- **Path**: `/api/v1/ai-tutor/hint`
- **Request Body**:
  ```json
  {
    "topic_slug": "linear-algebra-determinant-2d",
    "challenge_id": "c1",
    "current_variables": { "x1": 2, "y1": 0, "x2": 0, "y2": 3 },
    "failed_attempts": 2,
    "previous_hints_count": 0
  }
  ```
- **Response**:
  ```json
  {
    "hint_level": 1,
    "hint_text": "Perhatikan bahwa luas paralelogram adalah perkalian panjang alas dan tinggi saat vektor saling tegak lurus...",
    "audio_summary": "Coba geser vektor i ke kanan dan vektor j ke atas.",
    "suggested_action": "set x1=2, y2=2",
    "is_mock": true
  }
  ```

### 3. Obrolan STEM Kontekstual (Chat)
- **Method**: `POST`
- **Path**: `/api/v1/ai-tutor/chat`
- **Request Body**:
  ```json
  {
    "topic_slug": "arithmetic-modular-clock",
    "current_variables": { "modulo": 12, "multiplier": 2 },
    "history": [],
    "message": "Mengapa pengali 2 menghasilkan pola kardioid?"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "Pola kardioid muncul karena berkas garis yang menghubungkan titik $k$ dengan $2k \\pmod{n}$ membentuk garis singgung pada kurva sampul (envelope) kardioid...",
    "audio_summary": "Pola kardioid terbentuk dari garis singgung perkalian dua pada lingkaran modulo.",
    "suggested_followups": ["Bagaimana jika pengalinya bernilai 3?", "Apa yang terjadi jika bilangan bersifat koprima?"],
    "is_mock": true
  }
  ```

---

## ⚙️ Pengaturan Environment

Variabel konfigurasi dapat disetel melalui berkas `.env` di folder `backend/`:

| Variabel | Tipe | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `PROJECT_NAME` | string | `Nalar STEM Backend` | Nama aplikasi |
| `BACKEND_CORS_ORIGINS` | list | `["http://localhost:3000"]` | Asal domain frontend yang diizinkan |
| `MOCK_AI` | boolean | `True` | Gunakan mesin mock lokal tanpa token |
