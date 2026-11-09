/** Tahap 2: 5 soal pilihan ganda tetap, 3 nyawa, setiap soal hanya bisa dijawab sekali */
import { useRef, useState } from "react";
import { FIXED_QUESTIONS, MAX_LIVES, QUESTION_COUNT } from "../data/pulau1";
import type { QuizOutcome, Screen } from "../types";

interface Props {
  level: number;
  go: (s: Screen) => void;
  onFinish: (o: QuizOutcome) => void;
}

const LETTERS = "ABCD";

function Heart({ full }: { full: boolean }) {
  return (
    <svg viewBox="0 0 32 30" width={30} height={28} aria-hidden="true" className={full ? "heart" : "heart lost"}>
      <path
        d="M16 28C6 20 2 14.5 2 9.5A7.5 7.5 0 0 1 16 6a7.5 7.5 0 0 1 14 3.5C30 14.5 26 20 16 28Z"
        fill={full ? "#e8283c" : "#c9d3e6"}
        stroke={full ? "#a5121f" : "#9aa9c4"}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {full && <path d="M8 9.5A4 4 0 0 1 12 6.5" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" opacity={0.7} />}
    </svg>
  );
}

export function Quiz({ go, onFinish }: Props) {
  const [qi, setQi] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const locked = useRef(false); // satu soal hanya bisa dijawab satu kali (anti klik ganda)
  const q = FIXED_QUESTIONS[qi];
  const answered = picked !== null;
  const isRight = answered && picked === q.a;
  const outOfLives = lives <= 0;
  const last = qi === QUESTION_COUNT - 1;

  function answer(i: number) {
    if (locked.current || answered) return;
    locked.current = true;
    setPicked(i);
    if (i === q.a) setCorrect((c) => c + 1);
    else {
      setWrong((w) => w + 1);
      setLives((l) => Math.max(0, l - 1)); // salah = tepat 1 nyawa berkurang
    }
  }
  function next() {
    if (!answered) return;
    if (last || outOfLives) {
      onFinish({ correct, wrong, answered: qi + 1, lives });
      return;
    }
    setQi(qi + 1);
    setPicked(null);
    locked.current = false;
  }

  return (
    <section className="scr on">
      <div className="qhead">
        <button className="pausebtn" onClick={() => go("map")} aria-label="Keluar ke peta">
          ❚❚
        </button>
        <div className="qprog">
          <i style={{ width: `${((qi + (answered ? 1 : 0)) / QUESTION_COUNT) * 100}%` }} />
        </div>
        <b className="qnum">
          {qi + 1} dari {QUESTION_COUNT}
        </b>
      </div>
      <div className="hearts" aria-label={`Nyawa ${lives} dari ${MAX_LIVES}`}>
        {Array.from({ length: MAX_LIVES }, (_, i) => (
          <Heart key={i} full={i < lives} />
        ))}
      </div>
      <div className="body">
        <div className="qcard">
          <b className="qtext">{q.q}</b>
          <div className="qpic" dangerouslySetInnerHTML={{ __html: q.vis }} />
        </div>
        <div className="qopts">
          {q.o.map((t, i) => {
            let cls = "";
            if (answered) {
              if (i === q.a) cls = " ok";
              else if (i === picked) cls = " no";
              else cls = " dim";
            }
            return (
              <button
                key={i}
                className={`opt o${i % 4}${cls}`}
                disabled={answered}
                onClick={() => answer(i)}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="oi">{LETTERS[i]}</span>
                <span className="ot">{t}</span>
                <span className="ck">{i === q.a ? "✔" : "✖"}</span>
              </button>
            );
          })}
        </div>
        <div className={`msg${answered ? (isRight ? " good" : " bad") : ""}`} aria-live="polite">
          {answered &&
            (isRight
              ? `Jawaban benar! Hebat. ${q.w}`
              : `Jawaban salah. Jawaban yang benar: ${LETTERS[q.a]}. ${q.o[q.a]}. ${q.w}`)}
          {answered && outOfLives && !isRight && " Nyawa habis, permainan berakhir."}
          {answered && outOfLives && isRight && ""}
        </div>
        {answered && (
          <button className="btn g" style={{ marginTop: 10 }} onClick={next}>
            {last || outOfLives ? "Lihat Hasil" : "Lanjut"}
          </button>
        )}
      </div>
    </section>
  );
}
