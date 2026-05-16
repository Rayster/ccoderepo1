import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BlueprintGrid } from '../components/BlueprintGrid';
import { BLUE } from '../utils/colors';

export const Scene1 = () => {
  const frame = useCurrentFrame();

  const subtitleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const headingOpacity = interpolate(frame, [28, 45], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [28, 45], [20, 0], { extrapolateRight: 'clamp' });
  const imgScale = interpolate(frame, [0, 90], [1, 1.06], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo */}
      <Img
        src={staticFile('0.jpg')}
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

      {/* Dark cinematic overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.55)' }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* Blueprint grid overlay */}
      <BlueprintGrid opacity={0.08} />

      {/* Terminal overlay — top left */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 60,
          padding: '12px 16px',
          background: 'rgba(0,0,0,0.6)',
          border: `1px solid ${BLUE}44`,
          borderRadius: 4,
          opacity: interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        {['> YEAR: 1956–2010', '> STATUS: THEORETICAL', '> MODE: RESEARCH ONLY', '> AI: CONCEPT ONLY', '> _'].map((line, i) => (
          <div key={i} style={{
            fontSize: 13,
            color: '#00ff8899',
            lineHeight: 1.8,
            fontFamily: 'Courier New, monospace',
            opacity: frame > i * 6 + 12 ? 1 : 0,
          }}>{line}</div>
        ))}
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', opacity: subtitleOpacity }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.7)', padding: '10px 30px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.25)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 20, fontStyle: 'italic' }}>
            "For decades, artificial intelligence was just an idea…"
          </span>
        </div>
      </div>

      {/* Main heading */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: `translateY(calc(-50% + ${headingY}px))`,
          textAlign: 'center',
          opacity: headingOpacity,
        }}
      >
        <div style={{ fontSize: 58, fontWeight: 900, color: BLUE, textShadow: `0 0 30px ${BLUE}, 0 0 60px ${BLUE}88`, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          AI WAS ONCE
        </div>
        <div style={{ fontSize: 58, fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
          SCIENCE FICTION
        </div>
      </div>
    </AbsoluteFill>
  );
};
