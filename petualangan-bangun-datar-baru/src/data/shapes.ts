/** Data bangun datar: path SVG, ciri, rumus, benda sehari-hari */
/* ===== Data bentuk ===== */
export const P = {
  segitiga: "M50 10L92 88H8Z",
  persegi: "M18 18H82V82H18Z",
  persegipanjang: "M8 30H92V70H8Z",
  jajargenjang: "M30 25H95L70 75H5Z",
  belahketupat: "M50 6L90 50L50 94L10 50Z",
  layanglayang: "M50 6L80 38L50 94L20 38Z",
  trapesium: "M30 25H70L94 75H6Z",
  segitigasamasisi: "M50 12L90 82H10Z",
  segitigasiku: "M14 14V86H86Z",
  segitigasamakaki: "M50 8L80 90H20Z",
  segitigasembarang: "M12 80L62 14L92 70Z",
};
export const sv = (n, c = "#ffc93c", w = 110) =>
  `<svg viewBox="0 0 100 100" width="${w}" height="${w}">${n == "lingkaran" ? `<circle cx="50" cy="50" r="42" fill="${c}" stroke="#17306b" stroke-width="4"/>` : `<path d="${P[n]}" fill="${c}" stroke="#17306b" stroke-width="4" stroke-linejoin="round"/>`}</svg>`;
export const SH: Record<string, [string, number, number, string, string, string]> = {
  segitiga: ["Segitiga", 3, 3, "Punya 3 sisi dan 3 sudut", "s₁ + s₂ + s₃", "½ × a × t"],
  persegi: ["Persegi", 4, 4, "4 sisi sama panjang, 4 sudut siku-siku", "4 × s", "s × s"],
  persegipanjang: [
    "Persegi panjang",
    4,
    4,
    "Sisi berhadapan sama panjang, 4 sudut siku-siku",
    "2 × (p + l)",
    "p × l",
  ],
  lingkaran: [
    "Lingkaran",
    0,
    0,
    "Tidak punya sisi dan sudut, semua titik tepi berjarak sama dari pusat",
    "2 × π × r",
    "π × r × r",
  ],
  jajargenjang: ["Jajargenjang", 4, 4, "Sisi berhadapan sejajar dan sama panjang", "2 × (a + b)", "a × t"],
  belahketupat: [
    "Belah ketupat",
    4,
    4,
    "4 sisi sama panjang, diagonal berpotongan tegak lurus",
    "4 × s",
    "½ × d₁ × d₂",
  ],
  layanglayang: [
    "Layang-layang",
    4,
    4,
    "2 pasang sisi bersebelahan sama panjang",
    "2 × (a + b)",
    "½ × d₁ × d₂",
  ],
  trapesium: ["Trapesium", 4, 4, "Punya sepasang sisi sejajar", "jumlah keempat sisi", "½ × (a + b) × t"],
  segitigasamasisi: ["Segitiga sama sisi", 3, 3, "3 sisi sama panjang, tiap sudut 60°", "3 × s", "½ × a × t"],
  segitigasiku: ["Segitiga siku-siku", 3, 3, "Punya 1 sudut siku-siku (90°)", "s₁ + s₂ + s₃", "½ × a × t"],
  segitigasamakaki: ["Segitiga sama kaki", 3, 3, "2 sisi sama panjang", "s₁ + s₂ + s₃", "½ × a × t"],
  segitigasembarang: ["Segitiga sembarang", 3, 3, "Ketiga sisi berbeda panjang", "s₁ + s₂ + s₃", "½ × a × t"],
};
export const SN = Object.keys(SH),
  nm = (s) => SH[s][0];
export const COLOR = ["#ffc93c", "#4aa3f0", "#ef5b6b", "#4cc25a"];
export const OB = {
  "⚽": "lingkaran",
  "🕐": "lingkaran",
  "🍪": "lingkaran",
  "🚪": "persegipanjang",
  "📘": "persegipanjang",
  "🖼️": "persegipanjang",
  "🛏️": "persegipanjang",
  "🪟": "persegi",
  "🎲": "persegi",
  "🟦": "persegi",
  "⛺": "segitiga",
  "🧀": "segitiga",
  "🍕": "segitiga",
  "🔺": "segitiga",
};
export const B = ["segitiga", "persegi", "persegipanjang", "lingkaran"],
  QD = ["persegi", "persegipanjang", "jajargenjang", "belahketupat", "layanglayang", "trapesium"],
  TR = ["segitigasamasisi", "segitigasiku", "segitigasamakaki", "segitigasembarang"];
