/** Konten: pulau, tujuan level, tema langit, prestasi */
import type { Save } from "../types";

export const ISL: [string, string][] = [
  ["Pulau Bentuk", "Mengenal bentuk dasar"],
  ["Hutan Segi Empat", "Sisi, sudut dan jenis-jenisnya"],
  ["Pegunungan Segitiga", "Jenis segitiga dan keliling"],
  ["Danau Lingkaran", "Jari-jari, diameter dan luas"],
  ["Kastil Geometri", "Gabungan bentuk dan luas"],
];
export const GOAL = [
  "Mengenali persegi, segitiga, persegi panjang, dan lingkaran.",
  "Menghitung keliling dan luas bangun segi empat.",
  "Mengenal jenis segitiga, sudut, keliling, dan luas.",
  "Memahami jari-jari, diameter, keliling, dan luas lingkaran.",
  "Menghitung luas bangun gabungan dan menyelesaikan soal cerita.",
];
export const PL = ["Gerbang", "Jalan Setapak", "Jembatan", "Sungai", "Puncak", "Penjaga Pulau"];
export const SKY = [
  "#7fcdfa,#d5f0ff",
  "#c9a8f0,#efe2ff",
  "#9fd0ff,#e8f4ff",
  "#6fd6e8,#d8f7ff",
  "#ffd48a,#fff1cf",
];
export const TOTAL_LEVELS = 30;

export interface Achievement {
  icon: string;
  title: string;
  desc: string;
  value: (s: Save) => number;
  target: number;
}
const doneCount = (s: Save) => Object.keys(s.done).length;
export const ACH: Achievement[] = [
  { icon: "🥇", title: "Langkah Pertama", desc: "Selesaikan 1 level", value: doneCount, target: 1 },
  {
    icon: "💯",
    title: "Nilai Sempurna",
    desc: "Jawab 5 soal benar pada percobaan pertama",
    value: (s) => s.perf,
    target: 1,
  },
  {
    icon: "🌟",
    title: "Kolektor Bintang",
    desc: "Raih 3 bintang di 5 level",
    value: (s) => Object.values(s.done).filter((v) => v === 3).length,
    target: 5,
  },
  ...ISL.map(([n], k): Achievement => ({
    icon: "🏝️",
    title: "Taklukkan " + n,
    desc: "Selesaikan 6 level di " + n,
    value: (s) => [1, 2, 3, 4, 5, 6].filter((j) => s.done[k * 6 + j]).length,
    target: 6,
  })),
  {
    icon: "🔷",
    title: "Pemburu Bentuk",
    desc: "Kumpulkan 12 bentuk",
    value: (s) => s.col.length,
    target: 12,
  },
  {
    icon: "👑",
    title: "Master Bentuk",
    desc: "Kumpulkan 24 bentuk",
    value: (s) => s.col.length,
    target: 24,
  },
  {
    icon: "🪙",
    title: "Saku Penuh",
    desc: "Kumpulkan 300 koin",
    value: (s) => s.coin,
    target: 300,
  },
  {
    icon: "🏆",
    title: "Juara Petualangan",
    desc: "Selesaikan 30 level",
    value: doneCount,
    target: 30,
  },
];
