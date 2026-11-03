/** Maskot segitiga kuning lengkap dengan ransel, tangan, dan sepatu */
export function Hero({ size = 150 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 130" width={size} height={(size * 130) / 120}>
      <ellipse cx={60} cy={125} rx={34} ry={5} fill="#0003" />
      <rect x={40} y={102} width={10} height={16} rx={4} fill="#2b3a5c" />
      <rect x={70} y={102} width={10} height={16} rx={4} fill="#2b3a5c" />
      <ellipse cx={42} cy={120} rx={12} ry={6} fill="#8a5a2a" />
      <ellipse cx={80} cy={120} rx={12} ry={6} fill="#8a5a2a" />
      <rect x={0} y={56} width={26} height={42} rx={10} fill="#1f4aa8" stroke="#163a86" strokeWidth={2} />
      <rect x={6} y={70} width={14} height={8} rx={3} fill="#f3c542" />
      <path
        d="M60 6L112 100Q114 108 106 108H14Q6 108 8 100Z"
        fill="#ffc93c"
        stroke="#f0a020"
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M60 14L84 58L60 52Z" fill="#fff" opacity={0.25} />
      <ellipse cx={48} cy={64} rx={6} ry={9} fill="#17306b" />
      <ellipse cx={72} cy={64} rx={6} ry={9} fill="#17306b" />
      <circle cx={50} cy={60} r={2.5} fill="#fff" />
      <circle cx={74} cy={60} r={2.5} fill="#fff" />
      <path d="M50 82Q60 98 70 82Z" fill="#e8445a" />
      <circle cx={38} cy={76} r={5} fill="#ff9c7a" opacity={0.6} />
      <circle cx={82} cy={76} r={5} fill="#ff9c7a" opacity={0.6} />
      <circle cx={108} cy={72} r={9} fill="#ffc93c" stroke="#f0a020" strokeWidth={3} />
    </svg>
  );
}
