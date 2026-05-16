import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BLUE, GREEN } from '../utils/colors';

export const Scene6 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const headingOpacity = interpolate(frame, [38, 56], [0, 1], { extrapolateRight: 'clamp' });
  const headingScale = interpolate(frame, [38, 56], [0.88, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const imgScale = interpolate(frame, [0, 120], [1.05, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo */}
      <Img
        src={staticFile('17.jpg')}
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

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.55)' }} />
      {/* Bottom gradient for heading */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.95) 100%)' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />

      {/* Top-left tag */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: 50,
        opacity: fadeIn,
        background: 'rgba(0,0,0,0.65)',
        border: `1px solid ${BLUE}55`,
        padding: '8px 18px',
        borderRadius: 4,
      }}>
        <div style={{ color: BLUE, fontSize: 11, letterSpacing: '0.22em' }}>IMPACT REPORT</div>
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>AI Is Reshaping Work</div>
      </div>

      {/* Top-right stat bubbles */}
      <div style={{ position: 'absolute', top: 40, right: 50, display: 'flex', gap: 12, opacity: fadeIn }}>
        {[
          { value: '85%', label: 'Jobs Affected', color: BLUE },
          { value: '3.5×', label: 'Productivity', color: GREEN },
        ].map(({ value, label, color }, i) => (
          <div key={i} style={{
            background: 'rgba(0,0,0,0.7)',
            border: `1px solid ${color}66`,
            borderRadius: 6,
            padding: '10px 16px',
            textAlign: 'center',
            opacity: interpolate(frame, [10 + i * 10, 24 + i * 10], [0, 1], { extrapolateRight: 'clamp' }),
          }}>
            <div style={{ color, fontSize: 24, fontWeight: 900 }}>{value}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '0.1em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Corner brackets */}
      {[
        { top: 18, left: 18 }, { top: 18, right: 18 },
        { bottom: 80, left: 18 }, { bottom: 80, right: 18 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos, width: 36, height: 36,
          borderTop: i < 2 ? `2px solid ${BLUE}77` : 'none',
          borderBottom: i >= 2 ? `2px solid ${BLUE}77` : 'none',
          borderLeft: i % 2 === 0 ? `2px solid ${BLUE}77` : 'none',
          borderRight: i % 2 === 1 ? `2px solid ${BLUE}77` : 'none',
          opacity: fadeIn,
        }} />
      ))}

      {/* Main heading */}
      <div style={{
        position: 'absolute',
        bottom: 85,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: headingOpacity,
        transform: `scale(${headingScale})`,
      }}>
        <div style={{ fontSize: 16, color: BLUE, letterSpacing: '0.25em', marginBottom: 10, textShadow: `0 0 20px ${BLUE}` }}>
          THIS IS NOT JUST A TECHNOLOGY SHIFT
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, color: '#ffffff', letterSpacing: '0.06em', textShadow: `0 0 40px ${BLUE}66, 0 4px 20px rgba(0,0,0,0.9)` }}>
          THIS IS A <span style={{ color: BLUE, textShadow: `0 0 25px ${BLUE}` }}>WORKFORCE</span> SHIFT.
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', opacity: subtitleOpacity }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.75)', padding: '10px 30px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.22)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, fontStyle: 'italic' }}>
            "This is not just a technology shift."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
