import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BLUE, GREEN } from '../utils/colors';

// 4-panel robot industries image — overlay the existing split-screen panels
const QUADRANTS = [
  { label: 'FACTORY', sub: 'Industrial Automation', color: '#ff6b35', pos: { top: 0, left: 0, width: '50%', height: '50%' } },
  { label: 'HOSPITAL', sub: 'Surgical Precision', color: '#22d3ee', pos: { top: 0, right: 0, width: '50%', height: '50%' } },
  { label: 'WAREHOUSE', sub: 'Fulfillment Centers', color: BLUE, pos: { bottom: 0, left: 0, width: '50%', height: '50%' } },
  { label: 'FARMING', sub: 'Agricultural Robots', color: GREEN, pos: { bottom: 0, right: 0, width: '50%', height: '50%' } },
];

export const Scene8 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.1);
  const imgScale = interpolate(frame, [0, 90], [1.04, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo — 4-panel robot montage */}
      <Img
        src={staticFile('25.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${imgScale})`,
          transformOrigin: 'center center',
        }}
      />

      {/* Base dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.45)' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Quadrant label overlays */}
      {QUADRANTS.map(({ label, sub, color, pos }, i) => {
        const op = interpolate(frame, [i * 10, i * 10 + 14], [0, 1], { extrapolateRight: 'clamp' });
        return (
          <div key={label} style={{ position: 'absolute', ...pos, opacity: op * fadeIn, pointerEvents: 'none' }}>
            {/* Corner bracket */}
            <div style={{
              position: 'absolute',
              top: 14,
              left: 14,
              width: 28,
              height: 28,
              borderTop: `2px solid ${color}`,
              borderLeft: `2px solid ${color}`,
              opacity: 0.8,
            }} />
            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: 18,
              left: 18,
              background: 'rgba(0,0,0,0.72)',
              border: `1px solid ${color}77`,
              borderRadius: 4,
              padding: '6px 12px',
            }}>
              <div style={{ color, fontSize: 13, fontWeight: 700, letterSpacing: '0.14em' }}>{label}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, marginTop: 2 }}>{sub}</div>
            </div>
            {/* Pulse dot */}
            <div style={{
              position: 'absolute',
              top: 18,
              right: 18,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: color,
              opacity: pulse,
              boxShadow: `0 0 8px ${color}`,
            }} />
          </div>
        );
      })}

      {/* Center cross divider lines */}
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: `rgba(0,212,255,0.3)`, opacity: fadeIn }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: `rgba(0,212,255,0.3)`, opacity: fadeIn }} />

      {/* Heading */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: 'translateY(-50%)',
        textAlign: 'center',
        opacity: interpolate(frame, [42, 60], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(0,0,0,0.82)',
          border: `1px solid ${BLUE}55`,
          borderRadius: 6,
          padding: '14px 36px',
          boxShadow: `0 0 40px rgba(0,0,0,0.8)`,
        }}>
          <div style={{ fontSize: 13, color: BLUE, letterSpacing: '0.22em', marginBottom: 6 }}>DEPLOYMENT SCOPE</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', letterSpacing: '0.05em', textShadow: `0 0 30px ${BLUE}55` }}>
            EVERY INDUSTRY.<br />
            <span style={{ color: BLUE }}>EVERY SECTOR.</span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', opacity: subtitleOpacity }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.78)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, fontStyle: 'italic' }}>
            "The future will not belong to humans or machines alone…"
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
