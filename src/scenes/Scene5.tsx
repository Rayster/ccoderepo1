import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BG, BLUE, GREEN } from '../utils/colors';

const ROBOTS = [
  { label: 'FACTORY', location: 'Industrial Floor', color: '#ff6b35', icon: 'ARM' },
  { label: 'HOSPITAL', location: 'Surgical Suite', color: '#22d3ee', icon: 'MED' },
  { label: 'DELIVERY', location: 'City Streets', color: GREEN, icon: 'DLV' },
  { label: 'WAREHOUSE', location: 'Fulfillment Center', color: BLUE, icon: 'WHS' },
  { label: 'HUMANOID', location: 'Office & Home', color: '#a855f7', icon: 'HMN' },
];

const RobotCard = ({
  robot,
  frame,
  delay,
}: {
  robot: (typeof ROBOTS)[0];
  frame: number;
  delay: number;
}) => {
  const opacity = interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateRight: 'clamp' });
  const slideX = interpolate(frame, [delay, delay + 14], [-30, 0], { extrapolateRight: 'clamp' });
  const pulse = 0.6 + 0.4 * Math.sin(frame * 0.1 + delay * 0.2);
  const c = robot.color;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        border: `1px solid ${c}88`,
        borderRadius: 6,
        background: `${c}0d`,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        boxShadow: `0 0 20px ${c}22`,
      }}
    >
      {/* Robot icon */}
      <svg viewBox="0 0 80 120" width="64" height="96">
        {robot.label === 'ARM' || robot.icon === 'ARM' ? (
          <>
            {/* Robotic arm */}
            <line x1="40" y1="110" x2="40" y2="80" stroke={c} strokeWidth="6" strokeLinecap="round" />
            <line x1="40" y1="80" x2="20" y2="55" stroke={c} strokeWidth="5" strokeLinecap="round" />
            <line x1="20" y1="55" x2="35" y2="30" stroke={c} strokeWidth="4" strokeLinecap="round" />
            <circle cx="40" cy="80" r="5" fill={c} opacity={pulse} />
            <circle cx="20" cy="55" r="5" fill={c} opacity={pulse} />
            <rect x="28" y="20" width="14" height="12" rx="2" fill="none" stroke={c} strokeWidth="2" />
          </>
        ) : (
          <>
            {/* Generic humanoid robot */}
            <circle cx="40" cy="18" r="12" fill="none" stroke={c} strokeWidth="1.5" />
            <rect x="24" y="22" width="32" height="42" rx="4" fill="none" stroke={c} strokeWidth="1.5" />
            <rect x="10" y="24" width="12" height="34" rx="3" fill="none" stroke={c} strokeWidth="1.2" />
            <rect x="58" y="24" width="12" height="34" rx="3" fill="none" stroke={c} strokeWidth="1.2" />
            <rect x="27" y="64" width="10" height="30" rx="3" fill="none" stroke={c} strokeWidth="1.2" />
            <rect x="43" y="64" width="10" height="30" rx="3" fill="none" stroke={c} strokeWidth="1.2" />
            {/* Eyes */}
            <rect x="30" y="14" width="8" height="5" rx="1" fill={c} opacity={pulse} />
            <rect x="42" y="14" width="8" height="5" rx="1" fill={c} opacity={pulse} />
          </>
        )}
        <rect x="0" y="108" width="80" height="2" fill={c} opacity={0.3} rx="1" />
      </svg>

      {/* Badge */}
      <div
        style={{
          background: c,
          color: '#000',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.15em',
          padding: '3px 10px',
          borderRadius: 2,
        }}
      >
        {robot.icon}
      </div>

      {/* Label */}
      <div style={{ color: c, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textAlign: 'center' }}>
        {robot.label}
      </div>

      {/* Location tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${c}44`,
          borderRadius: 20,
          padding: '4px 10px',
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: c, opacity: pulse }} />
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{robot.location}</span>
      </div>
    </div>
  );
};

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 32, left: 0, right: 0, textAlign: 'center', opacity: fadeIn }}>
        <div style={{ fontSize: 12, color: BLUE, letterSpacing: '0.25em', marginBottom: 6 }}>DEPLOYMENT STATUS</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>
          ROBOTS ARE MOVING INTO EVERY INDUSTRY
        </div>
      </div>

      {/* Robot cards */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 30,
          right: 30,
          bottom: 70,
          display: 'flex',
          gap: 14,
          alignItems: 'stretch',
        }}
      >
        {ROBOTS.map((r, i) => (
          <div key={r.label} style={{ flex: 1 }}>
            <RobotCard robot={r} frame={frame} delay={i * 14} />
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 30,
          right: 30,
          display: 'flex',
          gap: 10,
          opacity: fadeIn,
        }}
      >
        {ROBOTS.map((r, i) => (
          <div
            key={r.label}
            style={{
              flex: 1,
              height: 3,
              background: r.color,
              borderRadius: 2,
              opacity: interpolate(frame, [i * 14, i * 14 + 20], [0, 0.8], { extrapolateRight: 'clamp' }),
              boxShadow: `0 0 6px ${r.color}`,
            }}
          />
        ))}
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.7)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, fontStyle: 'italic' }}>
            "And robots are moving from factory floors into hospitals, homes, farms, warehouses, and even offices."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
