export default function KPICard({ label, value, sub, change, color = 'white', pulse = false }) {
  const colorMap = {
    white:  { hex: '#E8F0FF',  glow: 'rgba(232,240,255,0.08)',  glowStrong: 'rgba(232,240,255,0.12)' },
    green:  { hex: '#10B981',  glow: 'rgba(16,185,129,0.1)',    glowStrong: 'rgba(16,185,129,0.16)'  },
    red:    { hex: '#F43F5E',  glow: 'rgba(244,63,94,0.1)',     glowStrong: 'rgba(244,63,94,0.16)'   },
    yellow: { hex: '#F59E0B',  glow: 'rgba(245,158,11,0.1)',    glowStrong: 'rgba(245,158,11,0.16)'  },
    blue:   { hex: '#60A5FA',  glow: 'rgba(96,165,250,0.1)',    glowStrong: 'rgba(96,165,250,0.16)'  },
    violet: { hex: '#A78BFA',  glow: 'rgba(167,139,250,0.1)',   glowStrong: 'rgba(167,139,250,0.16)' },
    cyan:   { hex: '#22D3EE',  glow: 'rgba(34,211,238,0.1)',    glowStrong: 'rgba(34,211,238,0.16)'  },
  };

  const { hex: c, glow: g, glowStrong: gs } = colorMap[color] || colorMap.white;

  return (
    <div
      className={`glass glass-hover rounded-2xl ${pulse ? 'blink' : ''}`}
      style={{ position: 'relative', overflow: 'hidden', padding: '28px' }}
    >
      {/* Top accent line with glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent 5%, ${c}40 40%, ${c}40 60%, transparent 95%)`,
        pointerEvents: 'none',
      }} />

      {/* Corner radial glow — stronger than before */}
      <div style={{
        position: 'absolute', bottom: '-30px', right: '-30px',
        width: '140px', height: '140px', borderRadius: '50%',
        background: `radial-gradient(circle, ${gs} 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      {/* Label row with colored dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: c, flexShrink: 0 }} />
        <p style={{
          fontSize: '9px', fontWeight: 700, color: 'rgba(232,240,255,0.32)',
          textTransform: 'uppercase', letterSpacing: '0.14em',
        }}>{label}</p>
      </div>

      {/* Value — always near-white for max contrast, with subtle color via drop-shadow */}
      <p style={{
        fontSize: '3.4rem', fontWeight: 600, letterSpacing: '-0.03em',
        color: '#E8F0FF', lineHeight: 1,
        filter: `drop-shadow(0 0 18px ${c}50)`,
      }}>
        {value}
      </p>

      {sub && (
        <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.4)', marginTop: '10px', lineHeight: 1.4 }}>
          {sub}
        </p>
      )}

      {change !== undefined && change !== null && (
        <p style={{ fontSize: '11px', marginTop: '8px', fontWeight: 500,
          color: change >= 0 ? '#10B981' : '#F43F5E' }}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from yesterday
        </p>
      )}
    </div>
  );
}
