/** State global pemain, disimpan otomatis di localStorage */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { MIN_STARS_TO_UNLOCK, PLAYABLE_LEVELS, TOTAL_LEVELS, starsFor } from "../data/content";
import type { LevelResult, QuizOutcome, Save } from "../types";

const KEY = "pbd_react_v2"; // v2: sistem 15 level, level terbuka hanya dari bintang >= 2
const today = () => new Date().toDateString();
const fresh = (): Save => ({
  name: "Rizki",
  star: 120,
  coin: 0,
  gem: 45,
  xp: 0,
  done: {},
  col: [],
  day: today(),
  daily: 0,
  perf: 0,
});

/** Bersihkan progres: hanya level 1..15 dengan bintang 1..3 yang dianggap valid */
function cleanDone(raw: unknown): Record<number, number> {
  const out: Record<number, number> = {};
  if (raw && typeof raw === "object") {
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      const n = Number(k),
        st = Number(v);
      if (Number.isInteger(n) && n >= 1 && n <= TOTAL_LEVELS && Number.isFinite(st) && st >= 1)
        out[n] = Math.min(3, Math.floor(st));
    }
  }
  return out;
}

function load(): Save {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || "{}");
    const s: Save = { ...fresh(), ...stored, done: cleanDone(stored?.done) };
    if (!Array.isArray(s.col)) s.col = [];
    if (s.day !== today()) {
      s.day = today();
      s.daily = 0;
    }
    return s;
  } catch {
    return fresh();
  }
}

interface Ctx {
  save: Save;
  level: number;
  /** Level terbuka: Level 1 selalu; level lain hanya jika level sebelumnya >= 2 bintang */
  isOpen: (n: number) => boolean;
  /** Level sudah tersedia untuk dimainkan (Level 4-15 belum) */
  isAvailable: (n: number) => boolean;
  collect: (ci: number) => void;
  finish: (lv: number, outcome: QuizOutcome, coins: number) => LevelResult;
  setName: (n: string) => void;
  reset: () => void;
}
const GameCtx = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<Save>(load);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(save));
    } catch {
      /* abaikan */
    }
  }, [save]);

  const collect = useCallback(
    (ci: number) => setSave((s) => (s.col.includes(ci) ? s : { ...s, col: [...s.col, ci] })),
    [],
  );
  const finish: Ctx["finish"] = (lv, { correct, wrong, answered, lives }, run) => {
    const stars = starsFor(correct);
    const coin = run + stars * 10;
    setSave((s) => {
      const before = s.done[lv] || 0;
      const best = Math.max(before, stars); // bintang tidak pernah berkurang
      return {
        ...s,
        star: s.star + Math.max(0, stars - before),
        coin: s.coin + coin,
        xp: s.xp + (stars > 0 ? 100 : 20),
        // level hanya dicatat selesai bila minimal 1 bintang; level lain tidak tersentuh
        done: stars > 0 ? { ...s.done, [lv]: best } : s.done,
        daily: correct === 5 ? s.daily + 1 : s.daily,
        perf: correct === 5 ? s.perf + 1 : s.perf,
      };
    });
    
    return { stars, correct, wrong, answered, lives, coin, gameOver: answered < 5 };
  };
  const value: Ctx = {
    save,
    level: 1 + Math.floor(save.xp / 300),
    isOpen: (n) =>
      n >= 1 && n <= PLAYABLE_LEVELS && (n === 1 || (save.done[n - 1] || 0) >= MIN_STARS_TO_UNLOCK),
    isAvailable: (n) => n >= 1 && n <= PLAYABLE_LEVELS,
    collect,
    finish,
    setName: (name) => setSave((s) => ({ ...s, name: name.trim() || "Rizki" })),
    reset: () => {
      localStorage.removeItem(KEY);
      setSave(fresh());
    },
  };
  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
}

export function useGame() {
  const c = useContext(GameCtx);
  if (!c) throw new Error("useGame harus di dalam GameProvider");
  return c;
}
