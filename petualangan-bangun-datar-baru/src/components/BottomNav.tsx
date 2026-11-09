/** Navigasi bawah memakai ikon aset dosen */
import type { Screen } from "../types";
import home from "../assets/ui/nav_home.png";
import mapActive from "../assets/ui/nav_map_active.png";
import achievements from "../assets/ui/nav_achievements.png";
import materials from "../assets/ui/nav_materials.png";
import profile from "../assets/ui/nav_profile.png";

const TABS: [Screen, string, string][] = [
  ["home", home, "Beranda"],
  ["map", mapActive, "Peta"],
  ["prestasi", achievements, "Prestasi"],
  ["materi", materials, "Materi"],
  ["profil", profile, "Profil"],
];

/** Ikon Peta versi tidak aktif (aset dosen hanya punya versi aktif) */
const MapOutline = () => (
  <span className="mapoff">
    <svg
      viewBox="0 0 32 32"
      width="34"
      height="34"
      fill="none"
      stroke="#3f5f93"
      strokeWidth="2.4"
      strokeLinejoin="round"
    >
      <path d="M4 8l8-3 8 3 8-3v19l-8 3-8-3-8 3zM12 5v19M20 8v19" />
    </svg>
    <b>Peta</b>
  </span>
);

export function BottomNav({ current, go }: { current: Screen; go: (s: Screen) => void }) {
  return (
    <nav className="nav">
      {TABS.map(([id, src, label]) => {
        const on = current === id || (id === "map" && current === "koleksi");
        return (
          <button key={id} className={on ? "on" : ""} onClick={() => go(id)} aria-label={label}>
            {id === "map" && !on ? <MapOutline /> : <img src={src} alt={label} />}
          </button>
        );
      })}
    </nav>
  );
}
