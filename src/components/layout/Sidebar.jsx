import { LayoutGrid, Package, Users, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const nav = [
  { id: 'overview',     label: 'Command',     icon: LayoutGrid,  badge: null },
  { id: 'cargo',        label: 'Cargo',        icon: Package,     badge: '37' },
  { id: 'immigration',  label: 'People',       icon: Users,       badge: '12' },
  { id: 'surveillance', label: 'Security',     icon: ShieldCheck, badge: '6'  },
  { id: 'vehicle',      label: 'Vehicles',     icon: Truck,       badge: null },
  { id: 'analytics',    label: 'Intelligence', icon: Sparkles,    badge: null },
];

export default function Sidebar({ active, setActive }) {
  return (
    <aside style={{
      width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column',
      position: 'relative', zIndex: 10,
      background: 'rgba(5,8,16,0.98)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
    }}>

      {/* Brand */}
      <div style={{ padding: '24px 20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            background: 'rgba(34,211,238,0.07)',
            border: '1px solid rgba(34,211,238,0.18)',
          }}>
            <span style={{ fontSize: '16px' }}>🇮🇳</span>
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#E8F0FF', letterSpacing: '-0.01em' }}>
              LPAI Nexus
            </p>
            <p style={{ fontSize: '10px', color: 'rgba(232,240,255,0.3)', letterSpacing: '0.03em', marginTop: '1px' }}>
              Port Management Platform
            </p>
          </div>
        </div>
      </div>

      {/* Nav label */}
      <div style={{ padding: '0 20px 8px' }}>
        <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(232,240,255,0.2)',
          textTransform: 'uppercase', letterSpacing: '0.16em' }}>Modules</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {nav.map(({ id, label, icon: Icon, badge }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', borderRadius: '10px', textAlign: 'left',
                position: 'relative', overflow: 'hidden',
                transition: 'background 0.15s, border-color 0.15s',
                background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(34,211,238,0.18)' : '1px solid transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              {/* Active accent bar */}
              {isActive && (
                <span style={{
                  position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                  width: '3px', height: '18px', borderRadius: '0 2px 2px 0',
                  background: 'linear-gradient(180deg, #22D3EE, #67E8F9)',
                  boxShadow: '0 0 8px rgba(34,211,238,0.5)',
                }} />
              )}
              <Icon
                size={14}
                strokeWidth={isActive ? 2.2 : 1.6}
                style={{ color: isActive ? '#22D3EE' : 'rgba(232,240,255,0.32)', flexShrink: 0 }}
              />
              <span style={{
                fontSize: '13px', flex: 1,
                color: isActive ? '#E8F0FF' : 'rgba(232,240,255,0.45)',
                fontWeight: isActive ? 500 : 400,
              }}>
                {label}
              </span>
              {badge && (
                <span style={{
                  fontSize: '10px', fontWeight: 600,
                  padding: '1px 6px', borderRadius: '5px',
                  background: 'rgba(244,63,94,0.14)',
                  color: '#F87171',
                  border: '1px solid rgba(244,63,94,0.22)',
                }}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Axiom AI badge */}
      <div className="axiom-card" style={{ margin: '0 10px 10px', padding: '12px 14px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="axiom-pulse" style={{
              width: '7px', height: '7px', borderRadius: '50%', background: '#8B5CF6',
            }} />
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#A78BFA',
              textTransform: 'uppercase', letterSpacing: '0.12em' }}>Axiom AI</span>
          </div>
          <span className="live-dot" style={{
            display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: '#00D47A',
          }} />
        </div>
        <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.38)', lineHeight: 1.55 }}>
          Intelligence engine active<br />12 models running
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 20px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 700,
            background: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(139,92,246,0.15))',
            border: '1px solid rgba(34,211,238,0.2)', color: '#22D3EE',
          }}>SC</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '11px', fontWeight: 500, color: '#E8F0FF' }}>Sr. Commander</p>
            <p style={{ fontSize: '10px', color: 'rgba(232,240,255,0.3)', marginTop: '1px' }}>Petrapole ICP</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
