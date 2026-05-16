import { useCurrentFrame } from 'remotion';

export const GlitchText = ({
  text,
  fontSize = 72,
  color = '#ffffff',
  accentColor = '#00d4ff',
  style = {},
}: {
  text: string;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const isGlitching = frame % 13 < 3;
  const offsetX = isGlitching ? ((frame % 7) - 3) * 4 : 0;
  const offsetY = isGlitching ? ((frame % 5) - 2) * 2 : 0;

  const base: React.CSSProperties = {
    fontFamily: "'Courier New', monospace",
    fontWeight: 900,
    fontSize,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    position: 'relative',
    display: 'inline-block',
    ...style,
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Red ghost */}
      {isGlitching && (
        <div
          style={{
            ...base,
            position: 'absolute',
            color: '#ff0044',
            opacity: 0.6,
            transform: `translate(${offsetX + 4}px, ${offsetY}px)`,
            top: 0,
            left: 0,
            mixBlendMode: 'screen',
          }}
        >
          {text}
        </div>
      )}
      {/* Blue ghost */}
      {isGlitching && (
        <div
          style={{
            ...base,
            position: 'absolute',
            color: accentColor,
            opacity: 0.6,
            transform: `translate(${-offsetX - 4}px, ${offsetY}px)`,
            top: 0,
            left: 0,
            mixBlendMode: 'screen',
          }}
        >
          {text}
        </div>
      )}
      {/* Main text */}
      <div
        style={{
          ...base,
          color,
          textShadow: `0 0 20px ${accentColor}, 0 0 40px ${accentColor}88`,
        }}
      >
        {text}
      </div>
    </div>
  );
};
