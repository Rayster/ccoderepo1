import { useCurrentFrame } from 'remotion';

export const RobotSVG = ({
  x = 0,
  y = 0,
  scale = 1,
  color = '#00d4ff',
  opacity = 0.6,
  glowIntensity = 1,
}: {
  x?: number;
  y?: number;
  scale?: number;
  color?: string;
  opacity?: number;
  glowIntensity?: number;
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.08);
  const eyeGlow = glowIntensity * (0.7 + 0.3 * pulse);

  return (
    <svg
      viewBox="0 0 120 200"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 120 * scale,
        height: 200 * scale,
        opacity,
        filter: `drop-shadow(0 0 ${8 * glowIntensity}px ${color})`,
      }}
    >
      {/* Antenna */}
      <line x1="60" y1="10" x2="60" y2="22" stroke={color} strokeWidth="2" />
      <circle cx="60" cy="8" r="4" fill={color} opacity={eyeGlow} />

      {/* Head */}
      <rect x="30" y="22" width="60" height="50" rx="6" fill="none" stroke={color} strokeWidth="2" />
      <rect x="35" y="27" width="50" height="40" rx="4" fill={color} opacity={0.08} />

      {/* Eyes */}
      <rect x="38" y="34" width="16" height="10" rx="2" fill={color} opacity={eyeGlow} />
      <rect x="66" y="34" width="16" height="10" rx="2" fill={color} opacity={eyeGlow} />

      {/* Mouth */}
      <rect x="42" y="52" width="36" height="4" rx="2" fill={color} opacity={0.5} />

      {/* Neck */}
      <rect x="52" y="72" width="16" height="12" fill={color} opacity={0.4} />

      {/* Body */}
      <rect x="20" y="84" width="80" height="80" rx="4" fill="none" stroke={color} strokeWidth="2" />
      <rect x="24" y="88" width="72" height="72" rx="3" fill={color} opacity={0.06} />

      {/* Chest panel */}
      <rect x="38" y="96" width="44" height="30" rx="2" fill="none" stroke={color} strokeWidth="1" opacity={0.6} />
      <rect x="42" y="100" width="8" height="8" rx="1" fill={color} opacity={0.7} />
      <rect x="56" y="100" width="8" height="8" rx="1" fill={color} opacity={eyeGlow} />
      <rect x="70" y="100" width="8" height="8" rx="1" fill={color} opacity={0.5} />
      <rect x="42" y="114" width="36" height="4" rx="1" fill={color} opacity={0.4} />

      {/* Arms */}
      <rect x="0" y="86" width="18" height="60" rx="4" fill="none" stroke={color} strokeWidth="2" />
      <rect x="102" y="86" width="18" height="60" rx="4" fill="none" stroke={color} strokeWidth="2" />
      <rect x="2" y="144" width="14" height="20" rx="3" fill={color} opacity={0.3} />
      <rect x="104" y="144" width="14" height="20" rx="3" fill={color} opacity={0.3} />

      {/* Legs */}
      <rect x="28" y="164" width="26" height="36" rx="4" fill="none" stroke={color} strokeWidth="2" />
      <rect x="66" y="164" width="26" height="36" rx="4" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
};
