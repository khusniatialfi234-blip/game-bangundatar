/** Bilah atas memakai aset dosen: kartu profil, bar mata uang, tombol kembali; teks dibuat dinamis */
import { useGame } from "../store/GameContext";
import type { Screen } from "../types";
import profileImg from "../assets/ui/profile_card.png";
import currencyImg from "../assets/ui/currency_bar.png";
import backImg from "../assets/ui/back_btn.png";

interface Props {
  back?: Screen;
  go: (s: Screen) => void;
}

export const Gear = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true">
    <path d="M19.4 13a7.5 7.5 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-1.7-1L15 3.5h-4l-.3 2.5a7.5 7.5 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.5 7.5 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.3 2.5h4l.3-2.5c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4zM12 15.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z" />
  </svg>
);

export function TopBar({ back, go }: Props) {
  const { save, level } = useGame();
  return (
    <div className="hdr">
      {back ? (
        <button className="imgbtn" onClick={() => go(back)} aria-label="Kembali">
          <img src={backImg} alt="" />
        </button>
      ) : (
        <button className="plate profile" onClick={() => go("profil")} aria-label="Profil">
          <img src={profileImg} alt="" />
          <span className="p-sis">Siswa</span>
          <span className="p-name">{save.name}</span>
          <span className="p-bar">
            <i style={{ width: `${(save.xp % 300) / 3}%` }} />
          </span>
          <span className="p-lv">Level {level}</span>
        </button>
      )}
      <div className="plate currency">
        <img src={currencyImg} alt="" />
        <span className="c-star">{save.star}</span>
        <span className="c-gem">{save.gem}</span>
      </div>
      <button className="gear" onClick={() => go("profil")} aria-label="Pengaturan">
        <Gear />
      </button>
    </div>
  );
}
