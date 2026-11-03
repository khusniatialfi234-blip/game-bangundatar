/** Bank soal: soal fakta (FQ) dan pembuat soal hitungan acak per pulau (G) */
import type { Question } from "../types";
import { R, pick, rn, shuf } from "../lib/random";
import { sv, SH, nm, OB, B, QD, TR, COLOR } from "./shapes";
/* ===== Pembuat soal ===== */
export const oth = (a: string[], x: string, n = 3): string[] => shuf(a.filter((y) => y != x)).slice(0, n);
function mk(q: string, vis: string, c: string[], w: string[], why: string, m?: boolean): Question {
  const o = shuf([...c, ...w]);
  return { q, vis, o, a: c.map((x) => o.indexOf(x)), m: !!m, w: why };
}
export const one = (q: string, vis: string, c: string, w: string[], why: string) => mk(q, vis, [c], w, why);
function num(q: string, vis: string, ans: number, u: string, why: string): Question {
  const s = new Set([ans]);
  [ans + 1, ans * 2, ans + 5, Math.round(ans / 2), ans - 3, ans + 10, ans + 2, ans + 7].forEach((x) => {
    if (x > 0 && s.size < 4) s.add(x);
  });
  const a = [...s];
  return one(
    q,
    vis,
    ans + " " + u,
    a.slice(1).map((x) => x + " " + u),
    why + " = " + ans + " " + u + ".",
  );
}
export const idf = (arr: string[]) => () => {
  const s = pick(arr);
  return one(
    "Bangun datar apa ini?",
    sv(s, pick(COLOR)),
    nm(s),
    oth(arr, s).map(nm),
    nm(s) + ": " + SH[s][3] + ".",
  );
};
export const FQ: [string, string, string[]][][] = [
  [],
  [
    ["Bentuk mana yang tidak punya sudut?", "Lingkaran", ["Persegi", "Segitiga", "Persegi panjang"]],
    ["Bentuk mana yang punya 3 sisi?", "Segitiga", ["Persegi", "Lingkaran", "Persegi panjang"]],
    [
      "Bentuk mana yang keempat sisinya sama panjang?",
      "Persegi",
      ["Persegi panjang", "Segitiga", "Lingkaran"],
    ],
    ["Roda sepeda berbentuk...", "Lingkaran", ["Segitiga", "Persegi", "Persegi panjang"]],
    [
      "Bentuk dengan sisi berhadapan sama panjang, tetapi tidak semua sisi sama?",
      "Persegi panjang",
      ["Persegi", "Segitiga", "Lingkaran"],
    ],
    ["Berapa jumlah sudut persegi panjang?", "4", ["3", "2", "0"]],
  ],
  [
    [
      "Bangun dengan 4 sisi sama panjang dan diagonal berpotongan tegak lurus?",
      "Belah ketupat",
      ["Jajargenjang", "Trapesium", "Persegi panjang"],
    ],
    [
      "Bangun yang hanya punya sepasang sisi sejajar?",
      "Trapesium",
      ["Jajargenjang", "Persegi", "Belah ketupat"],
    ],
    [
      "Bangun dengan 2 pasang sisi bersebelahan sama panjang?",
      "Layang-layang",
      ["Trapesium", "Persegi panjang", "Jajargenjang"],
    ],
    ["Rumus luas persegi panjang?", "p × l", ["2 × (p + l)", "s × s", "½ × a × t"]],
    ["Rumus keliling persegi?", "4 × s", ["s × s", "2 × s", "s + 4"]],
    ["Besar sudut persegi?", "90°", ["60°", "45°", "180°"]],
  ],
  [
    ["Jumlah ketiga sudut segitiga?", "180°", ["90°", "360°", "100°"]],
    [
      "Segitiga dengan 3 sisi sama panjang?",
      "Segitiga sama sisi",
      ["Segitiga siku-siku", "Segitiga sembarang", "Segitiga sama kaki"],
    ],
    [
      "Segitiga yang punya satu sudut 90°?",
      "Segitiga siku-siku",
      ["Segitiga sama sisi", "Segitiga sama kaki", "Segitiga sembarang"],
    ],
    [
      "Segitiga yang dua sisinya sama panjang?",
      "Segitiga sama kaki",
      ["Segitiga sama sisi", "Segitiga siku-siku", "Segitiga sembarang"],
    ],
    ["Rumus luas segitiga?", "½ × a × t", ["a × t", "a + t", "½ × a + t"]],
    ["Tiap sudut segitiga sama sisi besarnya?", "60°", ["90°", "45°", "30°"]],
  ],
  [
    ["Garis dari pusat ke tepi lingkaran?", "Jari-jari", ["Diameter", "Busur", "Tali busur"]],
    ["Garis lurus terpanjang yang melalui pusat lingkaran?", "Diameter", ["Jari-jari", "Busur", "Juring"]],
    ["Hubungan diameter dan jari-jari?", "d = 2 × r", ["d = r", "d = r ÷ 2", "d = r + 2"]],
    ["Rumus keliling lingkaran?", "2 × π × r", ["π × r × r", "π + r", "2 × r"]],
    ["Rumus luas lingkaran?", "π × r × r", ["2 × π × r", "π × d", "2 × r"]],
    ["Nilai π untuk jari-jari kelipatan 7?", "22/7", ["3", "7/22", "10"]],
  ],
  [
    [
      "Luas bangun gabungan dihitung dengan...",
      "Menjumlahkan luas bagiannya",
      ["Mengalikan semua sisi", "Menjumlahkan semua keliling", "Mengambil luas terbesar"],
    ],
    [
      "Luas bangun berlubang dihitung dengan...",
      "Luas besar dikurangi luas lubang",
      ["Luas besar ditambah lubang", "Luas lubang saja", "Keliling dikali dua"],
    ],
    ["Satuan luas adalah...", "cm²", ["cm", "cm³", "kg"]],
    ["Satuan keliling adalah...", "cm", ["cm²", "cm³", "kg"]],
    [
      "Rumah dengan atap segitiga adalah gabungan...",
      "Persegi dan segitiga",
      ["Dua lingkaran", "Dua segitiga", "Lingkaran dan persegi"],
    ],
    [
      "Gerbang persegi panjang dengan setengah lingkaran di atas adalah gabungan...",
      "Persegi panjang dan setengah lingkaran",
      ["Persegi dan segitiga", "Dua persegi", "Lingkaran dan segitiga"],
    ],
  ],
];
export const fact = (k) => () => {
  const [q, c, w] = pick(FQ[k]);
  return one(q, "", c, w, "Jawaban yang benar: " + c + ".");
};
export const sq = (n) => (L) => {
  const s = rn(3, 5 + L * 2);
  return n
    ? num(
        "Persegi bersisi " + s + " cm. Berapa luasnya?",
        sv("persegi"),
        s * s,
        "cm²",
        "Luas = s × s = " + s + " × " + s,
      )
    : num(
        "Persegi bersisi " + s + " cm. Berapa kelilingnya?",
        sv("persegi"),
        4 * s,
        "cm",
        "Keliling = 4 × " + s,
      );
};
export const G: ((L: number) => Question)[][] = [
  [],
  [
    idf(B),
    () => {
      const e = pick(Object.keys(OB));
      return one(
        "Benda ini berbentuk apa?",
        '<div class="big">' + e + "</div>",
        nm(OB[e]),
        oth(B, OB[e]).map(nm),
        "Benda itu berbentuk " + nm(OB[e]) + ".",
      );
    },
    () => {
      const s = pick(["segitiga", "persegi", "persegipanjang"]),
        n = String(SH[s][1]);
      return one(
        "Berapa banyak sisi " + nm(s).toLowerCase() + "?",
        sv(s),
        n,
        oth(["3", "4", "5", "6", "0"], n),
        nm(s) + " punya " + n + " sisi.",
      );
    },
    () => {
      const s = pick(B),
        es = Object.keys(OB),
        c = shuf(es.filter((e) => OB[e] == s)).slice(0, 2),
        w = shuf(es.filter((e) => OB[e] != s)).slice(0, 2);
      return mk(
        "Pilih semua benda berbentuk " + nm(s).toLowerCase() + "!",
        "",
        c,
        w,
        "Benda berbentuk " + nm(s) + ": " + c.join(" "),
        true,
      );
    },
    fact(1),
    fact(1),
  ],
  [
    idf(QD),
    fact(2),
    sq(0),
    sq(1),
    (L) => {
      const p = rn(6, 10 + L * 2),
        l = rn(3, 5 + L);
      return num(
        "Persegi panjang p = " + p + " cm dan l = " + l + " cm. Berapa luasnya?",
        sv("persegipanjang"),
        p * l,
        "cm²",
        "Luas = p × l = " + p + " × " + l,
      );
    },
    (L) => {
      const p = rn(6, 10 + L * 2),
        l = rn(3, 5 + L);
      return num(
        "Persegi panjang p = " + p + " cm dan l = " + l + " cm. Berapa kelilingnya?",
        sv("persegipanjang"),
        2 * (p + l),
        "cm",
        "Keliling = 2 × (" + p + " + " + l + ")",
      );
    },
    (L) => {
      const a = rn(4, 8 + L),
        t = rn(3, 6 + L);
      return num(
        "Jajargenjang alas " + a + " cm, tinggi " + t + " cm. Berapa luasnya?",
        sv("jajargenjang"),
        a * t,
        "cm²",
        "Luas = a × t = " + a + " × " + t,
      );
    },
    (L) => {
      const d = 2 * rn(2, 4 + L),
        e = rn(3, 8);
      return num(
        "Belah ketupat diagonal " + d + " cm dan " + e + " cm. Berapa luasnya?",
        sv("belahketupat"),
        (d * e) / 2,
        "cm²",
        "Luas = ½ × " + d + " × " + e,
      );
    },
    (L) => {
      const a = rn(3, 6),
        b = a + 2 * rn(1, 3),
        t = rn(2, 6);
      return num(
        "Trapesium sisi sejajar " + a + " cm dan " + b + " cm, tinggi " + t + " cm. Berapa luasnya?",
        sv("trapesium"),
        ((a + b) * t) / 2,
        "cm²",
        "Luas = ½ × (" + a + " + " + b + ") × " + t,
      );
    },
  ],
  [
    idf(TR),
    fact(3),
    () => {
      const a = rn(30, 80),
        b = rn(30, 70);
      return num(
        "Dua sudut segitiga adalah " + a + "° dan " + b + "°. Berapa sudut ketiganya?",
        sv("segitiga"),
        180 - a - b,
        "°",
        "Sudut ketiga = 180° − " + a + "° − " + b + "°",
      );
    },
    (L) => {
      const a = rn(3, 6 + L),
        b = rn(4, 7 + L),
        c = rn(5, 8 + L);
      return num(
        "Segitiga bersisi " + a + ", " + b + ", dan " + c + " cm. Berapa kelilingnya?",
        sv("segitigasembarang"),
        a + b + c,
        "cm",
        "Keliling = " + a + " + " + b + " + " + c,
      );
    },
    (L) => {
      const a = 2 * rn(2, 5 + L),
        t = rn(3, 6 + L);
      return num(
        "Segitiga alas " + a + " cm, tinggi " + t + " cm. Berapa luasnya?",
        sv("segitiga"),
        (a * t) / 2,
        "cm²",
        "Luas = ½ × " + a + " × " + t,
      );
    },
    () => {
      const [a, b, c] = pick([
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [9, 12, 15],
      ]);
      return num(
        "Segitiga siku-siku bersisi tegak " + a + " dan " + b + " cm. Berapa sisi miringnya?",
        sv("segitigasiku"),
        c,
        "cm",
        "Sisi miring = √(" + a + "² + " + b + "²)",
      );
    },
    (L) => {
      const s = rn(3, 7 + L);
      return num(
        "Segitiga sama sisi bersisi " + s + " cm. Berapa kelilingnya?",
        sv("segitigasamasisi"),
        3 * s,
        "cm",
        "Keliling = 3 × " + s,
      );
    },
    fact(3),
  ],
  [
    fact(4),
    () => {
      const r = rn(3, 10);
      return num(
        "Jari-jari lingkaran " + r + " cm. Berapa diameternya?",
        sv("lingkaran"),
        2 * r,
        "cm",
        "d = 2 × " + r,
      );
    },
    () => {
      const r = rn(3, 12);
      return num(
        "Diameter lingkaran " + 2 * r + " cm. Berapa jari-jarinya?",
        sv("lingkaran"),
        r,
        "cm",
        "r = " + 2 * r + " ÷ 2",
      );
    },
    (L) => {
      const r = 7 * rn(1, 1 + Math.min(L, 2));
      return num(
        "Jari-jari " + r + " cm (π = 22/7). Berapa keliling lingkaran?",
        sv("lingkaran"),
        (44 * r) / 7,
        "cm",
        "Keliling = 2 × 22/7 × " + r,
      );
    },
    (L) => {
      const r = 7 * rn(1, 2);
      return num(
        "Jari-jari " + r + " cm (π = 22/7). Berapa luas lingkaran?",
        sv("lingkaran"),
        (22 * r * r) / 7,
        "cm²",
        "Luas = 22/7 × " + r + " × " + r,
      );
    },
    () => {
      const d = 14 * rn(1, 2);
      return num(
        "Diameter " + d + " cm (π = 22/7). Berapa keliling lingkaran?",
        sv("lingkaran"),
        (22 * d) / 7,
        "cm",
        "Keliling = π × d = 22/7 × " + d,
      );
    },
    () => {
      const r = 10 * rn(1, 2);
      return num(
        "Jari-jari " + r + " cm (π = 3,14). Berapa luas lingkaran?",
        sv("lingkaran"),
        Math.round((314 * r * r) / 100),
        "cm²",
        "Luas = 3,14 × " + r + " × " + r,
      );
    },
    fact(4),
  ],
  [
    fact(5),
    fact(5),
    () => {
      const s = 2 * rn(2, 5),
        t = 2 * rn(1, 3);
      return num(
        "Rumah: persegi bersisi " +
          s +
          " m, atap segitiga alas " +
          s +
          " m dan tinggi " +
          t +
          " m. Berapa luas seluruhnya?",
        '<div class="big">🏠</div>',
        s * s + (s * t) / 2,
        "m²",
        "Luas = " + s + "×" + s + " + ½×" + s + "×" + t,
      );
    },
    () => {
      const p = rn(8, 12),
        q = rn(6, 9),
        s = rn(2, 4);
      return num(
        "Persegi panjang " +
          p +
          " × " +
          q +
          " m dipotong persegi " +
          s +
          " × " +
          s +
          " m di sudutnya. Berapa luas sisanya?",
        "",
        p * q - s * s,
        "m²",
        "Luas = " + p + "×" + q + " − " + s + "×" + s,
      );
    },
    () => {
      const l = rn(5, 10);
      return num(
        "Gerbang: persegi panjang lebar 14 m, tinggi " +
          l +
          " m, dengan setengah lingkaran (r = 7 m) di atasnya. Berapa luasnya? (π = 22/7)",
        '<div class="big">🏰</div>',
        14 * l + 77,
        "m²",
        "Luas = 14×" + l + " + ½×22/7×7×7",
      );
    },
    () => {
      const s = rn(16, 24);
      return num(
        "Taman persegi bersisi " + s + " m punya kolam lingkaran r = 7 m (π = 22/7). Berapa luas rumputnya?",
        '<div class="big">🌳</div>',
        s * s - 154,
        "m²",
        "Luas rumput = " + s + "×" + s + " − 154",
      );
    },
    () => {
      const p = 2 * rn(2, 5),
        l = 2 * rn(2, 4);
      return num(
        "Lantai " + p + " × " + l + " m dipasangi ubin persegi bersisi 2 m. Berapa ubin yang dibutuhkan?",
        "",
        (p * l) / 4,
        "ubin",
        "Jumlah ubin = (" + p + "×" + l + ") ÷ 4",
      );
    },
    (L) => {
      const p = rn(6, 9),
        l = rn(4, 5);
      return num(
        "Persegi panjang " +
          p +
          " × " +
          l +
          " m ditempel persegi bersisi " +
          l +
          " m pada sisi lebarnya. Berapa keliling gabungannya?",
        "",
        2 * (p + l + l),
        "m",
        "Keliling = 2 × (" + p + " + " + l + " + " + l + ")",
      );
    },
  ],
];
export const build = (n) => {
  const k = Math.floor((n - 1) / 6) + 1,
    L = (n - 1) % 6,
    p = G[k];
  return [0, 1, 2, 3, 4].map((i) => p[(i + L * 2) % p.length](L));
};
