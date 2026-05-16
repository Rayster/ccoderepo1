import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BG, BLUE, GREEN } from '../utils/colors';

export const Scene8 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const mergeProgress = interpolate(frame, [40, 80], [0, 1], { extrapolateRight: 'clamp' });
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.1);
  const circuitPulse = 0.4 + 0.6 * Math.sin(frame * 0.07);
  const subtitleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Left side — human */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 640,
          bottom: 0,
          opacity: fadeIn,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 50%, rgba(0,100,200,0.15) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: '0.25em' }}>HUMAN</div>
        {/* Human eye */}
        <svg viewBox="0 0 640 720" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Eyelid shape */}
          <path
            d="M60 360 Q320 180 580 360 Q320 540 60 360 Z"
            fill="rgba(0,60,120,0.4)"
            stroke={BLUE}
            strokeWidth="2"
          />
          {/* Iris */}
          <circle cx="320" cy="360" r="110" fill="none" stroke={BLUE} strokeWidth="2" opacity={0.6} />
          <circle cx="320" cy="360" r="90" fill="rgba(0,80,180,0.3)" />
          {/* Iris detail rings */}
          {[70, 50, 30].map((r, i) => (
            <circle key={i} cx="320" cy="360" r={r} fill="none" stroke={BLUE} strokeWidth="0.8" opacity={0.3 + i * 0.1} />
          ))}
          {/* Iris lines */}
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={320 + Math.cos(a) * 30}
                y1={360 + Math.sin(a) * 30}
                x2={320 + Math.cos(a) * 88}
                y2={360 + Math.sin(a) * 88}
                stroke={BLUE}
                strokeWidth="0.8"
                opacity={0.25}
              />
            );
          })}
          {/* Pupil */}
          <circle cx="320" cy="360" r={22 + 3 * pulse} fill="#000510" />
          <circle cx="320" cy="360" r={18 + 2 * pulse} fill="rgba(0,20,80,0.9)" />
          {/* Catchlight */}
          <circle cx="308" cy="348" r="8" fill="rgba(255,255,255,0.15)" />
          <circle cx="332" cy="372" r="4" fill="rgba(255,255,255,0.08)" />
          {/* Eyelashes */}
          {Array.from({ length: 10 }, (_, i) => {
            const t = (i / 9);
            const x = 60 + t * 520;
            const curveY = 360 - Math.sqrt(Math.max(0, 260 ** 2 - (x - 320) ** 2)) * 0.67;
            const angle = Math.atan2(x - 320, curveY - 360) * (180 / Math.PI);
            return (
              <line
                key={i}
                x1={x}
                y1={curveY}
                x2={x - 4 * Math.sin((angle * Math.PI) / 180)}
                y2={curveY - 14}
                stroke={BLUE}
                strokeWidth="1.5"
                opacity={0.4}
              />
            );
          })}
        </svg>
        <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', color: BLUE, fontSize: 14, letterSpacing: '0.15em', opacity: 0.7 }}>
          INTUITION · EMPATHY · CREATIVITY
        </div>
      </div>

      {/* Right side — robot */}
      <div
        style={{
          position: 'absolute',
          left: 640,
          top: 0,
          width: 640,
          bottom: 0,
          opacity: fadeIn,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(0,160,100,0.12) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: '0.25em' }}>AI SYSTEM</div>
        {/* Robot eye */}
        <svg viewBox="0 0 640 720" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Hexagonal frame */}
          {(() => {
            const cx = 320, cy = 360, r = 150;
            const pts = Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
              return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
            }).join(' ');
            return <polygon points={pts} fill="rgba(0,30,20,0.4)" stroke={GREEN} strokeWidth="2" opacity={0.7} />;
          })()}
          {/* Inner hexagons */}
          {[100, 70].map((r, idx) => {
            const cx = 320, cy = 360;
            const pts = Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
              return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
            }).join(' ');
            return <polygon key={idx} points={pts} fill="none" stroke={GREEN} strokeWidth="1" opacity={0.4 - idx * 0.1} />;
          })}
          {/* Circuit lines */}
          {[
            [320, 210, 320, 250], [470, 360, 420, 360], [170, 360, 220, 360],
            [320, 510, 320, 470], [420, 260, 390, 300], [220, 260, 250, 300],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GREEN} strokeWidth="1.5" opacity={circuitPulse * 0.5} strokeDasharray="4 4" />
          ))}
          {/* Scanning rings */}
          {[40, 60, 80].map((r, i) => (
            <circle
              key={i}
              cx="320"
              cy="360"
              r={r}
              fill="none"
              stroke={GREEN}
              strokeWidth="1"
              opacity={(0.3 + 0.3 * Math.sin(frame * 0.1 + i * 1.2)) * circuitPulse}
            />
          ))}
          {/* Core */}
          <circle cx="320" cy="360" r={20 + 4 * circuitPulse} fill={GREEN} opacity={0.8 * circuitPulse} />
          <circle cx="320" cy="360" r={10} fill="#000" />
          <circle cx="320" cy="360" r={4} fill={GREEN} opacity={circuitPulse} />
          {/* Circuit nodes */}
          {[[320, 250], [420, 360], [220, 360], [320, 470], [390, 300], [250, 300]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={5} fill={GREEN} opacity={0.4 + 0.4 * Math.sin(frame * 0.08 + i)} />
          ))}
          {/* Scan line */}
          <line
            x1="170"
            y1={360 + 80 * Math.sin(frame * 0.08)}
            x2="470"
            y2={360 + 80 * Math.sin(frame * 0.08)}
            stroke={GREEN}
            strokeWidth="1"
            opacity={0.3 * circuitPulse}
          />
        </svg>
        <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', color: GREEN, fontSize: 14, letterSpacing: '0.15em', opacity: 0.7 }}>
          SPEED · PRECISION · SCALE
        </div>
      </div>

      {/* Center divider — merges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 638,
          width: 4,
          bottom: 0,
          background: `linear-gradient(180deg, transparent 10%, ${BLUE} 40%, ${GREEN} 60%, transparent 90%)`,
          opacity: (1 - mergeProgress * 0.7) * fadeIn,
          boxShadow: `0 0 20px ${BLUE}, 0 0 20px ${GREEN}`,
        }}
      />

      {/* Merge glow overlay */}
      {mergeProgress > 0 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 400 * mergeProgress,
            height: 400 * mergeProgress,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,255,136,0.1) 50%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', opacity: subtitleOpacity }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.7)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, fontStyle: 'italic' }}>
            "The future will not belong to humans or machines alone…"
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
