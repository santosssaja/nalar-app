"""Mock AI Tutor Service for zero-token local testing and offline resilience."""
from typing import Dict
from app.schemas.ai_tutor import HintRequest, HintResponse, ChatRequest, ChatResponse


class MockAITutorService:
    @staticmethod
    def generate_hint(request: HintRequest) -> HintResponse:
        level = min(request.previous_hints_count + 1, 3)
        slug = request.topic_slug
        vars_state = request.current_variables

        # Customized mock hints for Linear Algebra: 2D Determinant
        if "determinant" in slug or "linear-algebra" in slug:
            i_hat_x = vars_state.get("i_hat_x", 1.0)
            j_hat_y = vars_state.get("j_hat_y", 1.0)
            det = vars_state.get("det", i_hat_x * j_hat_y)

            if level == 1:
                return HintResponse(
                    hint_level=1,
                    hint_text="Petunjuk 1: Ingat bahwa determinan matriks 2D merepresentasikan faktor pengali luas kotak satuan awal $(1 \\times 1)$. Amati apa yang terjadi pada jajaran genjang saat kamu memperpanjang vektor basis $\\hat{i}$.",
                    audio_summary="Determinan adalah luas jajaran genjang. Coba amati perubahan luas saat menggeser vektor basis.",
                    suggested_action="Coba geser slider vektor basis i_hat atau j_hat secara perlahan.",
                    is_mock=True,
                )
            elif level == 2:
                return HintResponse(
                    hint_level=2,
                    hint_text=f"Petunjuk 2: Nilai determinan saat ini adalah sekitar ${det:.2f}$. Rumus determinan untuk matriks $\\begin{{bmatrix}} a & b \\\\ c & d \\end{{bmatrix}}$ adalah $ad - bc$. Jika luas target adalah 4, nilai perkalian elemen diagonal utama harus menghasilkan selisih 4.",
                    audio_summary=f"Nilai determinan saat ini adalah {det:.1f}. Ingat rumus selisih perkalian silang a kali d dikurang b kali c.",
                    suggested_action="Atur vektor agar determinan mendekati nilai target yang diminta soal.",
                    is_mock=True,
                )
            else:
                return HintResponse(
                    hint_level=3,
                    hint_text="Petunjuk 3 (Solusi Bertahap): Untuk mencapai luas 4 dengan matriks diagonal sederhana, kamu bisa mengatur $\\hat{i} = [2, 0]$ dan $\\hat{j} = [0, 2]$, sehingga $\\det = (2)(2) - (0)(0) = 4$.",
                    audio_summary="Untuk mencapai target luas empat, atur i_hat bernilai dua koma nol dan j_hat bernilai nol koma dua.",
                    suggested_action="Set i_hat_x ke 2 dan j_hat_y ke 2.",
                    is_mock=True,
                )

        # Customized mock hints for Number Theory: Modular Clock
        if "modular-clock" in slug or "arithmetic" in slug:
            n = int(vars_state.get("n", 12))
            m = int(vars_state.get("multiplier", 2))
            if level == 1:
                return HintResponse(
                    hint_level=1,
                    hint_text="Petunjuk 1: Bayangkan jarum jam dinding. Setelah mencapai batas n, angka tidak bertambah ke n+1, melainkan kembali berputar dari 0.",
                    audio_summary="Aritmetika jam adalah perhitungan sisa bagi setelah satu putaran penuh lingkaran.",
                    suggested_action="Perhatikan posisi jarum jam hijau pada kanvas.",
                    is_mock=True,
                )
            elif level == 2:
                return HintResponse(
                    hint_level=2,
                    hint_text=f"Petunjuk 2: Pada sistem jam n = {n}, nilai sisa pembagian adalah (a + b) mod {n}. Untuk membentuk kurva kardioid, atur pengali m = 2.",
                    audio_summary="Untuk kurva kardioid, set pengali m ke dua.",
                    suggested_action="Ubah pengali m menjadi 2.",
                    is_mock=True,
                )
            else:
                return HintResponse(
                    hint_level=3,
                    hint_text=f"Petunjuk 3 (Solusi Bertahap): Untuk menghasilkan siklus penuh yang mengunjungi semua angka, pilih pengali m yang koprima (FPB = 1) dengan {n}, misalnya m = 5.",
                    audio_summary="Pilih pengali yang tidak berbagi faktor pembagi dengan modulus jam, seperti lima.",
                    suggested_action="Pilih pengali 5 pada slider.",
                    is_mock=True,
                )

        # Generic STEM fallback
        if level == 1:
            return HintResponse(
                hint_level=1,
                hint_text="Petunjuk 1: Mulai dengan mengamati hubungan sebab-akibat. Jika kamu menaikkan satu parameter, apakah nilai target membesar atau mengecil?",
                audio_summary="Amati hubungan sebab akibat saat menggeser nilai parameter.",
                suggested_action="Geser salah satu slider sedikit ke kiri atau kanan.",
                is_mock=True,
            )
        elif level == 2:
            return HintResponse(
                hint_level=2,
                hint_text="Petunjuk 2: Perhatikan formula matematika di panel atas. Variabel mana yang memiliki pengaruh langsung paling besar terhadap target kondisi?",
                audio_summary="Perhatikan formula matematika dan cari variabel yang paling berpengaruh.",
                suggested_action="Fokuskan manipulasi pada variabel utama.",
                is_mock=True,
            )
        else:
            return HintResponse(
                hint_level=3,
                hint_text="Petunjuk 3: Cocokkan nilai variabel kamu dengan kondisi batas yang ditentukan pada deskripsi tantangan.",
                audio_summary="Sesuaikan nilai variabel agar memenuhi kondisi batas soal.",
                suggested_action="Atur variabel mendekati nilai tebakan awal.",
                is_mock=True,
            )

    @staticmethod
    def answer_question(request: ChatRequest) -> ChatResponse:
        msg_lower = request.message.lower()
        slug = request.topic_slug

        if "apa itu determinan" in msg_lower or "determinan" in msg_lower:
            reply = (
                "Secara intuitif visual, **determinan** adalah faktor penskalaan luas (pada 2D) atau volume (pada 3D) "
                "akibat transformasi linear.\n\n"
                "Jika kamu memiliki kotak berukuran $1 \\times 1$ (luas = $1$), lalu menerapkan matriks "
                "$A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, kotak tersebut berubah menjadi jajaran genjang "
                "dengan luas sebesar $|\\det(A)| = |ad - bc|$.\n\n"
                "- Jika $\\det(A) = 0$, dimensi ruang 'mengempis' menjadi satu garis atau satu titik (tidak memiliki invers).\n"
                "- Jika $\\det(A) < 0$, orientasi ruang terbalik (seperti bayangan di cermin)."
            )
            audio = "Secara visual, determinan adalah rasio pembesaran luas wilayah akibat perubahan matriks transformasi."
            followups = [
                "Mengapa jika determinan nol matriks tidak punya invers?",
                "Bagaimana jika determinan bernilai negatif?",
            ]
        elif "kenapa bisa nol" in msg_lower or "nol" in msg_lower:
            reply = (
                "Jika $\\det(A) = 0$, artinya vektor-vektor basis mendarat pada garis yang sama (kolinier). "
                "Luas jajaran genjang menjadi $0$. Karena informasi dua dimensi hilang dan mengempis menjadi 1 dimensi, "
                "kamu tidak bisa membalikkan (*reverse*) proses ini secara unik, itulah sebabnya matriks singular tidak memiliki invers."
            )
            audio = "Determinan nol berarti ruang dua dimensi gepeng menjadi garis, sehingga luasnya nol dan informasinya hilang."
            followups = [
                "Coba demonstrasikan matriks yang membuat determinan nol.",
                "Apa arti geometris dari nilai eigen?",
            ]
        else:
            reply = (
                f"Pertanyaan yang bagus mengenai topik **{slug}**! Pada platform Nalar, kamu dapat langsung mengamati "
                f"setiap konsep matematika melalui simulasi interaktif di sebelah kiri. Variabel aktif saat ini terhubung langsung "
                f"dengan kalkulasi matematis di kanvas."
            )
            audio = "Kamu dapat melihat perubahan konsep matematika secara langsung pada kanvas simulasi."
            followups = [
                "Bagaimana cara menyelesaikan tantangan di topik ini?",
                "Jelaskan kembali rumus matematikanya.",
            ]

        return ChatResponse(
            reply=reply,
            audio_summary=audio,
            suggested_followups=followups,
            is_mock=True,
        )
