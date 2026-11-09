/** Bentuk "musuh" berwajah galak di layar Beranda */
export function Foe({
  kind,
  color,
  size = 64,
}: {
  kind: "circle" | "square" | "triangle";
  color: string;
  size?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {kind === "circle" && <circle cx={50} cy={52} r={42} fill={color} />}
      {kind === "square" && <rect x={10} y={12} width={80} height={80} rx={10} fill={color} />}
      {kind === "triangle" && <polygon points="50,8 94,90 6,90" fill={color} />}
      <circle cx={36} cy={54} r={8} fill="#fff" />
      <circle cx={64} cy={54} r={8} fill="#fff" />
      <circle cx={38} cy={56} r={4} fill="#17306b" />
      <circle cx={62} cy={56} r={4} fill="#17306b" />
      <path d="M24 38L44 46M76 38L56 46" stroke="#17306b" strokeWidth={5} strokeLinecap="round" />
      <path d="M38 74Q50 66 62 74" stroke="#17306b" strokeWidth={4} fill="none" strokeLinecap="round" />
    </svg>
  );
}
