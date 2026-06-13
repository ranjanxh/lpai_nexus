import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, MapPin } from 'lucide-react';
import { icpList, securityAlerts } from '../../data/mockData.js';

const moduleLabels = {
  overview:     'Command Center',
  cargo:        'Cargo Clearance',
  immigration:  'People Movement',
  surveillance: 'Security & Cameras',
  vehicle:      'Vehicle Gate',
  analytics:    'Intelligence Report',
};

export default function TopBar({ icp, setIcp, active }) {
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const selected = icpList.find(i => i.id === icp) || icpList[0];
  const critical = securityAlerts.filter(a => a.severity === 'CRITICAL').length;
  const total = securityAlerts.length;
  const hh = time.getHours().toString().padStart(2, '0');
  const mm = time.getMinutes().toString().padStart(2, '0');
  const ss = time.getSeconds().toString().padStart(2, '0');

  return (
    <header className="flex items-center justify-between px-7 flex-shrink-0 relative z-20" style={{
      height: '56px',
      background: 'rgba(5,8,16,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>

      {/* Left: breadcrumb */}
      <div className="flex items-center gap-2">
        <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.28)', letterSpacing: '0.04em' }}>LPAI Nexus</span>
        <span style={{ color: 'rgba(232,240,255,0.12)' }}>/</span>
        <span className="font-medium" style={{ fontSize: '13px', color: '#E8F0FF' }}>{moduleLabels[active] || 'Command Center'}</span>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-4">

        {/* ICP selector */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => setOpen(p => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(232,240,255,0.7)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(34,211,238,0.06)';
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.22)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <MapPin size={11} style={{ color: '#22D3EE' }} />
            {selected.name}
            <ChevronDown size={11} style={{ color: 'rgba(232,240,255,0.3)' }} />
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-50 shadow-2xl" style={{
              background: 'rgba(13,22,38,0.97)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div className="p-2">
                {icpList.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setIcp(item.id); setOpen(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all"
                    style={{
                      color: item.id === icp ? '#22D3EE' : 'rgba(232,240,255,0.6)',
                      background: item.id === icp ? 'rgba(34,211,238,0.07)' : 'transparent',
                    }}
                    onMouseEnter={e => { if (item.id !== icp) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={e => { if (item.id !== icp) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span style={{ color: 'rgba(232,240,255,0.25)' }}>{item.state}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Alert button */}
        <button className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all" style={{
          background: total > 0 ? 'rgba(244,63,94,0.08)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${total > 0 ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.07)'}`,
          color: total > 0 ? '#F87171' : 'rgba(232,240,255,0.4)',
        }}>
          <Bell size={12} />
          {total > 0 && <span className="font-semibold">{total}</span>}
          {critical > 0 && <span className="w-1.5 h-1.5 rounded-full blink" style={{ background: '#EF4444' }} />}
        </button>

        {/* Clock */}
        <span className="font-mono text-xs" style={{ color: 'rgba(232,240,255,0.28)', letterSpacing: '0.05em' }}>
          {hh}:{mm}<span style={{ color: 'rgba(232,240,255,0.13)' }}>:{ss}</span>{' '}
          <span style={{ fontSize: '9px' }}>IST</span>
        </span>
      </div>
    </header>
  );
}
