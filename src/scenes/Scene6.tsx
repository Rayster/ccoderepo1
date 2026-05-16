import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { RobotSVG } from '../components/RobotSVG';
import { BG, BLUE, GREEN } from '../utils/colors';

export const Scene6 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const headingOpacity = interpolate(frame, [38, 56], [0, 1], { extrapolateRight: 'clamp' });
  const headingScale = interpolate(frame, [38, 56], [0.85, 1], { extrapolateRight: 'clamp' });
  const robotOpacity = interpolate(frame, [10, 30], [0, 0.75], { extrapolateRight: 'clamp' });
  const screenGlow = 0.5 + 0.5 * Math.sin(frame * 0.08);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Scan lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,212,255,0.02) 0px, rgba(0,212,255,0.02) 1px, transparent 1px, transparent 5px)',
        pointerEvents: 'none',
      }} />

      {/* Human silhouette on the left */}
      <div style={{ position: 'absolute', left: 120, top: 80, opacity: fadeIn * 0.85 }}>
        <svg viewBox="0 0 120 300" width="120" height="300">
          {/* Head */}
          <circle cx="60" cy="36" r="30" fill={`${BLUE}22`} stroke={BLUE} strokeWidth="1.5" />
          {/* Body */}
          <path d="M30 80 Q60 66 90 80 L100 220 L20 220 Z" fill={`${BLUE}18`} stroke={BLUE} strokeWidth="1.5" />
          {/* Arms */}
          <line x1="30" y1="100" x2="0" y2="180" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="100" x2="120" y2="180" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
          {/* Legs */}
          <line x1="45" y1="220" x2="30" y2="300" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
          <line x1="75" y1="220" x2="90" y2="300" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
          {/* Heartbeat / human indicator */}
          <circle cx="60" cy="36" r="16" fill={BLUE} opacity={0.08 + 0.08 * screenGlow} />
        </svg>
        <div style={{ textAlign: 'center', color: BLUE, fontSize: 11, letterSpacing: '0.2em', marginTop: 8, opacity: 0.6 }}>HUMAN</div>
      </div>

      {/* AI screen in center */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          height: 240,
          border: `2px solid ${BLUE}`,
          borderRadius: 8,
          background: `rgba(0,10,30,0.9)`,
          boxShadow: `0 0 40px ${BLUE}44, 0 0 80px ${BLUE}22`,
          opacity: fadeIn,
          overflow: 'hidden',
        }}
      >
        {/* Screen header */}
        <div style={{ background: `${BLUE}33`, borderBottom: `1px solid ${BLUE}66`, padding: '8px 14px', display: 'flex', gap: 6 }}>
          {[BLUE, GREEN, '#ff6b35'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ color: BLUE, fontSize: 11, marginLeft: 6 }}>AI WORKSTATION — ONLINE</span>
        </div>
        {/* Dashboard content */}
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Productivity', val: 0.88, color: GREEN },
            { label: 'Automation', val: 0.76, color: BLUE },
            { label: 'Collaboration', val: 0.92, color: '#a855f7' },
          ].map(({ label, val, color }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{label}</span>
                <span style={{ color, fontSize: 12, fontWeight: 700 }}>{Math.round(val * 100)}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                <div style={{
                  height: '100%',
                  width: `${val * 100}%`,
                  background: color,
                  borderRadius: 2,
                  boxShadow: `0 0 6px ${color}`,
                  opacity: 0.7 + 0.3 * screenGlow,
                }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8, color: GREEN, fontSize: 11, opacity: 0.7 }}>
            {'> HUMAN-AI SYNC: ACTIVE'}
          </div>
        </div>
      </div>

      {/* Robot on the right */}
      <div style={{ position: 'absolute', right: 80, top: 80, opacity: robotOpacity }}>
        <RobotSVG scale={1.55} color={GREEN} opacity={1} glowIntensity={0.6} />
        <div style={{ textAlign: 'center', color: GREEN, fontSize: 11, letterSpacing: '0.2em', marginTop: 8, opacity: 0.7 }}>AI ROBOT</div>
      </div>

      {/* Connection lines */}
      <svg viewBox="0 0 1280 720" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: fadeIn * 0.5 }}>
        {/* Human to screen */}
        <line x1="230" y1="230" x2="480" y2="360" stroke={BLUE} strokeWidth="1" strokeDasharray="6 6"
          opacity={0.4 + 0.3 * screenGlow} />
        {/* Screen to robot */}
        <line x1="800" y1="360" x2="1020" y2="230" stroke={GREEN} strokeWidth="1" strokeDasharray="6 6"
          opacity={0.4 + 0.3 * screenGlow} />
        {/* Data flow dots on human-screen line */}
        {[0.2, 0.5, 0.8].map((t, i) => {
          const x = 230 + (480 - 230) * ((t + (frame * 0.015)) % 1);
          const y = 230 + (360 - 230) * ((t + (frame * 0.015)) % 1);
          return <circle key={i} cx={x} cy={y} r={3} fill={BLUE} opacity={0.8} />;
        })}
        {/* Data flow dots on screen-robot line */}
        {[0.2, 0.5, 0.8].map((t, i) => {
          const progress = (t + (frame * 0.015)) % 1;
          const x = 800 + (1020 - 800) * progress;
          const y = 360 + (230 - 360) * progress;
          return <circle key={i} cx={x} cy={y} r={3} fill={GREEN} opacity={0.8} />;
        })}
      </svg>

      {/* "WORKFORCE SHIFT" heading */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: headingOpacity,
          transform: `scale(${headingScale})`,
        }}
      >
        <div style={{ fontSize: 16, color: BLUE, letterSpacing: '0.25em', marginBottom: 8 }}>THIS IS NOT JUST A TECHNOLOGY SHIFT</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: '#ffffff', letterSpacing: '0.06em', textShadow: `0 0 30px ${BLUE}88` }}>
          THIS IS A{' '}
          <span style={{ color: BLUE, textShadow: `0 0 20px ${BLUE}` }}>WORKFORCE</span>{' '}
          SHIFT.
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.6)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, fontStyle: 'italic' }}>
            "This is not just a technology shift."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
