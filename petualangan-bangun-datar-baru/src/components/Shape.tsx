/** Gambar bangun datar (SVG) */
import { sv } from "../data/shapes";

export function Shape({
  name,
  color = "#ffc93c",
  size = 110,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  // sv() menghasilkan SVG buatan sendiri, bukan masukan pengguna
  return <span className="shape" dangerouslySetInnerHTML={{ __html: sv(name, color, size) }} />;
}
