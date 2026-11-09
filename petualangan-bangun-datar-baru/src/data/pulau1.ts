/**
 * Lima soal tetap untuk Level 1, 2, dan 3 (Pulau 1).
 * Urutan soal dan urutan pilihan jawaban TIDAK diacak, dan sama untuk ketiga level.
 * Semua ilustrasi adalah SVG buatan sendiri (aman untuk dangerouslySetInnerHTML).
 */
import type { FixedQuestion } from "../types";

const INK = "#17306b";
const wrap = (inner: string) =>
  `<svg viewBox="0 0 220 150" width="220" height="150" role="img" aria-hidden="true">${inner}</svg>`;

/** Jam dinding bulat */
const CLOCK = wrap(`
  <rect x="0" y="0" width="220" height="150" rx="14" fill="#fff3d6"/>
  <circle cx="110" cy="78" r="62" fill="#fff" stroke="#8a5a2a" stroke-width="10"/>
  <circle cx="110" cy="78" r="52" fill="#fffdf4" stroke="${INK}" stroke-width="3"/>
  ${Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    const x1 = 110 + Math.sin(a) * 44,
      y1 = 78 - Math.cos(a) * 44,
      x2 = 110 + Math.sin(a) * 50,
      y2 = 78 - Math.cos(a) * 50;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${INK}" stroke-width="${i % 3 === 0 ? 4 : 2}" stroke-linecap="round"/>`;
  }).join("")}
  <line x1="110" y1="78" x2="110" y2="42" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <line x1="110" y1="78" x2="136" y2="90" stroke="#ef5b6b" stroke-width="5" stroke-linecap="round"/>
  <circle cx="110" cy="78" r="5" fill="${INK}"/>
`);

/** Rumah dengan atap segitiga */
const HOUSE = wrap(`
  <rect x="0" y="0" width="220" height="150" rx="14" fill="#d9f0ff"/>
  <rect x="0" y="120" width="220" height="30" fill="#7fd05a"/>
  <rect x="55" y="68" width="110" height="64" fill="#ffe8a8" stroke="${INK}" stroke-width="4"/>
  <polygon points="42,70 110,16 178,70" fill="#ef5b6b" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="96" y="92" width="28" height="40" rx="3" fill="#8a5a2a" stroke="${INK}" stroke-width="3"/>
  <rect x="66" y="82" width="22" height="22" fill="#bfe6ff" stroke="${INK}" stroke-width="3"/>
  <rect x="132" y="82" width="22" height="22" fill="#bfe6ff" stroke="${INK}" stroke-width="3"/>
`);

/** Ubin lantai bersisi sama */
const TILES = wrap(`
  <rect x="0" y="0" width="220" height="150" rx="14" fill="#f4ead6"/>
  ${[0, 1, 2]
    .flatMap((r) =>
      [0, 1, 2, 3].map((c) => {
        const x = 40 + c * 34,
          y = 20 + r * 34;
        const col = (r + c) % 2 ? "#6db4ff" : "#ffd25a";
        return `<rect x="${x}" y="${y}" width="32" height="32" fill="${col}" stroke="${INK}" stroke-width="2.5"/>`;
      }),
    )
    .join("")}
  <path d="M40 130H72M40 126V134M72 126V134" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <text x="56" y="146" font-size="11" text-anchor="middle" fill="${INK}" font-family="Baloo 2, sans-serif" font-weight="700">sama</text>
`);

/** Pintu persegi panjang */
const DOOR = wrap(`
  <rect x="0" y="0" width="220" height="150" rx="14" fill="#e6f1ff"/>
  <rect x="62" y="12" width="96" height="126" fill="#c9a874" stroke="${INK}" stroke-width="4"/>
  <rect x="72" y="22" width="76" height="116" fill="#a8703a" stroke="${INK}" stroke-width="4"/>
  <rect x="82" y="32" width="56" height="38" rx="3" fill="#bd8650" stroke="#6b4423" stroke-width="2"/>
  <rect x="82" y="78" width="56" height="52" rx="3" fill="#bd8650" stroke="#6b4423" stroke-width="2"/>
  <circle cx="134" cy="84" r="0" fill="#ffd25a"/>
  <circle cx="132" cy="92" r="5" fill="#ffd25a" stroke="${INK}" stroke-width="2"/>
`);

/** Roda sepeda dilihat dari samping */
const BIKE = wrap(`
  <rect x="0" y="0" width="220" height="150" rx="14" fill="#e4f6cf"/>
  <rect x="0" y="122" width="220" height="28" fill="#c9b48a"/>
  ${[60, 160]
    .map(
      (cx) => `
    <circle cx="${cx}" cy="94" r="34" fill="none" stroke="${INK}" stroke-width="6"/>
    <circle cx="${cx}" cy="94" r="28" fill="none" stroke="#9aa9c4" stroke-width="1.5"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const a = (i * 45 * Math.PI) / 180;
      return `<line x1="${cx}" y1="94" x2="${(cx + Math.sin(a) * 28).toFixed(1)}" y2="${(94 - Math.cos(a) * 28).toFixed(1)}" stroke="#9aa9c4" stroke-width="1.5"/>`;
    }).join("")}
    <circle cx="${cx}" cy="94" r="5" fill="#ef5b6b" stroke="${INK}" stroke-width="2"/>`,
    )
    .join("")}
  <path d="M60 94L90 58H132L160 94M90 58L108 94H60M108 94L132 58" fill="none" stroke="#2f7fe0" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M84 52H100M128 52L140 40H152" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
`);

export const FIXED_QUESTIONS: FixedQuestion[] = [
  {
    q: "Jam dinding berbentuk bulat menyerupai bangun datar apa?",
    vis: CLOCK,
    o: ["Segitiga", "Persegi", "Lingkaran", "Persegi panjang"],
    a: 2,
    w: "Jam dinding yang bulat menyerupai lingkaran.",
  },
  {
    q: "Atap rumah pada gambar menyerupai bentuk apa?",
    vis: HOUSE,
    o: ["Lingkaran", "Segitiga", "Persegi", "Persegi panjang"],
    a: 1,
    w: "Atap rumah itu punya 3 sisi dan 3 sudut, jadi bentuknya segitiga.",
  },
  {
    q: "Ubin dengan empat sisi sama panjang menyerupai apa?",
    vis: TILES,
    o: ["Segitiga", "Lingkaran", "Persegi", "Persegi panjang"],
    a: 2,
    w: "Bangun dengan 4 sisi sama panjang dan 4 sudut siku-siku adalah persegi.",
  },
  {
    q: "Pintu berbentuk persegi panjang memiliki berapa sisi?",
    vis: DOOR,
    o: ["3 sisi", "4 sisi", "5 sisi", "6 sisi"],
    a: 1,
    w: "Persegi panjang memiliki 4 sisi.",
  },
  {
    q: "Roda sepeda jika dilihat dari samping berbentuk apa?",
    vis: BIKE,
    o: ["Persegi", "Segitiga", "Persegi panjang", "Lingkaran"],
    a: 3,
    w: "Roda sepeda dilihat dari samping berbentuk lingkaran.",
  },
];

export const QUESTION_COUNT = FIXED_QUESTIONS.length; // 5
export const MAX_LIVES = 3;
