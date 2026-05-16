import { useCurrentFrame } from 'remotion';

const CHARS = '01ABCDEF<>{}[]#$ΛΦΠΣ01100101';

function sr(n: number): number {
  const x = Math.sin(n) * 43758.5453123;
  return x - Math.floor(x);
}

export const CodeRain = ({
  opacity = 0.18,
  color = '#00ff88',
}: {
  opacity?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const cols = 44;
  const rows = 20;
  const cellW = Math.floor(1280 / cols);
  const cellH = Math.floor(720 / rows);

  const cells: React.ReactElement[] = [];

  for (let col = 0; col < cols; col++) {
    const speed = 0.12 + sr(col * 31.7) * 0.22;
    const offset = sr(col * 99.3) * rows;
    const headRowInt = Math.floor((frame * speed + offset) % rows);

    for (let row = 0; row < rows; row++) {
      const dist = (headRowInt - row + rows) % rows;
      const charOpacity = dist === 0 ? 1 : dist < 7 ? (1 - dist / 7) * 0.75 : 0;
      if (charOpacity < 0.02) continue;

      const tick = Math.floor(frame * speed);
      const charIdx = Math.floor(sr(col * 137 + row * 53 + tick) * CHARS.length);

      cells.push(
        <div
          key={`${col}-${row}`}
          style={{
            position: 'absolute',
            left: col * cellW,
            top: row * cellH,
            width: cellW,
            height: cellH,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontFamily: 'Courier New, monospace',
            color: dist === 0 ? '#ffffff' : color,
            opacity: charOpacity,
            textShadow: dist < 2 ? `0 0 8px ${color}` : 'none',
          }}
        >
          {CHARS[charIdx]}
        </div>
      );
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {cells}
    </div>
  );
};
