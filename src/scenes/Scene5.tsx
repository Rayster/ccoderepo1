import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BLUE, GREEN } from '../utils/colors';

const ROBOTS = [
  { label: 'FACTORY', location: 'Industrial Floor', color: '#ff6b35', icon: 'ARM' },
  { label: 'HOSPITAL', location: 'Surgical Suite', color: '#22d3ee', icon: 'MED' },
  { label: 'DELIVERY', location: 'City Streets', color: GREEN, icon: 'DLV' },
  { label: 'WAREHOUSE', location: 'Fulfillment Center', color: BLUE, icon: 'WHS' },
  { label: 'HUMANOID', location: 'Office & Home', color: '#a855f7', icon: 'HMN' },
];

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const imgScale = interpolate(frame, [0, 120], [1, 1.06], { extrapolateRight: 'clamp' });
  const imgX = interpolate(frame, [0, 120], [0, 20], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo */}
      <Img
        src={staticFile('13.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${imgScale}) translateX(${imgX}px)`,
          transformOrigin: 'center center',
        }}
      />

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.6)' }} />
      {/* Bottom gradient for cards */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.95) 100%)' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 32, left: 0, right: 0, textAlign: 'center', opacity: fadeIn }}>
        <div style={{ fontSize: 12, color: BLUE, letterSpacing: '0.25em', marginBottom: 6 }}>DEPLOYMENT STATUS</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '0.05em', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
          ROBOTS ARE MOVING INTO EVERY INDUSTRY
        </div>
      </div>

      {/* Robot location cards */}
      <div style={{ position: 'absolute', bottom: 60, left: 30, right: 30, display: 'flex', gap: 14 }}>
        {ROBOTS.map((r, i) => {
          const cardOpacity = interpolate(frame, [i * 14, i * 14 + 14], [0, 1], { extrapolateRight: 'clamp' });
          const cardY = interpolate(frame, [i * 14, i * 14 + 14], [20, 0], { extrapolateRight: 'clamp' });
          const pulse = 0.6 + 0.4 * Math.sin(frame * 0.1 + i);
          return (
            <div key={r.label} style={{ flex: 1, border: `1px solid ${r.color}88`, borderRadius: 6, background: 'rgba(0,0,0,0.75)', padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: cardOpacity, transform: `translateY(${cardY}px)`, boxShadow: `0 0 20px ${r.color}22` }}>
              {/* Icon badge */}
              <div style={{ background: r.color, color: '#000', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', padding: '4px 10px', borderRadius: 2 }}>{r.icon}</div>
              {/* Pulse dot */}
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.color, opacity: pulse, boxShadow: `0 0 8px ${r.color}` }} />
              {/* Label */}
              <div style={{ color: r.color, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textAlign: 'center' }}>{r.label}</div>
              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.05)', border: `1px solid ${r.color}44`, borderRadius: 20, padding: '3px 8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10 }}>{r.location}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div style={{ position: 'absolute', bottom: 26, left: 30, right: 30, display: 'flex', gap: 10, opacity: fadeIn }}>
        {ROBOTS.map((r, i) => (
          <div key={r.label} style={{
            flex: 1,
            height: 3,
            background: r.color,
            borderRadius: 2,
            opacity: interpolate(frame, [i * 14, i * 14 + 20], [0, 0.8], { extrapolateRight: 'clamp' }),
            boxShadow: `0 0 6px ${r.color}`,
          }} />
        ))}
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 4, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.75)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, fontStyle: 'italic' }}>
            "And robots are moving from factory floors into hospitals, homes, farms, warehouses, and even offices."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
