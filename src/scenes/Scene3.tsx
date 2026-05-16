import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { GlitchText } from '../components/GlitchText';
import { BLUE, GREEN } from '../utils/colors';

export const Scene3 = () => {
  const frame = useCurrentFrame();

  const flashOpacity = interpolate(frame, [0, 6, 14], [1, 1, 0], { extrapolateRight: 'clamp' });
  const contentOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: 'clamp' });
  const headingOpacity = interpolate(frame, [30, 46], [0, 1], { extrapolateRight: 'clamp' });
  const headingScale = interpolate(frame, [30, 46], [1.15, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const imgScale = interpolate(frame, [0, 90], [1, 1.08], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo */}
      <Img
        src={staticFile('6.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${imgScale})`,
          transformOrigin: 'center center',
          opacity: contentOpacity,
        }}
      />

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.58)', opacity: contentOpacity }} />
      {/* Right gradient for UI panel */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 40%, rgba(0,0,0,0.8) 100%)', opacity: contentOpacity }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)' }} />

      {/* Screen flash */}
      <div style={{ position: 'absolute', inset: 0, background: 'white', opacity: flashOpacity, pointerEvents: 'none', zIndex: 100 }} />

      {/* Scan lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,212,255,0.025) 0px, rgba(0,212,255,0.025) 1px, transparent 1px, transparent 4px)',
        pointerEvents: 'none',
        opacity: contentOpacity,
      }} />

      {/* Right-side stats panel */}
      <div style={{
        position: 'absolute',
        right: 50,
        top: 60,
        width: 300,
        opacity: contentOpacity,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        <div style={{ color: BLUE, fontSize: 11, letterSpacing: '0.25em', marginBottom: 2 }}>AI SYSTEM STATUS</div>
        {[
          { label: 'RESPONSE TIME', value: '0.3s', bar: 0.95, color: GREEN },
          { label: 'ACCURACY', value: '97.4%', bar: 0.97, color: BLUE },
          { label: 'TASKS/SEC', value: '4,200', bar: 0.85, color: '#a855f7' },
          { label: 'MODELS ONLINE', value: '12', bar: 0.6, color: '#f97316' },
        ].map(({ label, value, bar, color }, i) => (
          <div
            key={label}
            style={{
              border: `1px solid ${color}44`,
              borderRadius: 4,
              padding: '10px 12px',
              background: 'rgba(0,0,0,0.65)',
              opacity: interpolate(frame, [14 + i * 6, 28 + i * 6], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.15em', marginBottom: 4 }}>{label}</div>
            <div style={{ color, fontSize: 20, fontWeight: 700, marginBottom: 5 }}>{value}</div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
              <div style={{
                height: '100%',
                width: `${bar * interpolate(frame, [18 + i * 6, 38 + i * 6], [0, 100], { extrapolateRight: 'clamp' })}%`,
                background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                borderRadius: 2,
                boxShadow: `0 0 6px ${color}`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* "It's already here" heading */}
      <div style={{
        position: 'absolute',
        bottom: 90,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: headingOpacity,
        transform: `scale(${headingScale})`,
      }}>
        <GlitchText text="IT'S ALREADY HERE." fontSize={62} color="#ffffff" accentColor={BLUE} />
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', opacity: subtitleOpacity }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.72)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.22)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, fontStyle: 'italic' }}>
            "But today, AI is no longer coming."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
