import { TopBar } from "../components/TopBar";
import { ACH } from "../data/content";
import { useGame } from "../store/GameContext";
import type { Screen } from "../types";

export function Achievements({ go }: { go: (s: Screen) => void }) {
  const { save } = useGame();
  return (
    <section className="scr on">
      <TopBar go={go} />
      <div className="body">
        <div className="ttl">Prestasi</div>
        {ACH.map((a) => {
          const v = Math.min(a.value(save), a.target),
            ok = v >= a.target;
          return (
            <div key={a.title} className={`card item ach${ok ? "" : " locked"}`}>
              <div className="em">{a.icon}</div>
              <div style={{ flex: 1 }}>
                <b>{a.title}</b> {ok && "✅"}
                <br />
                <small>{a.desc}</small>
                <div className="bar">
                  <i style={{ width: `${(v / a.target) * 100}%`, background: "var(--blue)" }} />
                </div>
                <small>
                  {v}/{a.target}
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
