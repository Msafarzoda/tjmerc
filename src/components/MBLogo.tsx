// Faithful recreation of the Mercedes-Benz three-pointed star logo
export default function MBLogo({ size = 40 }: { size?: number }) {
  const cx = 19, cy = 19, r = 18;

  // The three star points (top, bottom-right, bottom-left)
  // Top at -90°, others at 30° and 150°
  const pts = [
    { angle: -90 }, { angle: 30 }, { angle: 150 },
  ].map(({ angle }) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  // Inner waist points between each pair of arms (at small radius ~3.2)
  // at 330°(-30°), 90°, 210°
  const innerR = 3.2;
  const inner = [
    { angle: -30 }, { angle: 90 }, { angle: 210 },
  ].map(({ angle }) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + innerR * Math.cos(rad), y: cy + innerR * Math.sin(rad) };
  });

  // Star path: top → inner-right → right → inner-bottom → left → inner-left → close
  const starPath = [
    `M ${pts[0].x} ${pts[0].y}`,
    `L ${inner[0].x} ${inner[0].y}`,
    `L ${pts[1].x} ${pts[1].y}`,
    `L ${inner[1].x} ${inner[1].y}`,
    `L ${pts[2].x} ${pts[2].y}`,
    `L ${inner[2].x} ${inner[2].y}`,
    "Z",
  ].join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} stroke="#c9a84c" strokeWidth="1.2" fill="none" />
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={r - 4} stroke="#c9a84c" strokeWidth="0.4" fill="none" />
      {/* Three-pointed star */}
      <path d={starPath} fill="#c9a84c" fillRule="evenodd" />
    </svg>
  );
}
