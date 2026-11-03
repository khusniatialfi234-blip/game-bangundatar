/** Latar pemandangan: langit, awan bergerak, gunung, kastil, bukit, kolam, pohon */
import type { ReactNode } from "react";

const Cloud = ({ x, y, s, d }: { x: number; y: number; s: number; d: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g className="drift" style={{ animationDelay: `${d}s` }} fill="#fff" opacity={0.95}>
      <ellipse cx={0} cy={0} rx={60} ry={24} />
      <ellipse cx={-34} cy={6} rx={42} ry={20} />
      <ellipse cx={38} cy={8} rx={46} ry={20} />
      <ellipse cx={4} cy={-16} rx={34} ry={22} />
    </g>
  </g>
);
const Tree = ({ x, y, s = 1, c = "#2f9e44" }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-4} y={0} width={8} height={18} fill="#7a4a22" />
    <circle cx={-13} cy={2} r={14} fill={c} />
    <circle cx={13} cy={2} r={14} fill={c} />
    <circle cy={-9} r={19} fill={c} />
  </g>
);

export function Scenery(): ReactNode {
  return (
    <div className="scenery" aria-hidden="true">
      <svg viewBox="0 0 430 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2f93ec" />
            <stop offset=".6" stopColor="#8fd0ff" />
            <stop offset="1" stopColor="#d6f0ff" />
          </linearGradient>
          <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fdc62" />
            <stop offset="1" stopColor="#4fb04a" />
          </linearGradient>
          <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6fd05a" />
            <stop offset="1" stopColor="#3f9f45" />
          </linearGradient>
          <linearGradient id="h3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5bc454" />
            <stop offset="1" stopColor="#2f8a3f" />
          </linearGradient>
        </defs>
        <rect width={430} height={900} fill="url(#sky)" />
        <circle cx={340} cy={110} r={78} fill="#fff6b8" opacity={0.3} />
        <circle cx={340} cy={110} r={44} fill="#fff1a0" />
        <Cloud x={70} y={130} s={1.1} d={0} />
        <Cloud x={250} y={210} s={0.8} d={-12} />
        <Cloud x={380} y={330} s={1} d={-6} />
        <Cloud x={40} y={400} s={0.9} d={-18} />
        <polygon points="0,610 100,480 190,610" fill="#9cc3ec" />
        <polygon points="100,490 120,520 100,512 80,520" fill="#fff" />
        <polygon points="130,610 240,450 360,610" fill="#8bb4e6" />
        <polygon points="240,450 264,490 240,480 216,490" fill="#fff" />
        <path d="M0 620 Q120 560 260 610 T430 590 V900 H0Z" fill="url(#h1)" />
        <g transform="translate(290 500)">
          <rect x={0} y={44} width={90} height={62} fill="#e6d3a2" stroke="#c9a24a" strokeWidth={2} />
          <rect x={-8} y={20} width={30} height={86} fill="#efdcab" stroke="#c9a24a" strokeWidth={2} />
          <polygon points="-14,20 7,-14 28,20" fill="#e8a33a" />
          <rect x={64} y={20} width={30} height={86} fill="#efdcab" stroke="#c9a24a" strokeWidth={2} />
          <polygon points="58,20 79,-14 100,20" fill="#e8505b" />
          <line x1={79} y1={-14} x2={79} y2={-36} stroke="#7a4a22" strokeWidth={3} />
          <polygon points="79,-36 101,-29 79,-22" fill="#e8505b" />
          <path d="M33 106V80a12 12 0 0 1 24 0V106Z" fill="#8a5a2a" />
        </g>
        <Tree x={40} y={640} s={1.2} />
        <Tree x={95} y={625} s={0.9} c="#3aae4f" />
        <Tree x={395} y={650} s={1} />
        <path d="M0 710 Q150 640 310 700 T430 670 V900 H0Z" fill="url(#h2)" />
        <ellipse cx={335} cy={770} rx={95} ry={24} fill="#5fc4ee" stroke="#c4efff" strokeWidth={4} />
        <ellipse cx={320} cy={765} rx={46} ry={7} fill="#fff" opacity={0.4} />
        <path d="M0 790 Q210 720 430 800 V900 H0Z" fill="url(#h3)" />
        <path
          d="M130 900 Q170 840 250 800 Q290 780 330 760 L350 772 Q290 800 270 840 Q250 880 290 900Z"
          fill="#ecc986"
          opacity={0.95}
        />
        <Tree x={30} y={780} s={1.3} />
        <Tree x={405} y={800} s={1.2} c="#3aae4f" />
        <g fill="#2f9e44">
          <ellipse cx={20} cy={895} rx={50} ry={26} />
          <ellipse cx={410} cy={895} rx={56} ry={28} />
        </g>
        <g>
          <circle cx={70} cy={850} r={5} fill="#ffd93b" />
          <circle cx={360} cy={860} r={5} fill="#ff8aa8" />
          <circle cx={110} cy={880} r={4} fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
