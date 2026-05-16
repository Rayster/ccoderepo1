import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BLUE, GREEN } from '../utils/colors';

export const Scene2 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const imgScale = interpolate(frame, [0, 90], [1.05, 1], { extrapolateRight: 'clamp' });
  const imgX = interpolate(frame, [0, 90], [-20, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#070715', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo */}
      <Img
        src={staticFile('3.jpg')}
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,7,21,0.52)' }} />
      {/* Left-side gradient for text */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Labels — top left */}
      <div style={{ position: 'absolute', left: 60, top: 60, opacity: fadeIn, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {['MOVIES', 'RESEARCH LABS', 'PREDICTIONS'].map((label, i) => (
          <div
            key={label}
            style={{
              color: GREEN,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.2em',
              opacity: interpolate(frame, [8 + i * 10, 22 + i * 10], [0, 0.85], { extrapolateRight: 'clamp' }),
              textShadow: `0 0 12px ${GREEN}`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
            {label}
          </div>
        ))}
      </div>

      {/* Corner frame lines — cinematic bracket */}
      {[
        { top: 20, left: 20 }, { top: 20, right: 20 },
        { bottom: 80, left: 20 }, { bottom: 80, right: 20 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...pos,
          width: 40,
          height: 40,
          borderTop: i < 2 ? `2px solid ${BLUE}88` : 'none',
          borderBottom: i >= 2 ? `2px solid ${BLUE}88` : 'none',
          borderLeft: i % 2 === 0 ? `2px solid ${BLUE}88` : 'none',
          borderRight: i % 2 === 1 ? `2px solid ${BLUE}88` : 'none',
          opacity: fadeIn,
        }} />
      ))}

      {/* "Science fiction becoming reality" tag */}
      <div style={{
        position: 'absolute',
        top: 60,
        right: 60,
        opacity: interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' }),
        background: 'rgba(0,0,0,0.65)',
        border: `1px solid ${BLUE}55`,
        padding: '8px 16px',
        borderRadius: 4,
      }}>
        <div style={{ color: BLUE, fontSize: 12, letterSpacing: '0.2em' }}>THEN</div>
        <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>2010 and before</div>
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 26, left: 0, right: 0, textAlign: 'center', opacity: subtitleOpacity }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.72)', padding: '10px 30px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.22)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 20, fontStyle: 'italic' }}>
            "Something we saw in movies, research labs, and futuristic predictions."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
