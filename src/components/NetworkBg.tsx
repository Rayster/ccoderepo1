import { useCurrentFrame } from 'remotion';

function sr(n: number): number {
  const x = Math.sin(n) * 43758.5453123;
  return x - Math.floor(x);
}

const DOT_COUNT = 55;
const DOTS = Array.from({ length: DOT_COUNT }, (_, i) => ({
  x: sr(i * 73.1) * 1280,
  y: sr(i * 41.3) * 720,
  phase: sr(i * 19.7) * Math.PI * 2,
  speed: 0.02 + sr(i * 53.9) * 0.03,
  dx: (sr(i * 29.3) - 0.5) * 0.4,
  dy: (sr(i * 67.1) - 0.5) * 0.4,
}));

export const NetworkBg = ({
  opacity = 0.5,
  color = '#00d4ff',
}: {
  opacity?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();

  const positions = DOTS.map((d) => ({
    x: ((d.x + d.dx * frame + 1280) % 1280),
    y: ((d.y + d.dy * frame + 720) % 720),
    glow: 0.4 + 0.6 * Math.sin(frame * d.speed + d.phase) ** 2,
  }));

  const lines: React.ReactElement[] = [];
  const MAX_DIST = 180;

  for (let i = 0; i < DOT_COUNT; i++) {
    for (let j = i + 1; j < DOT_COUNT; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        lines.push(
          <line
            key={`l${i}-${j}`}
            x1={positions[i].x}
            y1={positions[i].y}
            x2={positions[j].x}
            y2={positions[j].y}
            stroke={color}
            strokeWidth={0.5}
            opacity={(1 - dist / MAX_DIST) * 0.4}
          />
        );
      }
    }
  }

  return (
    <svg
      viewBox="0 0 1280 720"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        pointerEvents: 'none',
      }}
    >
      {lines}
      {positions.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={2.5}
          fill={color}
          opacity={p.glow * 0.9}
          filter={`url(#glow-${i % 3})`}
        />
      ))}
      <defs>
        {[0, 1, 2].map((id) => (
          <filter key={id} id={`glow-${id}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>
    </svg>
  );
};
