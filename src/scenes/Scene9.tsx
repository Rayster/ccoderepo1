import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { NetworkBg } from '../components/NetworkBg';
import { RobotSVG } from '../components/RobotSVG';
import { BG, BLUE, GREEN } from '../utils/colors';

const CTA_LINES = [
  { text: 'LEARN AI.', delay: 10, color: BLUE },
  { text: 'WORK SMARTER.', delay: 22, color: GREEN },
  { text: 'STAY FUTURE-READY.', delay: 34, color: '#ffffff' },
];

export const Scene9 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const humanOpacity = interpolate(frame, [4, 20], [0, 1], { extrapolateRight: 'clamp' });
  const glowIntensity = interpolate(frame, [0, 30], [0.3, 1], { extrapolateRight: 'clamp' });
  const pulse = 0.6 + 0.4 * Math.sin(frame * 0.08);
  const subtitleOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Animated network */}
      <NetworkBg opacity={0.55 * fadeIn} color={BLUE} />

      {/* Green secondary network */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.3 * fadeIn }}>
        <NetworkBg opacity={0.5} color={GREEN} />
      </div>

      {/* Central glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600 * glowIntensity,
          height: 600 * glowIntensity,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(0,255,136,0.06) 40%, transparent 70%)`,
          pointerEvents: 'none',
          opacity: pulse,
        }}
      />

      {/* Robot silhouette — left background */}
      <div style={{ position: 'absolute', left: 30, top: 120, opacity: humanOpacity * 0.3 }}>
        <RobotSVG scale={1.8} color={BLUE} opacity={1} glowIntensity={0.4} />
      </div>

      {/* Robot silhouette — right background */}
      <div style={{ position: 'absolute', right: 30, top: 120, opacity: humanOpacity * 0.3 }}>
        <RobotSVG scale={1.8} color={GREEN} opacity={1} glowIntensity={0.4} />
      </div>

      {/* Human figure — center hero */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 80,
          transform: 'translateX(-50%)',
          opacity: humanOpacity,
        }}
      >
        <svg viewBox="0 0 140 340" width="140" height="340">
          {/* Glow aura */}
          <circle cx="70" cy="50" r={55 + 8 * pulse} fill={BLUE} opacity={0.06 * glowIntensity} />
          <circle cx="70" cy="50" r={45 + 5 * pulse} fill={BLUE} opacity={0.08 * glowIntensity} />
          {/* Head */}
          <circle cx="70" cy="44" r="36" fill={`${BLUE}28`} stroke={BLUE} strokeWidth="2" />
          <circle cx="70" cy="44" r="28" fill={`${BLUE}18`} />
          {/* Body glow */}
          <path d="M28 92 Q70 76 112 92 L120 260 L20 260 Z" fill={`${BLUE}1a`} stroke={BLUE} strokeWidth="1.8" />
          {/* Arms */}
          <line x1="28" y1="116" x2="-8" y2="210" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="112" y1="116" x2="148" y2="210" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="50" y1="260" x2="34" y2="340" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="90" y1="260" x2="106" y2="340" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
          {/* Chest AI node */}
          <circle cx="70" cy="170" r={8 + 3 * pulse} fill={BLUE} opacity={glowIntensity * 0.9} />
          <circle cx="70" cy="170" r="4" fill="#fff" opacity={0.8} />
          {/* Connecting lines from chest to network */}
          {[[-40, -80], [40, -80], [-60, 40], [60, 40], [0, 90]].map(([dx, dy], i) => (
            <line
              key={i}
              x1="70"
              y1="170"
              x2={70 + dx}
              y2={170 + dy}
              stroke={BLUE}
              strokeWidth="0.8"
              opacity={0.2 + 0.2 * Math.sin(frame * 0.1 + i * 0.8)}
              strokeDasharray="4 4"
            />
          ))}
        </svg>
      </div>

      {/* CTA Lines */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {CTA_LINES.map(({ text, delay, color }) => {
          const lineOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateRight: 'clamp' });
          const lineScale = interpolate(frame, [delay, delay + 12], [0.9, 1], { extrapolateRight: 'clamp' });
          return (
            <div
              key={text}
              style={{
                opacity: lineOpacity,
                transform: `scale(${lineScale})`,
                color,
                fontSize: text === 'STAY FUTURE-READY.' ? 48 : 38,
                fontWeight: 900,
                letterSpacing: '0.08em',
                textShadow: `0 0 20px ${color}88, 0 0 40px ${color}44`,
                lineHeight: 1.15,
              }}
            >
              {text}
            </div>
          );
        })}
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', opacity: subtitleOpacity }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.7)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, fontStyle: 'italic' }}>
            "It will belong to people who know how to work with AI."
          </span>
        </div>
      </div>

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.5) 100%)',
        pointerEvents: 'none',
      }} />
    </AbsoluteFill>
  );
};
