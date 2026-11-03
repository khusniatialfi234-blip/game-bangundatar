import { Foe } from "../components/Foe";
import { Hero } from "../components/Hero";
import { Shape } from "../components/Shape";
import { TopBar } from "../components/TopBar";
import { useGame } from "../store/GameContext";
import type { Screen } from "../types";

export function Home({ go }: { go: (s: Screen) => void }) {
  const { save } = useGame();
  const d = Math.min(save.daily, 3);
  return (
    <section className="scr on">
      <TopBar go={go} />
      <div className="homebody">
        <div className="card misi">
          📋 <b>Misi Hari Ini</b>
          <br />
          Selesaikan 3 level dengan nilai sempurna
          <div className="bar" style={{ marginTop: 4 }}>
            <i style={{ width: `${(d / 3) * 100}%` }} />
          </div>
          <small>{d}/3</small>
        </div>
        <div className="logo">
          <div className="emblem">
            <span className="e1">
              <Shape name="segitiga" size={64} />
            </span>
            <span className="e2">
              <Shape name="lingkaran" color="#ef5b6b" size={64} />
            </span>
            <span className="e3">
              <Shape name="persegi" color="#4aa3f0" size={58} />
            </span>
          </div>
          <b>Petualangan</b>
          <b>Bangun Datar</b>
          <span className="tag">Jelajahi Dunia, Temukan Bentuknya!</span>
        </div>
        <div style={{ padding: "0 18px" }}>
          <button className="btn pulse" onClick={() => go("map")}>
            ▶ Mulai Petualangan
          </button>
        </div>
        <div className="homestage">
          <button className="sign" onClick={() => go("materi")}>
            Kenali
            <br />
            Bangun Datar ›
          </button>
          <div className="walker">
            <Hero size={170} />
          </div>
          <div className="foes">
            <Foe kind="circle" color="#ef5b6b" />
            <Foe kind="square" color="#4aa3f0" />
            <Foe kind="triangle" color="#9a62dc" />
          </div>
        </div>
      </div>
    </section>
  );
}
