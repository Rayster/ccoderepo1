export const BlueprintGrid = ({ opacity = 0.15 }: { opacity?: number }) => (
  <svg
    viewBox="0 0 1280 720"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none' }}
  >
    {Array.from({ length: 21 }, (_, i) => (
      <line
        key={`h${i}`}
        x1="0"
        y1={i * 36}
        x2="1280"
        y2={i * 36}
        stroke="#00d4ff"
        strokeWidth="0.5"
        strokeDasharray="4 10"
      />
    ))}
    {Array.from({ length: 36 }, (_, i) => (
      <line
        key={`v${i}`}
        x1={i * 36}
        y1="0"
        x2={i * 36}
        y2="720"
        stroke="#00d4ff"
        strokeWidth="0.5"
        strokeDasharray="4 10"
      />
    ))}
    <circle cx="640" cy="360" r="120" fill="none" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="6 12" />
    <circle cx="640" cy="360" r="240" fill="none" stroke="#00d4ff" strokeWidth="0.3" strokeDasharray="4 16" />
  </svg>
);
