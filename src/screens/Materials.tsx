import { Shape } from "../components/Shape";
import { TopBar } from "../components/TopBar";
import { SH, SN } from "../data/shapes";
import type { Screen } from "../types";

const RULES: [string, string, string][] = [
  ["✅", "Soal per level", "5 soal"],
  ["✔️", "Jawaban benar", "+100 poin"],
  ["❌", "Jawaban salah", "0 poin (ada penjelasan & coba lagi)"],
  ["🔺", "Bonus eksplorasi", "+10 poin / collectible"],
  ["💡", "Bonus tanpa petunjuk", "+50 poin"],
  ["⭐", "Bintang", "1–3 bintang (berdasarkan skor akhir)"],
  ["🔷", "XP", "Diperoleh setelah level selesai"],
  ["🪙", "Koin", "Hadiah untuk aksesori karakter"],
  ["❤️", "Nyawa", "Tidak ada hukuman permanen (respawn di checkpoint)"],
];

export function Materials({ go }: { go: (s: Screen) => void }) {
  return (
    <section className="scr on">
      <TopBar go={go} />
      <div className="body">
        <div className="ttl">Materi</div>
        {SN.map((s) => (
          <details key={s} className="card">
            <summary>
              <Shape name={s} size={34} /> <b>{SH[s][0]}</b>
            </summary>
            <p>
              Sisi: {SH[s][1]} · Sudut: {SH[s][2]}
              <br />
              {SH[s][3]}.<br />
              <b>Keliling:</b> {SH[s][4]}
              <br />
              <b>Luas:</b> {SH[s][5]}
            </p>
          </details>
        ))}
        <div className="card rules">
          <h3>Ringkasan Rule &amp; Scoring</h3>
          {RULES.map(([i, k, v]) => (
            <div key={k} className="rrow">
              <span>
                {i} {k}
              </span>
              <b>{v}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
