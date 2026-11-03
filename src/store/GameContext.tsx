/** State global pemain, disimpan otomatis di localStorage */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { LevelResult, Save } from "../types";

const KEY = "pbd_react_v1";
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

function load(): Save {
  try {
    const s: Save = { ...fresh(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
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
  isOpen: (n: number) => boolean;
  collect: (ci: number) => void;
  finish: (lv: number, correct: number, hints: number, got: number, run: number) => LevelResult;
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
  const finish: Ctx["finish"] = (lv, correct, hints, got, run) => {
    const stars = correct >= 5 ? 3 : correct >= 3 ? 2 : 1;
    const bonus = hints ? 0 : 50;
    const score = correct * 100 + bonus + got * 10;
    const coin = run + stars * 10;
    setSave((s) => ({
      ...s,
      star: s.star + stars,
      coin: s.coin + coin,
      xp: s.xp + 100,
      done: { ...s.done, [lv]: Math.max(s.done[lv] || 0, stars) },
      daily: correct === 5 ? s.daily + 1 : s.daily,
      perf: correct === 5 ? s.perf + 1 : s.perf,
    }));
    return { stars, score, bonus, coin, correct };
  };
  const value: Ctx = {
    save,
    level: 1 + Math.floor(save.xp / 300),
    isOpen: (n) => n === 1 || !!save.done[n - 1],
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
