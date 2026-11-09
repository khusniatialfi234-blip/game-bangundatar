/** Hasil Level: bintang beranimasi, jumlah benar/salah, sisa nyawa, tombol ulangi / lanjut */
import { Confetti } from "../components/Confetti";
import { Hero } from "../components/Hero";
import { Star } from "../components/Star";
import { MIN_STARS_TO_UNLOCK, PLAYABLE_LEVELS } from "../data/content";
import { QUESTION_COUNT } from "../data/pulau1";
import type { LevelResult } from "../types";

interface Props {
  level: number;
  result: LevelResult;
  onNext: () => void;
  onAgain: () => void;
  onMap: () => void;
}

export function Result({ level, result: r, onNext, onAgain, onMap }: Props) {
  const passed = r.stars >= MIN_STARS_TO_UNLOCK;
  const isLastPlayable = level >= PLAYABLE_LEVELS;
  const title = r.gameOver ? "Nyawa Habis!" : passed ? "Level Selesai!" : "Ayo Coba Lagi!";
  const rows: [string, string, string | number][] = [
    ["✅", "Benar", r.correct],
    ["❌", "Salah", r.wrong],
    ["❤️", "Sisa nyawa", `${r.lives}/3`],
    ["🪙", "Koin", `+${r.coin}`],
  ];
  let note: string;
  if (passed) {
    note = isLastPlayable
      ? "Hebat! Pulau 1 selesai. Level berikutnya segera hadir."
      : `Hebat! Level ${level + 1} terbuka.`;
  } else {
    note = `Dapatkan minimal ${MIN_STARS_TO_UNLOCK} bintang untuk membuka level berikutnya. Ulangi level ini ya!`;
  }
  return (
    <section className="scr on resbg">
      {passed && <Confetti />}
      <div className="body" style={{ textAlign: "center" }}>
        <div className="bigstars" role="img" aria-label={`${r.stars} dari 3 bintang`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`starpop${i < r.stars ? " earned" : ""}`} style={{ animationDelay: `${0.25 + i * 0.45}s` }}>
              <Star on={i < r.stars} size={i === 1 ? 84 : 66} />
            </span>
          ))}
        </div>
        <div className="ribbon orange">{title}</div>
        <div className="hero floaty" style={{ margin: "-6px 0 0" }}>
          <Hero size={150} />
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
            <span>📝 Soal dijawab</span>
            <b>
              {r.answered} / {QUESTION_COUNT}
            </b>
          </div>
          <div className="ansrow starrow">
            <span>⭐ Bintang</span>
            <b>{r.stars} / 3</b>
          </div>
          <p className={`resnote${passed ? " ok" : ""}`}>{note}</p>
        </div>
        {passed && (
          <button className="btn g" onClick={onNext}>
            {isLastPlayable ? "Kembali ke Peta" : "Lanjutkan"}
          </button>
        )}
        <button className={passed ? "btn w" : "btn g"} onClick={onAgain}>
          ↻ Ulangi Level
        </button>
        {!passed && (
          <button className="btn w" onClick={onMap}>
            Kembali ke Peta
          </button>
        )}
      </div>
    </section>
  );
}
