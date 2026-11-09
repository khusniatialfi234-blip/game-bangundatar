/**
 * Peta Petualangan (Peta Dunia).
 * Latar = gambar referensi dosen; simpul level, kartu misi, dan koleksi memakai aset dosen
 * dengan angka/progres dinamis di atasnya.
 */
import { useState } from "react";
import { PLAYABLE_LEVELS, TOTAL_LEVELS } from "../data/content";
import { TopBar } from "../components/TopBar";
import { useGame } from "../store/GameContext";
import type { Screen } from "../types";
import bg from "../assets/peta-bg.webp";
import nodeCurrent from "../assets/ui/node_current.png";
import nodeOpen from "../assets/ui/node_open.png";
import nodeLocked from "../assets/ui/node_locked.png";
import missionImg from "../assets/ui/mission_card.png";
import collectionImg from "../assets/ui/collection_card.png";

type Pt = [number, number];
const W = 941,
  H = 1372,
  Y0 = 146; // gambar dipotong mulai y = 146

/** Posisi 15 level pada gambar asli: 3 level per pulau (5 pulau) */
const NODES: Pt[] = [
  // Pulau 1
  [150, 455],
  [285, 455],
  [396, 472],
  // Pulau 2
  [619, 560],
  [695, 598],
  [790, 598],
  // Pulau 3
  [167, 890],
  [285, 885],
  [395, 905],
  // Pulau 4
  [629, 1020],
  [731, 1040],
  [833, 1030],
  // Pulau 5
  [386, 1330],
  [472, 1335],
  [562, 1330],
];
const FONT = "'Baloo 2', system-ui, sans-serif";
const px = (x: number) => `${(x / W) * 100}%`;
const py = (y: number) => `${((y - Y0) / H) * 100}%`;
const box = (x: number, y: number, w: number, h: number) => ({
  left: px(x),
  top: py(y),
  width: px(w),
  height: `${(h / H) * 100}%`,
});

interface Props {
  go: (s: Screen) => void;
  onOpen: (n: number) => void;
}

export function MapScreen({ go, onOpen }: Props) {
  const { save, isOpen, isAvailable } = useGame();
  const [toast, setToast] = useState("");
  // level yang sedang dikerjakan: level terbuka pertama yang belum mencapai 2 bintang
  const current =
    Array.from({ length: PLAYABLE_LEVELS }, (_, i) => i + 1).find((n) => isOpen(n) && (save.done[n] || 0) < 2) ?? 0;
  const tap = (n: number) => {
    if (isOpen(n)) return onOpen(n);
    setToast(
      !isAvailable(n)
        ? `Level ${n} belum tersedia. Segera hadir!`
        : `Level ${n} terkunci. Dapatkan minimal 2 bintang di Level ${n - 1}.`,
    );
    window.setTimeout(() => setToast(""), 2200);
  };
  const daily = Math.min(save.daily, 3);

  return (
    <section className="scr on">
      <TopBar go={go} />
      <div className="body">
        <div className="mapwrap">
          <img className="mapimg" src={bg} alt="Peta pulau petualangan" draggable={false} />
          <svg className="mapsvg" viewBox={`0 ${Y0} ${W} ${H}`}>
            {NODES.slice(0, TOTAL_LEVELS).map(([x, y], i) => {
              const n = i + 1,
                open = isOpen(n),
                done = !!save.done[n],
                stars = save.done[n] || 0;
              const src = !open ? nodeLocked : done ? nodeOpen : nodeCurrent;
              const [cx, cy] = !open ? [45, 44] : done ? [46, 40] : [46, 42];
              const w = !open ? 89 : 91,
                h = !open ? 76 : done ? 75 : 75;
              return (
                <g
                  key={n}
                  className="mapnode"
                  onClick={() => tap(n)}
                  style={{ opacity: isAvailable(n) ? 1 : 0.85 }}
                  role="button"
                  aria-label={`Level ${n}${open ? "" : " terkunci"}`}
                  fontFamily={FONT}
                  fontWeight={800}
                  textAnchor="middle"
                >
                  {n === current && (
                    <circle className="ping" cx={x} cy={y} r={34} fill="none" stroke="#fff" strokeWidth={6} />
                  )}
                  <image href={src} x={x - cx} y={y - cy} width={w} height={h} />
                  <text
                    x={x + (open ? 0 : 2)}
                    y={y + (open ? 12 : 21)}
                    fontSize={open ? 34 : 27}
                    fill="#fff"
                    stroke="#0b2a63"
                    strokeWidth={4}
                    paintOrder="stroke"
                  >
                    {n}
                  </text>
                  {stars > 0 && (
                    <text x={x} y={y - 40} fontSize={26}>
                      {"⭐".repeat(stars)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {toast && (
            <div className="maptoast" role="status">
              {toast}
            </div>
          )}
          <button
            className="maphit"
            style={box(32, 164, 70, 70)}
            onClick={() => go("home")}
            aria-label="Kembali"
          />

          <div className="plate mission" style={box(695, 150, 218, 107)}>
            <img src={missionImg} alt="" />
            <span className="m-bar">
              <i style={{ width: `${(daily / 3) * 100}%` }} />
            </span>
            <span className="m-cnt">{daily}/3</span>
          </div>
          <button
            className="plate collect"
            style={box(25, 1356, 254, 121)}
            onClick={() => go("koleksi")}
            aria-label="Koleksi Bentuk"
          >
            <img src={collectionImg} alt="" />
            <span className="k-bar">
              <i style={{ width: `${(save.col.length / 24) * 100}%` }} />
              <b>{save.col.length}/24</b>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
