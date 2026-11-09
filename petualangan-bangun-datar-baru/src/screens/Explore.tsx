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
  ci: number; // indeks koleksi bentuk yang didapat
  got: boolean;
}
interface Props {
  level: number;
  go: (s: Screen) => void;
  onDone: (coins: number) => void;
}

/* ===== Fisika & tata letak sederhana (satuan px) ===== */
const HERO = 70; // lebar karakter
const GROUND = 90; // tinggi tanah dari dasar panggung
const SPEED = 230; // px/detik
const JUMP_V = 720; // kecepatan awal lompat
const GRAVITY = 2000;
const ITEM = 42; // ukuran bentuk
const ITEM_Y = 92; // tinggi bentuk dari tanah: harus melompat untuk meraihnya
const ROCK_W = 36;
const ROCK_H = 34;
const ITEM_FR = [0.3, 0.58, 0.8]; // posisi x bentuk (pecahan lebar panggung)
const ROCK_FR = [0.2, 0.45, 0.7]; // posisi x batu

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
  const heroEl = useRef<HTMLDivElement>(null);
  const sim = useRef({ x: 10, y: 0, vy: 0, dir: 1, left: false, right: false, jump: false, w: 380, bump: 0 });
  const gotRef = useRef<boolean[]>([false, false, false]);
  const ciRef = useRef<number[]>([0, 1, 2]);
  const [w, setW] = useState(380);
  const [items, setItems] = useState<Item[]>([]);
  const [msg, setMsg] = useState("Tekan ← → untuk berjalan, ↑ untuk melompat dan mengambil bentuk.");
  const got = items.filter((i) => i.got).length;
  const coins = got * 4;
  const k = Math.floor((level - 1) / 3);
  // urutan bentuk diputar per level supaya tiap level terasa sedikit berbeda, mekanismenya tetap sama
  const order = [0, 1, 2].map((i) => (i + level - 1) % 3);

  // siapkan 3 bentuk (tepat 3) dan ukur lebar panggung
  useEffect(() => {
    const free = shuf([...Array(24).keys()].filter((i) => !save.col.includes(i)));
    ciRef.current = [0, 1, 2].map((i) => free[i] ?? i);
    setItems(ciRef.current.map((ci) => ({ ci, got: false })));
    gotRef.current = [false, false, false];
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth || 380;
      sim.current.w = width;
      setW(width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pindah ke soal otomatis setelah ketiga bentuk terkumpul (tidak ada tombol lewati)
  useEffect(() => {
    if (items.length === 3 && got === 3) {
      setMsg("Hebat! Ketiga bentuk sudah terkumpul. Menuju soal...");
      const t = setTimeout(() => onDone(coins), 1000);
      return () => clearTimeout(t);
    }
  }, [got]); // eslint-disable-line react-hooks/exhaustive-deps

  // loop permainan: gerak, lompat, tabrakan batu, ambil bentuk
  useEffect(() => {
    let raf = 0,
      last = performance.now();
    const step = (now: number) => {
      const s = sim.current;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const maxX = s.w - HERO;
      const rocks = ROCK_FR.map((f) => f * s.w);

      // gerak horizontal
      const dx = ((s.right ? 1 : 0) - (s.left ? 1 : 0)) * SPEED * dt;
      if (dx) s.dir = dx > 0 ? 1 : -1;
      const prevX = s.x;
      s.x = Math.max(0, Math.min(maxX, s.x + dx));
      const overlapRock = (rx: number) => s.x + 56 > rx && s.x + 14 < rx + ROCK_W;
      for (const rx of rocks) {
        if (overlapRock(rx) && s.y < ROCK_H - 6) {
          s.x = Math.max(0, prevX + 56 <= rx + 1 ? rx - 56 : rx + ROCK_W - 14); // batu menghalangi: harus dilompati
          if (now - s.bump > 1500) {
            s.bump = now;
            setMsg("Awas batu! Tekan ↑ untuk melompatinya.");
          }
        }
      }

      // lompat & gravitasi (bisa mendarat di atas batu)
      const floor = rocks.some(overlapRock) ? ROCK_H : 0;
      const onFloor = s.y <= floor + 0.5 && s.vy <= 0;
      if (s.jump && onFloor) s.vy = JUMP_V;
      s.vy -= GRAVITY * dt;
      s.y += s.vy * dt;
      const floor2 = rocks.some(overlapRock) ? ROCK_H : 0;
      if (s.y <= floor2 && s.vy <= 0) {
        s.y = floor2;
        s.vy = 0;
      }

      // ambil bentuk jika karakter bersentuhan dengan bentuk
      ITEM_FR.forEach((f, i) => {
        if (gotRef.current[i]) return;
        const ix = Math.min(f * s.w, s.w - ITEM - 6);
        const hit = s.x + 12 < ix + ITEM && s.x + 58 > ix && s.y + 68 > ITEM_Y && s.y < ITEM_Y + ITEM;
        if (hit) {
          gotRef.current[i] = true;
          collect(ciRef.current[i]);
          setItems((arr) => arr.map((x, j) => (j === i ? { ...x, got: true } : x)));
          setMsg("Bagus! Satu bentuk berhasil dikumpulkan.");
        }
      });

      if (heroEl.current)
        heroEl.current.style.transform = `translate3d(${s.x}px, ${-s.y}px, 0) scaleX(${s.dir})`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keyboard (tahan tombol untuk berjalan)
  useEffect(() => {
    const set = (e: KeyboardEvent, v: boolean) => {
      const s = sim.current;
      if (e.key === "ArrowLeft" || e.key === "a") s.left = v;
      else if (e.key === "ArrowRight" || e.key === "d") s.right = v;
      else if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") s.jump = v;
      else return;
      e.preventDefault();
    };
    const down = (e: KeyboardEvent) => set(e, true);
    const up = (e: KeyboardEvent) => set(e, false);
    const clear = () => Object.assign(sim.current, { left: false, right: false, jump: false });
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
    };
  }, []);

  // tombol layar (sentuh/mouse): tahan untuk bergerak
  const hold = (key: "left" | "right" | "jump") => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      sim.current[key] = true;
    },
    onPointerUp: () => (sim.current[key] = false),
    onPointerCancel: () => (sim.current[key] = false),
    onLostPointerCapture: () => (sim.current[key] = false),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  return (
    <section className="scr on">
      <div className="exhead">
        <button className="pausebtn" onClick={() => go("detail")} aria-label="Keluar ke detail level">
          ❚❚
        </button>
        <span className="gp">
          🪙 <b>{coins}</b>
        </span>
        <span className="gp" aria-label={`${got} dari 3 bentuk`}>
          {[0, 1, 2].map((i) => (
            <Star key={i} on={i < got} color="blue" size={22} />
          ))}
        </span>
      </div>
      <div className="card collectcard">
        <b>Kumpulkan 3 bentuk!</b>
        <div className="crow">
          {order.map((o, i) => (
            <span key={o} className={items[i]?.got ? "got" : ""}>
              <Shape name={TARGETS[o].s} color={TARGETS[o].c} size={44} />
            </span>
          ))}
          <em aria-live="polite">{got}/3</em>
        </div>
        <small>{msg}</small>
      </div>
      <div className="stage" ref={stage} style={{ background: `linear-gradient(${SKY[k]})` }}>
        <Backdrop />
        <div className="gnd" />
        <div className="pl" ref={heroEl} style={{ left: 0, bottom: GROUND, transition: "none", willChange: "transform" }}>
          <Hero size={HERO} />
        </div>
        {order.map((o, i) => (
          <div
            key={o}
            className={`col${items[i]?.got ? " got" : ""}`}
            style={{ left: Math.min(ITEM_FR[i] * w, w - ITEM - 6), bottom: GROUND + ITEM_Y }}
          >
            <Shape name={TARGETS[o].s} color={TARGETS[o].c} size={ITEM} />
          </div>
        ))}
        {ROCK_FR.map((f, i) => (
          <div key={i} className="ob" style={{ left: f * w, bottom: GROUND - 4 }}>
            🪨
          </div>
        ))}
        <div className="ctrl">
          <div className="ctrlpad">
            <button {...hold("left")} aria-label="Kiri">
              <Arrow d="M15 5l-7 7 7 7M8 12h12" />
            </button>
            <button {...hold("right")} aria-label="Kanan">
              <Arrow d="M9 5l7 7-7 7M16 12H4" />
            </button>
          </div>
          <button {...hold("jump")} aria-label="Lompat">
            <Arrow d="M5 15l7-7 7 7M12 8v12" />
          </button>
        </div>
      </div>
    </section>
  );
}
