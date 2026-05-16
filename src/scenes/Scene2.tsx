import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BLUE, GREEN } from '../utils/colors';

function sr(n: number): number {
  const x = Math.sin(n) * 43758.5453123;
  return x - Math.floor(x);
}

const BUILDINGS = Array.from({ length: 18 }, (_, i) => ({
  width: 40 + sr(i * 31) * 60,
  height: 120 + sr(i * 57) * 320,
  windows: Math.floor(3 + sr(i * 79) * 6),
}));

export const Scene2 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const hologramPulse = 0.5 + 0.5 * Math.sin(frame * 0.12);
  const subtitleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#070715', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Gradient sky */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 20%, rgba(0,80,180,0.25) 0%, transparent 70%)',
        }}
      />

      {/* City skyline */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 500,
          opacity: fadeIn,
        }}
      >
        {BUILDINGS.map((b, i) => {
          const x = (i / BUILDINGS.length) * 1260 - 20;
          return (
            <div key={i}>
              {/* Building */}
              <div
                style={{
                  position: 'absolute',
                  left: x,
                  bottom: 0,
                  width: b.width,
                  height: b.height,
                  background: `rgba(10,15,40,0.9)`,
                  border: `1px solid rgba(0,180,255,0.2)`,
                  boxShadow: `0 0 20px rgba(0,100,255,0.1)`,
                }}
              >
                {/* Windows */}
                {Array.from({ length: b.windows }, (_, w) => {
                  const windowOn = sr(i * 100 + w * 13 + Math.floor(frame * 0.03)) > 0.4;
                  return (
                    <div
                      key={w}
                      style={{
                        position: 'absolute',
                        left: '25%',
                        width: '50%',
                        height: 6,
                        top: 20 + w * 20,
                        background: windowOn ? BLUE : 'transparent',
                        opacity: windowOn ? (0.4 + 0.3 * sr(i * 7 + w)) : 0,
                        boxShadow: windowOn ? `0 0 6px ${BLUE}` : 'none',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hologram circles */}
      <svg
        viewBox="0 0 1280 720"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: fadeIn * 0.7 }}
      >
        {[80, 150, 220, 300].map((r, i) => (
          <circle
            key={i}
            cx="200"
            cy="300"
            r={r}
            fill="none"
            stroke={BLUE}
            strokeWidth={i === 0 ? 1.5 : 0.7}
            opacity={hologramPulse * (0.6 - i * 0.1)}
            strokeDasharray={i % 2 === 0 ? 'none' : '8 6'}
          />
        ))}
        {/* Hologram lines */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <line
              key={`hl${i}`}
              x1="200"
              y1="300"
              x2={200 + Math.cos(angle) * 300}
              y2={300 + Math.sin(angle) * 300}
              stroke={BLUE}
              strokeWidth="0.5"
              opacity={0.3 * hologramPulse}
            />
          );
        })}
        {/* Blueprint hand outline */}
        <g transform="translate(900, 180)" opacity={fadeIn * 0.5}>
          <rect x="0" y="80" width="60" height="120" rx="8" fill="none" stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 4" />
          {[0, 1, 2, 3].map((f) => (
            <rect key={f} x={-15 + f * 20} y="0" width="14" height="90" rx="6" fill="none" stroke={GREEN} strokeWidth="1" strokeDasharray="3 3" />
          ))}
          <rect x="-25" y="50" width="12" height="60" rx="6" fill="none" stroke={GREEN} strokeWidth="1" strokeDasharray="3 3" />
        </g>
      </svg>

      {/* Scientist silhouette */}
      <div
        style={{
          position: 'absolute',
          right: 160,
          bottom: 80,
          opacity: fadeIn * 0.5,
        }}
      >
        <svg viewBox="0 0 80 180" width="80" height="180">
          <circle cx="40" cy="20" r="18" fill={`${BLUE}44`} stroke={BLUE} strokeWidth="1" />
          <path d="M15 50 Q40 40 65 50 L70 160 L10 160 Z" fill={`${BLUE}33`} stroke={BLUE} strokeWidth="1" />
          <line x1="15" y1="80" x2="-10" y2="130" stroke={BLUE} strokeWidth="1.5" />
          <line x1="65" y1="80" x2="90" y2="130" stroke={BLUE} strokeWidth="1.5" />
        </svg>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: subtitleOpacity,
        }}
      >
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.6)', padding: '10px 30px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 20, fontStyle: 'italic' }}>
            "Something we saw in movies, research labs, and futuristic predictions."
          </span>
        </div>
      </div>

      {/* Labels */}
      {['MOVIES', 'RESEARCH LABS', 'PREDICTIONS'].map((label, i) => (
        <div
          key={label}
          style={{
            position: 'absolute',
            top: 80 + i * 60,
            left: 440 + i * 20,
            color: GREEN,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.2em',
            opacity: interpolate(frame, [10 + i * 8, 25 + i * 8], [0, 1], { extrapolateRight: 'clamp' }) * 0.7,
            textShadow: `0 0 10px ${GREEN}`,
          }}
        >
          {'> ' + label}
        </div>
      ))}
    </AbsoluteFill>
  );
};
