import { useState } from "react";
import { TopBar } from "../components/TopBar";
import { useGame } from "../store/GameContext";
import type { Screen } from "../types";

export function Profile({ go }: { go: (s: Screen) => void }) {
  const { save, level, setName, reset } = useGame();
  const [sure, setSure] = useState(false);
  const rows: [string, string | number][] = [
    ["⭐ Bintang", save.star],
    ["💎 Permata", save.gem],
    ["🪙 Koin", save.coin],
    ["🔷 XP", save.xp],
    ["✅ Level selesai", `${Object.keys(save.done).length}/15`],
    ["🧩 Koleksi", `${save.col.length}/24`],
  ];
  return (
    <section className="scr on">
      <TopBar back="home" go={go} />
      <div className="body">
        <div className="ttl">Profil</div>
        <div className="card" style={{ textAlign: "center" }}>
          <div className="av" style={{ width: 80, height: 80, fontSize: 44, margin: "0 auto" }}>
            🧒
          </div>
          <input
            id="nameIn"
            defaultValue={save.name}
            maxLength={14}
            aria-label="Nama"
            onChange={(e) => setName(e.target.value)}
          />
          <div>Siswa · Level {level}</div>
          {rows.map(([k, v]) => (
            <div key={k} className="row">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <button
            className="btn w"
            style={{ marginTop: 12 }}
            onClick={() => (sure ? reset() : setSure(true))}
          >
            {sure ? "Yakin? Tekan sekali lagi" : "Hapus semua kemajuan"}
          </button>
        </div>
      </div>
    </section>
  );
}
