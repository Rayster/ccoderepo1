import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { GlitchText } from '../components/GlitchText';
import { BG, BLUE, GREEN } from '../utils/colors';

const CHAT_MESSAGES = [
  { role: 'user', text: 'Write a poem about the future', delay: 8 },
  { role: 'ai', text: 'In circuits deep and data streams,\nThe future blooms like silicon dreams...', delay: 18 },
  { role: 'user', text: 'Generate an image of a city', delay: 35 },
  { role: 'ai', text: '[Image generated in 0.3s] ████████████', delay: 45 },
];

export const Scene3 = () => {
  const frame = useCurrentFrame();

  const flashOpacity = interpolate(frame, [0, 6, 14], [1, 1, 0], { extrapolateRight: 'clamp' });
  const contentOpacity = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const headingOpacity = interpolate(frame, [30, 46], [0, 1], { extrapolateRight: 'clamp' });
  const headingScale = interpolate(frame, [30, 46], [1.15, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden', fontFamily: 'Courier New, monospace' }}>
      {/* Screen flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'white',
          opacity: flashOpacity,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />

      {/* Scan lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,212,255,0.03) 0px, rgba(0,212,255,0.03) 1px, transparent 1px, transparent 4px)',
          pointerEvents: 'none',
          opacity: contentOpacity,
        }}
      />

      {/* AI Interface mockup */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 60,
          width: 580,
          bottom: 100,
          opacity: contentOpacity,
          border: `1px solid ${BLUE}88`,
          borderRadius: 6,
          background: 'rgba(0,10,30,0.85)',
          overflow: 'hidden',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            background: `${BLUE}22`,
            borderBottom: `1px solid ${BLUE}55`,
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {[BLUE, GREEN, '#ff6b35'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
          <span style={{ color: BLUE, fontSize: 12, marginLeft: 8, opacity: 0.8 }}>AI ASSISTANT v4.0 — ACTIVE</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
            {[1, 0.7, 0.4].map((o, i) => (
              <div key={i} style={{ width: 4, height: 12 + i * 4, background: GREEN, opacity: o * (0.5 + 0.5 * Math.sin(frame * 0.15 + i)) }} />
            ))}
          </div>
        </div>

        {/* Chat messages */}
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CHAT_MESSAGES.map((msg, i) => {
            const msgOpacity = interpolate(frame, [msg.delay, msg.delay + 10], [0, 1], { extrapolateRight: 'clamp' });
            const isAI = msg.role === 'ai';
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isAI ? 'flex-start' : 'flex-end',
                  opacity: msgOpacity,
                }}
              >
                <div
                  style={{
                    background: isAI ? `${BLUE}22` : `${GREEN}22`,
                    border: `1px solid ${isAI ? BLUE : GREEN}55`,
                    borderRadius: isAI ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
                    padding: '8px 14px',
                    maxWidth: '85%',
                    color: isAI ? BLUE : GREEN,
                    fontSize: 13,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                    boxShadow: `0 0 12px ${isAI ? BLUE : GREEN}22`,
                  }}
                >
                  {msg.text}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
                  {isAI ? 'AI' : 'USER'} · {(msg.delay / 30).toFixed(1)}s
                </div>
              </div>
            );
          })}
          {/* Typing indicator */}
          {frame > 52 && frame < 85 && (
            <div style={{ display: 'flex', gap: 4, padding: '8px 14px' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: BLUE,
                    opacity: 0.4 + 0.6 * Math.sin(frame * 0.3 + i * 1.2),
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side panel */}
      <div
        style={{
          position: 'absolute',
          left: 680,
          top: 60,
          right: 60,
          bottom: 100,
          opacity: contentOpacity,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Stats */}
        {[
          { label: 'RESPONSE TIME', value: '0.3s', bar: 0.95 },
          { label: 'ACCURACY', value: '97.4%', bar: 0.97 },
          { label: 'TASKS/SEC', value: '4,200', bar: 0.85 },
          { label: 'MODELS ACTIVE', value: '12', bar: 0.6 },
        ].map(({ label, value, bar }, i) => (
          <div
            key={label}
            style={{
              border: `1px solid ${BLUE}44`,
              borderRadius: 4,
              padding: '12px 14px',
              background: 'rgba(0,10,30,0.7)',
              opacity: interpolate(frame, [15 + i * 6, 28 + i * 6], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.15em', marginBottom: 6 }}>{label}</div>
            <div style={{ color: GREEN, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{value}</div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <div
                style={{
                  height: '100%',
                  width: `${bar * interpolate(frame, [20 + i * 6, 40 + i * 6], [0, 100], { extrapolateRight: 'clamp' })}%`,
                  background: `linear-gradient(90deg, ${BLUE}, ${GREEN})`,
                  borderRadius: 2,
                  boxShadow: `0 0 6px ${BLUE}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* "It's already here" heading */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: headingOpacity,
          transform: `scale(${headingScale})`,
        }}
      >
        <GlitchText text="IT'S ALREADY HERE." fontSize={58} color="#ffffff" accentColor={BLUE} />
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: subtitleOpacity,
        }}
      >
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.6)', padding: '8px 28px', borderRadius: 4, border: '1px solid rgba(0,212,255,0.2)' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, fontStyle: 'italic' }}>
            "But today, AI is no longer coming."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
