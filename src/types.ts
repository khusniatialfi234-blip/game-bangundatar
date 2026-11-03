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
  score: number;
  bonus: number;
  coin: number;
  correct: number;
}
