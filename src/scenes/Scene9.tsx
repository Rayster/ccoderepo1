import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { NetworkBg } from '../components/NetworkBg';
import { BLUE, GREEN } from '../utils/colors';

const CTA_LINES = [
  { text: 'LEARN AI.', delay: 8, color: BLUE },
  { text: 'WORK SMARTER.', delay: 20, color: GREEN },
  { text: 'STAY FUTURE-READY.', delay: 32, color: '#ffffff' },
];

export const Scene9 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const glowIntensity = interpolate(frame, [0, 40], [0.3, 1], { extrapolateRight: 'clamp' });
  const pulse = 0.6 + 0.4 * Math.sin(frame * 0.08);
  const imgScale = interpolate(frame, [0, 60], [1.06, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo — team walking with robot */}
      <Img
        src={staticFile('28.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${imgScale})`,
          transformOrigin: 'center bottom',
        }}
      />

      {/* Dark cinematic overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.52)' }} />
      {/* Bottom gradient — strong for CTA text */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 25%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.97) 100%)' }} />
      {/* Top gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 25%)' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

      {/* Animated network overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.25 * fadeIn }}>
        <NetworkBg opacity={0.8} color={BLUE} />
      </div>

      {/* Central glow emanating from the photo */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
        width: 500 * glowIntensity,
        height: 300 * glowIntensity,
        borderRadius: '50%',
        background: `radial-gradient(ellipse, rgba(0,212,255,0.1) 0%, rgba(0,255,136,0.05) 50%, transparent 70%)`,
        pointerEvents: 'none',
        opacity: pulse,
      }} />

      {/* Top label */}
      <div style={{
        position: 'absolute',
        top: 36,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: fadeIn,
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(0,0,0,0.65)',
          border: `1px solid ${BLUE}55`,
          borderRadius: 4,
          padding: '7px 22px',
        }}>
          <span style={{ color: BLUE, fontSize: 12, letterSpacing: '0.22em' }}>THE FUTURE BELONGS TO</span>
        </div>
      </div>

      {/* CTA Lines */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}>
        {CTA_LINES.map(({ text, delay, color }) => {
          const lineOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateRight: 'clamp' });
          const lineScale = interpolate(frame, [delay, delay + 12], [0.88, 1], { extrapolateRight: 'clamp' });
          return (
            <div
              key={text}
              style={{
                opacity: lineOpacity,
                transform: `scale(${lineScale})`,
                color,
                fontSize: text === 'STAY FUTURE-READY.' ? 52 : 42,
                fontWeight: 900,
                letterSpacing: '0.08em',
                textShadow: `0 0 24px ${color}88, 0 0 48px ${color}44, 0 4px 20px rgba(0,0,0,0.9)`,
                lineHeight: 1.2,
              }}
            >
              {text}
            </div>
          );
        })}
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }) }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.8)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, fontStyle: 'italic' }}>
            "It will belong to people who know how to work with AI."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
