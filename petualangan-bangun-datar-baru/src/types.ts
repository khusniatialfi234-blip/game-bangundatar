export type Screen =
  "home" | "map" | "koleksi" | "detail" | "explore" | "quiz" | "result" | "prestasi" | "materi" | "profil";

export interface Question {
  q: string;
  vis: string; // HTML/SVG buatan sendiri (aman), ditampilkan lewat dangerouslySetInnerHTML
  o: string[];
  a: number[];
  m: boolean; // true = pilih banyak jawaban
  w: string; // penjelasan
}

/** Soal pilihan ganda tetap (satu jawaban benar, urutan pilihan tidak diacak) */
export interface FixedQuestion {
  q: string;
  vis: string;
  o: string[];
  a: number; // indeks jawaban benar
  w: string; // penjelasan singkat
}

export interface Save {
  name: string;
  star: number;
  coin: number;
  gem: number;
  xp: number;
  done: Record<number, number>; // nomor level -> bintang
  col: number[]; // indeks koleksi bentuk
  day: string;
  daily: number;
  perf: number;
}

export interface LevelResult {
  stars: number;
  correct: number;
  wrong: number;
  answered: number; // jumlah soal yang sudah dijawab (bisa < 5 jika nyawa habis)
  lives: number; // sisa nyawa
  coin: number;
  gameOver: boolean; // true jika nyawa habis sebelum 5 soal selesai
}

export interface QuizOutcome {
  correct: number;
  wrong: number;
  answered: number;
  lives: number;
}
