/** Mode eksplorasi: gerak, lompat, kumpulkan 3 bentuk, hindari batu */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Hero } from "../components/Hero";
import { Shape } from "../components/Shape";
import { Star } from "../components/Star";
import { SKY } from "../data/content";
import { shuf } from "../lib/random";
import { useGame } from "../store/GameContext";
import type { Screen } from "../types";

const TARGETS = [
  { s: "segitiga", c: "#ffc93c" },
  { s: "persegi", c: "#2f7fe0" },
  { s: "lingkaran", c: "#ef5b6b" },
];
interface Item {
  x: number;
  ci: number;
  got: boolean;
}
interface Props {
  level: number;
  go: (s: Screen) => void;
  onDone: (got: number, coins: number) => void;
}

const Plat = ({ x, y, w, flag }: { x: number; y: number; w: number; flag?: boolean }) => (
  <g transform={`translate(${x} ${y})`}>
    <path
      d={`M0 10C${w * 0.1} ${w * 0.5} ${w * 0.4} ${w * 0.55} ${w / 2} ${w * 0.62}C${w * 0.6} ${w * 0.55} ${w * 0.9} ${w * 0.5} ${w} 10Z`}
      fill="#8a5a33"
    />
    <ellipse cx={w / 2} cy={10} rx={w / 2} ry={16} fill="#5fbf4a" stroke="#3e8a34" strokeWidth={3} />
    <circle cx={w * 0.25} cy={-4} r={14} fill="#2f9e44" />
    <circle cx={w * 0.7} cy={-6} r={11} fill="#3aae4f" />
    {flag && (
      <g>
        <line x1={w * 0.5} y1={-4} x2={w * 0.5} y2={-44} stroke="#7a4a22" strokeWidth={3} />
        <polygon points={`${w * 0.5},-44 ${w * 0.5 + 26},-36 ${w * 0.5},-28`} fill="#e8505b" />
      </g>
    )}
  </g>
);

function Backdrop(): ReactNode {
  return (
    <svg className="exbg" viewBox="0 0 430 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="#fff" opacity={0.9}>
        <ellipse cx={90} cy={60} rx={60} ry={20} />
        <ellipse cx={330} cy={110} rx={70} ry={22} />
        <ellipse cx={240} cy={40} rx={40} ry={14} />
      </g>
      <Plat x={-20} y={170} w={150} />
      <Plat x={300} y={150} w={160} flag />
      <Plat x={170} y={300} w={110} />
      <rect x={196} y={330} width={30} height={150} rx={12} fill="#bfeaff" opacity={0.9} />
      <g fill="#fff" opacity={0.7}>
        <rect x={203} y={340} width={4} height={120} rx={2} />
        <rect x={214} y={350} width={4} height={110} rx={2} />
      </g>
    </svg>
  );
}
const Arrow = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="34"
    height="34"
    fill="none"
    stroke="#fff"
    strokeWidth="3.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

export function Explore({ level, go, onDone }: Props) {
  const { save, collect } = useGame();
  const stage = useRef<HTMLDivElement>(null);
  const live = useRef({ px: 10, air: false });
  const [px, setPx] = useState(10);
  const [air, setAir] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [obs, setObs] = useState<number[]>([]);
  const [msg, setMsg] = useState("Geser dengan ← →, lompat dengan ↑ untuk mengambil bentuk.");
  const k = Math.floor((level - 1) / 6);
  const got = items.filter((i) => i.got).length;
  const coins = got * 4;

  useEffect(() => {
    const w = stage.current?.clientWidth || 380,
      g = (w - 200) / 2;
    const free = shuf([...Array(24).keys()].filter((i) => !save.col.includes(i)));
    setItems([0, 1, 2].map((i) => ({ x: 80 + i * g, ci: free[i] ?? i, got: false })));
    setObs([80 + g / 2, 80 + g * 1.5]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (items.length && got === 3) {
      const t = setTimeout(() => onDone(3, coins), 800);
      return () => clearTimeout(t);
    }
  }, [got]); // eslint-disable-line react-hooks/exhaustive-deps

  function check(x: number) {
    if (live.current.air)
      setItems((arr) =>
        arr.map((it) => {
          if (!it.got && Math.abs(x - it.x + 10) < 50) {
            collect(it.ci);
            return { ...it, got: true };
          }
          return it;
        }),
      );
    else {
      const hit = obs.find((o) => Math.abs(x - o) < 34);
      if (hit !== undefined) {
        const nx = Math.max(0, hit - 60);
        live.current.px = nx;
        setPx(nx);
        setMsg("Awas batu! Tekan ↑ untuk melompat.");
      }
    }
  }
  function move(dx: number) {
    const w = (stage.current?.clientWidth || 380) - 70;
    const x = Math.max(0, Math.min(w, live.current.px + dx));
    live.current.px = x;
    setPx(x);
    check(x);
  }
  function jump() {
    live.current.air = true;
    setAir(true);
    check(live.current.px);
    setTimeout(() => {
      live.current.air = false;
      setAir(false);
    }, 450);
  }
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move(-40);
      if (e.key === "ArrowRight") move(40);
      if (e.key === "ArrowUp") jump();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <section className="scr on">
      <div className="exhead">
        <button className="pausebtn" onClick={() => go("detail")} aria-label="Jeda">
          ❚❚
        </button>
        <span className="gp">
          🪙 <b>{coins}</b>
        </span>
        <span className="gp">
          {[0, 1, 2].map((i) => (
            <Star key={i} on={i < got} color="blue" size={22} />
          ))}
        </span>
      </div>
      <div className="card collectcard">
        <b>Kumpulkan semua bentuk!</b>
        <div className="crow">
          {TARGETS.map((t, i) => (
            <span key={t.s} className={items[i]?.got ? "got" : ""}>
              <Shape name={t.s} color={t.c} size={44} />
            </span>
          ))}
          <em>{got}/3</em>
        </div>
        <small>{msg}</small>
      </div>
      <div className="stage" ref={stage} style={{ background: `linear-gradient(${SKY[k]})` }}>
        <Backdrop />
        <div className="gnd" />
        <div className="pl" style={{ left: px, bottom: air ? 170 : 90 }}>
          <Hero size={70} />
        </div>
        {items.map((it, i) => (
          <div key={i} className={`col${it.got ? " got" : ""}`} style={{ left: it.x }}>
            <Shape name={TARGETS[i].s} color={TARGETS[i].c} size={42} />
          </div>
        ))}
        {obs.map((x, i) => (
          <div key={i} className="ob" style={{ left: x }}>
            🪨
          </div>
        ))}
        <div className="ctrl">
          <button onClick={() => move(-40)} aria-label="Kiri">
            <Arrow d="M15 5l-7 7 7 7M8 12h12" />
          </button>
          <button onClick={() => move(40)} aria-label="Kanan">
            <Arrow d="M9 5l7 7-7 7M16 12H4" />
          </button>
          <button onClick={jump} aria-label="Lompat">
            <Arrow d="M5 15l7-7 7 7M12 8v12" />
          </button>
        </div>
        <button className="skip" onClick={() => onDone(got, coins)}>
          Langsung ke soal ›
        </button>
      </div>
    </section>
  );
}
