/** Mode soal: 5 pertanyaan, petunjuk, nyawa (checkpoint), penjelasan jawaban */
import { useMemo, useState } from "react";
import { Shape } from "../components/Shape";
import { build } from "../data/questions";
import { SN, nm } from "../data/shapes";
import type { Screen } from "../types";

interface Props {
  level: number;
  go: (s: Screen) => void;
  onFinish: (correct: number, hints: number) => void;
}
const ICON_COLORS = ["#ffc93c", "#2f7fe0", "#4cc25a", "#ef5b6b"];

export function Quiz({ level, go, onFinish }: Props) {
  const qs = useMemo(() => build(level), [level]);
  const [qi, setQi] = useState(0);
  const [hp, setHp] = useState(3);
  const [ok, setOk] = useState(0);
  const [hints, setHints] = useState(0);
  const [tried, setTried] = useState(false);
  const [sel, setSel] = useState<number[]>([]);
  const [dead, setDead] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [msg, setMsg] = useState("");
  const q = qs[qi];
  const pics = q.m && q.o.every((o) => [...o].length <= 2); // soal klasifikasi bergambar

  function judge(s: number[]) {
    const right = s.length === q.a.length && q.a.every((i) => s.includes(i));
    if (right) {
      if (!tried) setOk((o) => o + 1);
      setSolved(true);
      setSel([]);
      setMsg((tried ? "Benar! " : "Jawaban benar! Hebat. ") + q.w);
      return;
    }
    setTried(true);
    let m = "Belum tepat. " + q.w + " Coba lagi!";
    if (hp - 1 <= 0) {
      setHp(3);
      m = "Nyawa habis, kamu kembali ke checkpoint soal ini. " + q.w;
    } else setHp(hp - 1);
    if (!q.m) setDead((d) => [...d, ...s]);
    setSel([]);
    setMsg(m);
  }
  function hint() {
    setHints((h) => h + 1);
    const wrong = q.o.map((_, i) => i).filter((i) => !q.a.includes(i) && !dead.includes(i));
    if (!q.m && wrong.length) {
      setDead((d) => [...d, wrong[0]]);
      setMsg("Petunjuk: satu jawaban salah sudah dicoret.");
    } else setMsg("Petunjuk: " + q.w);
  }
  function next() {
    if (qi === 4) return onFinish(ok, hints);
    setQi(qi + 1);
    setTried(false);
    setSel([]);
    setDead([]);
    setSolved(false);
    setMsg("");
  }
  const toggle = (i: number) => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  const shapeOf = (t: string) => SN.find((s) => nm(s).toLowerCase() === t.toLowerCase());

  return (
    <section className="scr on">
      <div className="qhead">
        <button className="pausebtn" onClick={() => go("map")} aria-label="Keluar">
          ❚❚
        </button>
        <div className="qprog">
          <i style={{ width: `${(qi + 1) * 20}%` }} />
        </div>
        <b className="qnum">{qi + 1}/5</b>
      </div>
      <div className="hearts">
        {"❤️".repeat(hp)}
        {"🤍".repeat(3 - hp)}
      </div>
      <div className="body">
        <div className="qcard">
          <b className="qtext">{q.q}</b>
          {q.vis && <div className="qpic big" dangerouslySetInnerHTML={{ __html: q.vis }} />}
        </div>
        {pics ? (
          <div className="piclist">
            {q.o.map((t, i) => {
              const cls = solved && q.a.includes(i) ? " ok" : sel.includes(i) ? " sel" : "";
              return (
                <button
                  key={i}
                  className={`pic${cls}`}
                  disabled={solved}
                  onClick={() => toggle(i)}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {t}
                  <span className="cb">{(cls && "✔") || ""}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            {q.o.map((t, i) => {
              const cls =
                solved && q.a.includes(i) ? " ok" : dead.includes(i) ? " no" : sel.includes(i) ? " sel" : "";
              const sh = shapeOf(t);
              return (
                <button
                  key={i}
                  className={`opt o${i % 4}${cls}`}
                  disabled={solved || dead.includes(i)}
                  style={{
                    animationDelay: `${i * 70}ms`,
                    ...(dead.includes(i) && !tried ? { opacity: 0.3 } : {}),
                  }}
                  onClick={() => (q.m ? toggle(i) : judge([i]))}
                >
                  <span className="oi">
                    {sh ? <Shape name={sh} color={ICON_COLORS[i % 4]} size={28} /> : "ABCD"[i]}
                  </span>
                  <span className="ot">{t}</span>
                  <span className="ck">✔</span>
                </button>
              );
            })}
          </div>
        )}
        <div className="msg">{msg || (q.m ? "Pilih semua jawaban yang benar, lalu tekan Periksa." : "")}</div>
        {!solved && (
          <button className="btn w small" onClick={hint}>
            💡 Petunjuk (hilang bonus +50)
          </button>
        )}
        {!solved && q.m && (
          <button className="btn" style={{ marginTop: 10 }} onClick={() => judge(sel)}>
            Periksa
          </button>
        )}
        {solved && (
          <button className="btn g" style={{ marginTop: 10 }} onClick={next}>
            {qi === 4 ? "Lihat Hasil" : "Lanjut"}
          </button>
        )}
      </div>
    </section>
  );
}
