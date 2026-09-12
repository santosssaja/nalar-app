export type NaiExpression =
  | "happy"
  | "thinking"
  | "celebrating"
  | "encouraging"
  | "hinting"
  | "teaching"
  | "sleeping"
  | "proud"
  | "curious"
  | "neutral"
  | "highContrast";

export interface NaiExpressionData {
  id: NaiExpression;
  name: string;
  ariaLabel: string;
  defaultMessage: string;
  moodColor: string;
  accessory?: "lightbulb" | "book" | "zzz" | "stars" | "medal" | "sparkles";
}

export const NAI_EXPRESSIONS: Record<NaiExpression, NaiExpressionData> = {
  happy: {
    id: "happy",
    name: "Senang",
    ariaLabel: "Nai panda merah tersenyum gembira",
    defaultMessage: "Halo! Semangat mengeksplorasi konsep baru hari ini!",
    moodColor: "#f59e0b",
    accessory: "sparkles",
  },
  thinking: {
    id: "thinking",
    name: "Berpikir",
    ariaLabel: "Nai panda merah sedang merenungkan teka-teki logika",
    defaultMessage: "Hmm... coba telaah pola atau sifat dasarnya perlahan-lahan.",
    moodColor: "#6366f1",
  },
  celebrating: {
    id: "celebrating",
    name: "Merayakan",
    ariaLabel: "Nai melompat gembira merayakan keberhasilanmu",
    defaultMessage: "Luar biasa! Kamu berhasil menaklukkan tantangan ini!",
    moodColor: "#10b981",
    accessory: "stars",
  },
  encouraging: {
    id: "encouraging",
    name: "Menyemangati",
    ariaLabel: "Nai memberi jempol dan dorongan semangat",
    defaultMessage: "Jangan menyerah! Setiap kesalahan adalah petunjuk menuju pemahaman sejati.",
    moodColor: "#0ea5e9",
  },
  hinting: {
    id: "hinting",
    name: "Memberi Petunjuk",
    ariaLabel: "Nai menemukan ide petunjuk baru dengan lampu menyala",
    defaultMessage: "Nai punya sedikit petunjuk untukmu, perhatikan parameter berikut...",
    moodColor: "#facc15",
    accessory: "lightbulb",
  },
  teaching: {
    id: "teaching",
    name: "Membimbing",
    ariaLabel: "Nai membuka buku panduan untuk menjelaskan langkah solusi",
    defaultMessage: "Mari kita urai langkah demi langkah secara terstruktur.",
    moodColor: "#8b5cf6",
    accessory: "book",
  },
  sleeping: {
    id: "sleeping",
    name: "Istirahat",
    ariaLabel: "Nai tidur lelap dengan balon tidur zzz",
    defaultMessage: "Zzz... Nai istirahat sejenak. Sentuh Nai kalau kamu butuh bantuan!",
    moodColor: "#64748b",
    accessory: "zzz",
  },
  proud: {
    id: "proud",
    name: "Bangga",
    ariaLabel: "Nai berdiri tegak dengan medali kebanggaan",
    defaultMessage: "Keren sekali! Pemahaman konseptualmu semakin mendalam!",
    moodColor: "#ec4899",
    accessory: "medal",
  },
  curious: {
    id: "curious",
    name: "Penasaran",
    ariaLabel: "Nai memiringkan kepala penasaran melihat simulasi",
    defaultMessage: "Wah, apa yang terjadi jika nilainya digeser lebih jauh lagi?",
    moodColor: "#06b6d4",
  },
  neutral: {
    id: "neutral",
    name: "Ramah",
    ariaLabel: "Nai tersenyum tenang siap membantu kapan saja",
    defaultMessage: "Nai siap menemanimu belajar matematika & sains interaktif.",
    moodColor: "#f97316",
  },
  highContrast: {
    id: "highContrast",
    name: "Kontras Tinggi",
    ariaLabel: "Siluet kontras tinggi Nai dengan garis luar kuning tebal",
    defaultMessage: "Mode aksesibilitas kontras tinggi aktif untuk keterbacaan optimal.",
    moodColor: "#facc15",
  },
};
