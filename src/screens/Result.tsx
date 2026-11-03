/** Hasil Level: bintang, skor, koin, XP, jawaban */
import { Confetti } from "../components/Confetti";
import { Hero } from "../components/Hero";
import { Star } from "../components/Star";
import { TOTAL_LEVELS } from "../data/content";
import type { LevelResult } from "../types";

interface Props {
  level: number;
  result: LevelResult;
  onNext: () => void;
  onAgain: () => void;
}

export function Result({ level, result: r, onNext, onAgain }: Props) {
  const rows: [string, string, string | number][] = [
    ["⭐", "Skor", r.score],
    ["🪙", "Koin", r.coin],
    ["🔷", "XP", "+100"],
    ["💡", "Bonus tanpa petunjuk", `+${r.bonus}`],
  ];
  return (
    <section className="scr on resbg">
      <Confetti />
      <div className="body" style={{ textAlign: "center" }}>
        <div className="bigstars">
          {[0, 1, 2].map((i) => (
            <Star key={i} on={i < r.stars} size={i === 1 ? 84 : 66} />
          ))}
        </div>
        <div className="ribbon orange">Level Selesai!</div>
        <div className="hero floaty" style={{ margin: "-6px 0 0" }}>
          <Hero size={190} />
        </div>
        <div className="card res">
          <div className="resgrid">
            {rows.map(([i, k, v]) => (
              <div key={k}>
                <span>
                  {i} {k}
                </span>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <div className="ansrow">
            <span>✅ Jawaban</span>
            <b>{r.correct} benar / 5</b>
          </div>
        </div>
        <button className="btn g" onClick={onNext}>
          {level < TOTAL_LEVELS ? "Lanjutkan" : "Kembali ke Peta"}
        </button>
        <button className="btn w" onClick={onAgain}>
          ↻ Ulangi
        </button>
      </div>
    </section>
  );
}
