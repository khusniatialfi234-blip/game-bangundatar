/** Bintang SVG: emas (hasil level) atau biru (tujuan level / eksplorasi) */
export function Star({
  on = true,
  size = 36,
  color = "gold",
}: {
  on?: boolean;
  size?: number;
  color?: "gold" | "blue";
}) {
  const fill = !on ? "#b9c7de" : color === "gold" ? "#ffc93c" : "#2f7fe0";
  const stroke = !on ? "#9aa9c4" : color === "gold" ? "#f0a020" : "#1b4fb0";
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path
        d="M24 4l6.2 12.9 14.1 2-10.2 9.9 2.4 14L24 36.2 11.5 42.8l2.4-14L3.7 18.9l14.1-2z"
        fill={fill}
        stroke={stroke}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {on && (
        <path
          d="M24 10l3.6 8 7 .9"
          fill="none"
          stroke="#fff"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.6}
        />
      )}
    </svg>
  );
}
