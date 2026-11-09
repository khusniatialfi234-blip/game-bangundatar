import { Shape } from "../components/Shape";
import { TopBar } from "../components/TopBar";
import { SN, nm } from "../data/shapes";
import { useGame } from "../store/GameContext";
import type { Screen } from "../types";

export function Collection({ go }: { go: (s: Screen) => void }) {
  const { save } = useGame();
  return (
    <section className="scr on">
      <TopBar back="map" go={go} />
      <div className="body">
        <div className="ttl">Koleksi Bentuk {save.col.length}/24</div>
        <div className="grid">
          {Array.from({ length: 24 }, (_, i) =>
            save.col.includes(i) ? (
              <div key={i} className="cell">
                <Shape name={SN[i % 12]} color={i < 12 ? "#4aa3f0" : "#ffc93c"} size={54} />
                <small>
                  {nm(SN[i % 12])}
                  {i < 12 ? "" : " emas"}
                </small>
              </div>
            ) : (
              <div key={i} className="cell locked">
                <div style={{ fontSize: 38 }}>❔</div>
                <small>Belum ada</small>
              </div>
            ),
          )}
        </div>
        <p className="card" style={{ fontSize: 14, marginTop: 12 }}>
          Melompat ke bentuk saat Eksplorasi untuk menambah koleksi.
        </p>
      </div>
    </section>
  );
}
