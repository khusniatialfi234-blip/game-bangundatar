/** Detail Level: tujuan, bintang, estimasi waktu, tombol Mulai */
import { Hero } from "../components/Hero";
import { Star } from "../components/Star";
import { GOAL, ISL, PL } from "../data/content";
import { useGame } from "../store/GameContext";
import type { Screen } from "../types";
import backImg from "../assets/ui/back_btn.png";

interface Props {
  level: number;
  go: (s: Screen) => void;
  onStart: () => void;
}

export function LevelDetail({ level, go, onStart }: Props) {
  const { save } = useGame();
  const k = Math.floor((level - 1) / 6),
    s = save.done[level] || 0;
  return (
    <section className="scr on">
      <div className="hdr">
        <button className="imgbtn" onClick={() => go("map")} aria-label="Kembali">
          <img src={backImg} alt="" />
        </button>
        <div className="cur">
          <span className="gp">
            ⭐ <b>{s ? 1 : 0}</b>
          </span>
          <span className="gp">
            🪙 <b>{save.coin}</b>
          </span>
        </div>
      </div>
      <div className="body detailbody">
        <div className="ribbon wood">Level {level}</div>
        <div className="ribbon blue">
          {PL[(level - 1) % 6]} {ISL[k][0]}
        </div>
        <div className="card goal">
          <b>Tujuan:</b>
          <br />
          {GOAL[k]}
          <div className="bstars">
            {[0, 1, 2].map((i) => (
              <Star key={i} on={i < s} color="blue" size={40} />
            ))}
          </div>
          <div className="chips">
            <span>⏱ 3–5 menit</span>
            <span>🎯 3 tantangan</span>
          </div>
        </div>
        <div className="detailhero floaty">
          <Hero size={190} />
        </div>
        <button className="btn" onClick={onStart}>
          Mulai
        </button>
      </div>
    </section>
  );
}
