import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BLUE, GREEN } from '../utils/colors';

function sr(n: number): number {
  const x = Math.sin(n) * 43758.5453123;
  return x - Math.floor(x);
}

const PANELS = [
  { label: 'WRITE', icon: '✍', color: BLUE, visual: 'text', caption: 'Articles, code, emails' },
  { label: 'DESIGN', icon: '◈', color: '#a855f7', visual: 'shapes', caption: 'Images, UI, art' },
  { label: 'ANALYZE', icon: '▲', color: GREEN, visual: 'chart', caption: 'Data, patterns, trends' },
  { label: 'SPEAK', icon: '◉', color: '#f97316', visual: 'wave', caption: 'Voice, translation' },
  { label: 'LEARN', icon: '⬡', color: '#22d3ee', visual: 'network', caption: 'Self-improving models' },
  { label: 'DECIDE', icon: '◆', color: '#facc15', visual: 'tree', caption: 'Autonomous decisions' },
];

const PanelVisual = ({ type, color, frame }: { type: string; color: string; frame: number }) => {
  if (type === 'text') {
    return (
      <div style={{ padding: 6 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} style={{ height: 5, background: color, opacity: 0.5 + 0.3 * sr(i * 31 + frame * 0.1), borderRadius: 2, marginBottom: 6, width: `${50 + sr(i * 47) * 40}%` }} />
        ))}
      </div>
    );
  }
  if (type === 'chart') {
    const bars = [0.4, 0.7, 0.55, 0.9, 0.65, 0.8, 0.95];
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56, padding: '0 6px' }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h * 100}%`, background: color, opacity: 0.6 + 0.2 * Math.sin(frame * 0.12 + i), borderRadius: '2px 2px 0 0', boxShadow: `0 0 6px ${color}88` }} />
        ))}
      </div>
    );
  }
  if (type === 'wave') {
    const pts = Array.from({ length: 40 }, (_, i) => ({ x: (i / 39) * 160, y: 28 + Math.sin((i / 39) * Math.PI * 5 + frame * 0.2) * 18 * Math.sin((i / 39) * Math.PI) }));
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    return (
      <svg viewBox="0 0 160 56" style={{ width: '100%', height: 56 }}>
        <path d={d} fill="none" stroke={color} strokeWidth="2" opacity={0.8} />
        <path d={d} fill="none" stroke={color} strokeWidth="6" opacity={0.15} />
      </svg>
    );
  }
  if (type === 'shapes') {
    return (
      <svg viewBox="0 0 160 56" style={{ width: '100%', height: 56 }}>
        <circle cx="30" cy="28" r={14 + 3 * Math.sin(frame * 0.1)} fill={color} opacity={0.3} stroke={color} strokeWidth="1" />
        <rect x="60" y="14" width="28" height="28" rx="4" fill={color} opacity={0.2} stroke={color} strokeWidth="1" transform={`rotate(${frame * 0.5}, 74, 28)`} />
        <polygon points={`${120},${12} ${136},${40} ${104},${40}`} fill={color} opacity={0.25} stroke={color} strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'network') {
    const nodes = [[20, 28], [70, 14], [70, 42], [120, 28], [145, 14], [145, 42]];
    const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]];
    return (
      <svg viewBox="0 0 160 56" style={{ width: '100%', height: 56 }}>
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={color} strokeWidth="1" opacity={0.4 + 0.3 * Math.sin(frame * 0.1 + i)} />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill={color} opacity={0.6 + 0.3 * Math.sin(frame * 0.12 + i * 0.8)} />
        ))}
      </svg>
    );
  }
  if (type === 'tree') {
    return (
      <svg viewBox="0 0 160 56" style={{ width: '100%', height: 56 }}>
        <line x1="80" y1="8" x2="40" y2="30" stroke={color} strokeWidth="1" opacity={0.5} />
        <line x1="80" y1="8" x2="120" y2="30" stroke={color} strokeWidth="1" opacity={0.5} />
        <line x1="40" y1="30" x2="20" y2="50" stroke={color} strokeWidth="1" opacity={0.4} />
        <line x1="40" y1="30" x2="60" y2="50" stroke={color} strokeWidth="1" opacity={0.4} />
        <line x1="120" y1="30" x2="100" y2="50" stroke={color} strokeWidth="1" opacity={0.4} />
        <line x1="120" y1="30" x2="140" y2="50" stroke={color} strokeWidth="1" opacity={0.4} />
        {[[80, 8], [40, 30], [120, 30], [20, 50], [60, 50], [100, 50], [140, 50]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill={color} opacity={0.7} />
        ))}
      </svg>
    );
  }
  return null;
};

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const imgScale = interpolate(frame, [0, 120], [1.05, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Background photo */}
      <Img
        src={staticFile('9.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${imgScale})`,
          transformOrigin: 'center center',
          opacity: 0.35,
        }}
      />

      {/* Dark overlay — keep grid readable */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.72)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, textAlign: 'center', opacity: fadeIn }}>
        <div style={{ fontSize: 13, color: BLUE, letterSpacing: '0.2em', marginBottom: 4 }}>AI CAPABILITIES</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '0.06em' }}>
          WRITES · DESIGNS · ANALYZES · SPEAKS · LEARNS · DECIDES
        </div>
      </div>

      {/* 3×2 grid */}
      <div style={{ position: 'absolute', top: 100, left: 40, right: 40, bottom: 60, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 16, opacity: fadeIn }}>
        {PANELS.map((panel, i) => {
          const panelDelay = i * 12;
          const panelOpacity = interpolate(frame, [panelDelay, panelDelay + 14], [0, 1], { extrapolateRight: 'clamp' });
          const isActive = frame > panelDelay + 8;
          return (
            <div key={panel.label} style={{ border: `1px solid ${panel.color}${isActive ? 'aa' : '33'}`, borderRadius: 6, background: `rgba(0,0,0,0.7)`, padding: 14, opacity: panelOpacity, boxShadow: isActive ? `0 0 20px ${panel.color}22` : 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18, color: panel.color }}>{panel.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: panel.color, letterSpacing: '0.12em' }}>{panel.label}</span>
                <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: panel.color, opacity: 0.5 + 0.5 * Math.sin(frame * 0.15 + i) }} />
              </div>
              <PanelVisual type={panel.visual} color={panel.color} frame={frame} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{panel.caption}</div>
            </div>
          );
        })}
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.75)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 17, fontStyle: 'italic' }}>
            "It writes, designs, analyzes, speaks, learns, and makes decisions faster than ever before."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
