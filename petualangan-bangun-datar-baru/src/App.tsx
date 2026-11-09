/** Komponen utama: mengatur layar yang tampil dan alur permainan */
import { useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { Scenery } from "./components/Scenery";
import { Achievements } from "./screens/Achievements";
import { Collection } from "./screens/Collection";
import { Explore } from "./screens/Explore";
import { Home } from "./screens/Home";
import { LevelDetail } from "./screens/LevelDetail";
import { MapScreen } from "./screens/MapScreen";
import { Materials } from "./screens/Materials";
import { Profile } from "./screens/Profile";
import { Quiz } from "./screens/Quiz";
import { Result } from "./screens/Result";
import { PLAYABLE_LEVELS } from "./data/content";
import { useGame } from "./store/GameContext";
import type { LevelResult, QuizOutcome, Screen } from "./types";

const TABS: Screen[] = ["home", "map", "prestasi", "materi", "profil", "koleksi"];

export default function App() {
  const { finish, isOpen } = useGame();
  const [screen, setScreen] = useState<Screen>("home");
  const [level, setLevel] = useState(1);
  const [run, setRun] = useState({ got: 0, coins: 0, id: 0 });
  const [result, setResult] = useState<LevelResult | null>(null);

  const openLevel = (n: number) => {
    if (!isOpen(n)) return; // level terkunci / belum tersedia tidak bisa dibuka
    setLevel(n);
    setScreen("detail");
  };
  // dipanggil Explore hanya setelah ketiga bentuk terkumpul
  const done = (coins: number) => {
    setRun((r) => ({ got: 3, coins, id: r.id + 1 }));
    setScreen("quiz");
  };
  const finishQuiz = (o: QuizOutcome) => {
    setResult(finish(level, o, run.coins));
    setScreen("result");
  };

  return (
    <div id="app">
      {!["explore", "result", "map"].includes(screen) && <Scenery />}
      {screen === "home" && <Home go={setScreen} />}
      {screen === "map" && <MapScreen go={setScreen} onOpen={openLevel} />}
      {screen === "koleksi" && <Collection go={setScreen} />}
      {screen === "detail" && (
        <LevelDetail level={level} go={setScreen} onStart={() => setScreen("explore")} />
      )}
      {screen === "explore" && <Explore key={level} level={level} go={setScreen} onDone={done} />}
      {screen === "quiz" && (
        <Quiz key={level + ":" + run.id} level={level} go={setScreen} onFinish={finishQuiz} />
      )}
      {screen === "result" && result && (
        <Result
          level={level}
          result={result}
          onNext={() => (level < PLAYABLE_LEVELS && isOpen(level + 1) ? openLevel(level + 1) : setScreen("map"))}
          onAgain={() => openLevel(level)}
          onMap={() => setScreen("map")}
        />
      )}
      {screen === "prestasi" && <Achievements go={setScreen} />}
      {screen === "materi" && <Materials go={setScreen} />}
      {screen === "profil" && <Profile go={setScreen} />}
      {TABS.includes(screen) && <BottomNav current={screen} go={setScreen} />}
    </div>
  );
}
