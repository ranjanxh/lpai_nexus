import { useState, useEffect, useRef } from 'react';
import { Menu, X, Bell, MapPin, ChevronDown } from 'lucide-react';
import { icpList, securityAlerts } from '../../data/mockData.js';

const nav = [
  { id: 'overview',     label: 'Command' },
  { id: 'cargo',        label: 'Cargo',        badge: '37' },
  { id: 'immigration',  label: 'People',        badge: '12' },
  { id: 'surveillance', label: 'Security',      badge: '6'  },
  { id: 'vehicle',      label: 'Vehicles' },
  { id: 'analytics',    label: 'Intelligence' },
];

export default function TopNav({ active, setActive, icp, setIcp }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [icpOpen, setIcpOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const icpRef = useRef(null);

  const selected = icpList.find(i => i.id === icp) || icpList[0];
  const critical = securityAlerts.filter(a => a.severity === 'CRITICAL').length;
  const totalAlerts = securityAlerts.length;

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!icpOpen) return;
    const handler = (e) => {
      if (icpRef.current && !icpRef.current.contains(e.target)) setIcpOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [icpOpen]);

  const pad = n => n.toString().padStart(2, '0');
  const hh = pad(time.getHours());
  const mm = pad(time.getMinutes());
  const ss = pad(time.getSeconds());

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pb-2">
      <div className="max-w-7xl mx-auto">

        {/* Main bar */}
        <div
          data-tour="nav-bar"
          className="flex items-center justify-between px-4 py-2.5 rounded-2xl"
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 2px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04) inset',
          }}
        >

          {/* ── Logo ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'white' }} />
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                LPAI Nexus
              </p>
              <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>
                Border Command Platform
              </p>
            </div>
          </div>

          {/* ── Pill nav (desktop) ── */}
          <div
            className="hidden lg:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.025)',
            }}
          >
            {nav.map(({ id, label, badge }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.13)' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.52)',
                    fontSize: '13px',
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: '-0.01em',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.52)'; }}
                >
                  {label}
                  {badge && (
                    <span style={{
                      fontSize: '9px', fontWeight: 700,
                      padding: '1px 5px', borderRadius: '4px',
                      background: 'rgba(244,63,94,0.18)',
                      color: '#F87171',
                      border: '1px solid rgba(244,63,94,0.25)',
                    }}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Right controls (desktop) ── */}
          <div className="hidden lg:flex items-center gap-3">

            {/* ICP selector */}
            <div className="relative" ref={icpRef}>
              <button
                data-tour="icp-selector"
                onClick={() => setIcpOpen(p => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(34,211,238,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(34,211,238,0.22)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <MapPin size={11} style={{ color: '#22D3EE' }} />
                <span>{selected.name}</span>
                <ChevronDown
                  size={11}
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    transform: icpOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {icpOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50 shadow-2xl"
                  style={{
                    background: 'rgba(6,10,18,0.98)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="p-2">
                    {icpList.map(item => (
                      <button
                        key={item.id}
                        onClick={() => { setIcp(item.id); setIcpOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all"
                        style={{
                          color: item.id === icp ? '#22D3EE' : 'rgba(255,255,255,0.6)',
                          background: item.id === icp ? 'rgba(34,211,238,0.07)' : 'transparent',
                          cursor: 'pointer',
                          border: 'none',
                        }}
                        onMouseEnter={e => { if (item.id !== icp) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { if (item.id !== icp) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span className="font-medium">{item.name}</span>
                        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '10px' }}>{item.state}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Alert bell */}
            <button
              data-tour="alert-bell"
              className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs transition-all"
              style={{
                background: totalAlerts > 0 ? 'rgba(244,63,94,0.08)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${totalAlerts > 0 ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.07)'}`,
                color: totalAlerts > 0 ? '#F87171' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
              }}
            >
              <Bell size={12} />
              {totalAlerts > 0 && <span className="font-semibold">{totalAlerts}</span>}
              {critical > 0 && (
                <span className="w-1.5 h-1.5 rounded-full blink" style={{ background: '#EF4444' }} />
              )}
            </button>

            {/* Live badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(16,185,129,0.07)',
                border: '1px solid rgba(16,185,129,0.18)',
              }}
            >
              <span
                className="live-dot"
                style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', flexShrink: 0 }}
              />
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981', letterSpacing: '0.05em' }}>LIVE</span>
            </div>

            {/* Clock */}
            <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>
              {hh}:{mm}
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>:{ss}</span>
              {' '}<span style={{ fontSize: '9px' }}>IST</span>
            </span>

            {/* User avatar */}
            <div
              style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(139,92,246,0.18))',
                border: '1px solid rgba(34,211,238,0.22)',
                fontSize: '11px', fontWeight: 700, color: '#22D3EE',
              }}
            >SC</div>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        {mobileOpen && (
          <div
            className="lg:hidden mt-2 p-3 rounded-2xl"
            style={{
              background: 'rgba(0,0,0,0.94)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {nav.map(({ id, label, badge }) => (
              <button
                key={id}
                onClick={() => { setActive(id); setMobileOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all"
                style={{
                  color: active === id ? '#fff' : 'rgba(255,255,255,0.55)',
                  background: active === id ? 'rgba(255,255,255,0.07)' : 'transparent',
                  cursor: 'pointer',
                  border: 'none',
                  fontWeight: active === id ? 500 : 400,
                }}
              >
                <span>{label}</span>
                {badge && (
                  <span style={{
                    fontSize: '10px', fontWeight: 700,
                    padding: '1px 6px', borderRadius: '4px',
                    background: 'rgba(244,63,94,0.18)', color: '#F87171',
                    border: '1px solid rgba(244,63,94,0.25)',
                  }}>{badge}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
