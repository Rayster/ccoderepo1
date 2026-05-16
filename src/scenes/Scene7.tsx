import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BLUE, GREEN } from '../utils/colors';

export const Scene7 = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const arrowProgress = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: 'clamp' });
  const imgScale = interpolate(frame, [0, 120], [1, 1.06], { extrapolateRight: 'clamp' });
  const imgX = interpolate(frame, [0, 120], [0, -20], { extrapolateRight: 'clamp' });

  const IMPACTS = [
    { label: 'HOW WE WORK', sub: 'Daily tasks & processes', color: BLUE, delay: 0 },
    { label: 'SKILLS THAT MATTER', sub: 'AI literacy is essential', color: '#a855f7', delay: 16 },
    { label: 'SPEED OF CHANGE', sub: 'Faster than ever before', color: GREEN, delay: 32 },
    { label: 'BUSINESS ADAPTATION', sub: 'Adapt or fall behind', color: '#f97316', delay: 48 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo */}
      <Img
        src={staticFile('21.jpg')}
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
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.98) 100%)' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 36, left: 0, right: 0, textAlign: 'center', opacity: fadeIn }}>
        <div style={{ fontSize: 12, color: BLUE, letterSpacing: '0.25em', marginBottom: 6 }}>IMPACT ANALYSIS</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: '0.04em', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
          IT CHANGES HOW WE WORK, WHAT SKILLS MATTER, AND HOW FAST COMPANIES MUST ADAPT.
        </div>
      </div>

      {/* 4 impact cards */}
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, display: 'flex', gap: 16 }}>
        {IMPACTS.map(({ label, sub, color, delay }) => {
          const op = interpolate(frame, [delay, delay + 16], [0, 1], { extrapolateRight: 'clamp' });
          const y = interpolate(frame, [delay, delay + 16], [20, 0], { extrapolateRight: 'clamp' });
          return (
            <div key={label} style={{
              flex: 1,
              border: `1px solid ${color}77`,
              borderRadius: 6,
              background: 'rgba(0,0,0,0.72)',
              padding: '18px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              opacity: op,
              transform: `translateY(${y}px)`,
              boxShadow: `0 0 24px ${color}1a`,
              textAlign: 'center',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: color, opacity: 0.7 }} />
              </div>
              <div style={{ color, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}>{label}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>{sub}</div>
            </div>
          );
        })}
      </div>

      {/* Workflow transition */}
      <div style={{
        position: 'absolute',
        bottom: 68,
        left: 50,
        right: 50,
        opacity: interpolate(frame, [55, 70], [0, 1], { extrapolateRight: 'clamp' }),
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}>
        {/* Before */}
        <div style={{ flex: 1, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '12px 16px', background: 'rgba(0,0,0,0.75)' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', marginBottom: 8 }}>BEFORE</div>
          {['Manual processes', 'Human-only review', 'Slow iteration cycles'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 5, height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, textDecoration: 'line-through' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div style={{ width: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <svg viewBox="0 0 70 24" width="70" height="24">
            <line x1="0" y1="12" x2={70 * arrowProgress} y2="12" stroke={BLUE} strokeWidth="2" />
            {arrowProgress > 0.9 && <polygon points={`${70 * arrowProgress - 8},6 ${70 * arrowProgress},12 ${70 * arrowProgress - 8},18`} fill={BLUE} />}
          </svg>
          <div style={{ fontSize: 9, color: BLUE, letterSpacing: '0.1em' }}>AI-SHIFT</div>
        </div>

        {/* After */}
        <div style={{ flex: 1, border: `1px solid ${BLUE}55`, borderRadius: 6, padding: '12px 16px', background: 'rgba(0,0,0,0.75)', boxShadow: `0 0 18px ${BLUE}11` }}>
          <div style={{ fontSize: 11, color: BLUE, letterSpacing: '0.2em', marginBottom: 8 }}>AFTER</div>
          {[
            { text: 'AI-assisted workflows', c: GREEN },
            { text: 'Real-time AI insights', c: GREEN },
            { text: 'Rapid AI iteration', c: GREEN },
          ].map(({ text, c }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, opacity: arrowProgress }}>
              <div style={{ width: 5, height: 5, background: c, borderRadius: '50%', boxShadow: `0 0 4px ${c}` }} />
              <span style={{ color: c, fontSize: 12 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.78)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 17, fontStyle: 'italic' }}>
            "It changes how we work, what skills matter, and how fast companies must adapt."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
