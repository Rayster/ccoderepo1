import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { CodeRain } from '../components/CodeRain';
import { BlueprintGrid } from '../components/BlueprintGrid';
import { RobotSVG } from '../components/RobotSVG';
import { BG, BLUE } from '../utils/colors';

export const Scene1 = () => {
  const frame = useCurrentFrame();

  const subtitleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const headingOpacity = interpolate(frame, [28, 45], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [28, 45], [20, 0], { extrapolateRight: 'clamp' });
  const robotOpacity = interpolate(frame, [5, 30], [0, 0.45], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      <CodeRain opacity={0.2} color="#00ff88" />
      <BlueprintGrid opacity={0.12} />

      {/* Old computer glow */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 120,
          width: 260,
          height: 180,
          border: `1px solid ${BLUE}55`,
          borderRadius: 4,
          background: 'rgba(0,212,255,0.04)',
          boxShadow: `0 0 30px rgba(0,212,255,0.1)`,
        }}
      >
        <div style={{ padding: 12, fontSize: 11, color: '#00ff8877', lineHeight: 1.6 }}>
          {['> INITIALIZING AI_CORE...', '> LOAD neural_v0.1', '> STATUS: THEORETICAL', '> YEAR: 1956', '> MODE: RESEARCH ONLY', '> _'].map((line, i) => (
            <div key={i} style={{ opacity: frame > i * 5 + 10 ? 1 : 0 }}>{line}</div>
          ))}
        </div>
      </div>

      {/* Robot silhouette left side */}
      <div style={{ position: 'absolute', left: 380, top: 200, opacity: robotOpacity }}>
        <RobotSVG scale={1.4} color={BLUE} opacity={1} glowIntensity={0.4} />
      </div>

      {/* Blueprint sketch robot right side */}
      <div style={{ position: 'absolute', right: 100, top: 160, opacity: robotOpacity * 0.6 }}>
        <RobotSVG scale={1.1} color="#00ff88" opacity={1} glowIntensity={0.3} />
      </div>

      {/* Subtitle voiceover */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: subtitleOpacity,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(0,0,0,0.6)',
            padding: '10px 30px',
            borderRadius: 4,
            border: '1px solid rgba(0,212,255,0.2)',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 20, fontStyle: 'italic' }}>
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
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: BLUE,
            textShadow: `0 0 30px ${BLUE}, 0 0 60px ${BLUE}66`,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          AI WAS ONCE
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: 4,
          }}
        >
          SCIENCE FICTION
        </div>
      </div>
    </AbsoluteFill>
  );
};
