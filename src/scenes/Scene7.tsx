import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BG, BLUE, GREEN } from '../utils/colors';

const ICONS = [
  {
    label: 'HOW WE WORK',
    color: BLUE,
    delay: 0,
    svgPath: (c: string) => (
      <svg viewBox="0 0 60 60" width="48" height="48">
        <rect x="8" y="14" width="44" height="32" rx="3" fill="none" stroke={c} strokeWidth="2" />
        <line x1="8" y1="22" x2="52" y2="22" stroke={c} strokeWidth="1.5" />
        <rect x="14" y="28" width="12" height="12" rx="1" fill={c} opacity={0.3} stroke={c} strokeWidth="1" />
        <rect x="32" y="28" width="14" height="6" rx="1" fill={c} opacity={0.2} />
        <rect x="32" y="36" width="10" height="4" rx="1" fill={c} opacity={0.15} />
        <line x1="24" y1="46" x2="36" y2="46" stroke={c} strokeWidth="2" strokeLinecap="round" />
        <rect x="28" y="46" width="4" height="6" fill={c} opacity={0.5} />
      </svg>
    ),
  },
  {
    label: 'SKILLS THAT MATTER',
    color: '#a855f7',
    delay: 16,
    svgPath: (c: string) => (
      <svg viewBox="0 0 60 60" width="48" height="48">
        <circle cx="30" cy="24" r="14" fill="none" stroke={c} strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
          return <line key={i} x1="30" y1="24" x2={30 + Math.cos(a) * 14} y2={24 + Math.sin(a) * 14} stroke={c} strokeWidth="1" opacity={0.5} />;
        })}
        <circle cx="30" cy="24" r="5" fill={c} opacity={0.4} />
        <circle cx="30" cy="24" r="2" fill={c} />
        <line x1="20" y1="44" x2="40" y2="44" stroke={c} strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="50" x2="36" y2="50" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
      </svg>
    ),
  },
  {
    label: 'SPEED OF CHANGE',
    color: GREEN,
    delay: 32,
    svgPath: (c: string) => (
      <svg viewBox="0 0 60 60" width="48" height="48">
        <path d="M10 44 L22 26 L34 34 L46 10" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="46" cy="10" r="4" fill={c} />
        <line x1="10" y1="50" x2="52" y2="50" stroke={c} strokeWidth="1.5" opacity={0.4} />
        <line x1="10" y1="10" x2="10" y2="50" stroke={c} strokeWidth="1.5" opacity={0.4} />
      </svg>
    ),
  },
  {
    label: 'BUSINESS ADAPTATION',
    color: '#f97316',
    delay: 48,
    svgPath: (c: string) => (
      <svg viewBox="0 0 60 60" width="48" height="48">
        <rect x="12" y="20" width="16" height="28" rx="2" fill="none" stroke={c} strokeWidth="1.5" />
        <rect x="32" y="12" width="16" height="36" rx="2" fill="none" stroke={c} strokeWidth="1.5" />
        <rect x="12" y="20" width="16" height="28" rx="2" fill={c} opacity={0.12} />
        <rect x="32" y="12" width="16" height="36" rx="2" fill={c} opacity={0.2} />
        <line x1="8" y1="50" x2="52" y2="50" stroke={c} strokeWidth="2" opacity={0.5} />
      </svg>
    ),
  },
];

export const Scene7 = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  const arrowProgress = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center', opacity: fadeIn }}>
        <div style={{ fontSize: 12, color: BLUE, letterSpacing: '0.25em', marginBottom: 4 }}>IMPACT ANALYSIS</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>
          IT CHANGES HOW WE WORK, WHAT SKILLS MATTER, AND HOW FAST COMPANIES MUST ADAPT.
        </div>
      </div>

      {/* 4 icon cards */}
      <div style={{
        position: 'absolute',
        top: 120,
        left: 40,
        right: 40,
        display: 'flex',
        gap: 20,
      }}>
        {ICONS.map((icon) => {
          const cardOpacity = interpolate(frame, [icon.delay, icon.delay + 16], [0, 1], { extrapolateRight: 'clamp' });
          const cardY = interpolate(frame, [icon.delay, icon.delay + 16], [20, 0], { extrapolateRight: 'clamp' });
          return (
            <div
              key={icon.label}
              style={{
                flex: 1,
                border: `1px solid ${icon.color}66`,
                borderRadius: 8,
                background: `${icon.color}0a`,
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                boxShadow: `0 0 24px ${icon.color}1a`,
              }}
            >
              {icon.svgPath(icon.color)}
              <div style={{ color: icon.color, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textAlign: 'center' }}>
                {icon.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Workflow transition: Manual → AI-Assisted */}
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: 60,
          right: 60,
          opacity: interpolate(frame, [55, 70], [0, 1], { extrapolateRight: 'clamp' }),
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Manual workflow */}
        <div style={{ flex: 1, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, padding: '14px 18px', background: 'rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', marginBottom: 8 }}>BEFORE</div>
          {['Manual data entry', 'Human review only', 'Slow iteration'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'line-through' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div style={{ width: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <svg viewBox="0 0 80 30" width="80" height="30">
            <line x1="0" y1="15" x2={80 * arrowProgress} y2="15" stroke={BLUE} strokeWidth="2" />
            {arrowProgress > 0.9 && (
              <polygon points={`${80 * arrowProgress - 10},8 ${80 * arrowProgress},15 ${80 * arrowProgress - 10},22`} fill={BLUE} />
            )}
          </svg>
          <div style={{ fontSize: 10, color: BLUE, letterSpacing: '0.1em' }}>AI-SHIFT</div>
        </div>

        {/* AI workflow */}
        <div style={{ flex: 1, border: `1px solid ${BLUE}55`, borderRadius: 6, padding: '14px 18px', background: `${BLUE}08`, boxShadow: `0 0 20px ${BLUE}11` }}>
          <div style={{ fontSize: 11, color: BLUE, letterSpacing: '0.2em', marginBottom: 8 }}>AFTER</div>
          {[
            { text: 'AI-assisted workflows', c: GREEN },
            { text: 'Real-time AI insights', c: GREEN },
            { text: 'Rapid AI iteration', c: GREEN },
          ].map(({ text, c }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, opacity: arrowProgress }}>
              <div style={{ width: 6, height: 6, background: c, borderRadius: '50%', boxShadow: `0 0 4px ${c}` }} />
              <span style={{ color: c, fontSize: 13 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.6)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, fontStyle: 'italic' }}>
            "It changes how we work, what skills matter, and how fast companies must adapt."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
