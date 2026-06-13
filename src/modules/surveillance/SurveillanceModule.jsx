import { useState, useEffect, useRef, useCallback } from 'react';
import { X, AlertTriangle, WifiOff, Maximize2 } from 'lucide-react';
import ModuleFooter from '../../components/ui/ModuleFooter.jsx';
import { getICPData } from '../../data/mockData.js';

// ─── Scene Definitions ────────────────────────────────────────────────────────
const SCENES = [
  {
    id: 'cam01',
    label: 'Main Gate — Entry',
    location: 'Gate Alpha',
    status: 'live',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#0a1018';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#111820';
      ctx.fillRect(W * 0.1, 0, W * 0.8, H);
      ctx.strokeStyle = 'rgba(255,235,100,0.15)';
      ctx.setLineDash([H * 0.06, H * 0.04]);
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(W * 0.5, 0); ctx.lineTo(W * 0.5, H); ctx.stroke();
      ctx.setLineDash([]);
      const armOpen = Math.sin(t * 0.0005) > 0;
      ctx.save();
      ctx.translate(W * 0.25, H * 0.45);
      ctx.rotate(armOpen ? -Math.PI / 2.2 : 0);
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(0, -4, W * 0.28, 4);
      ctx.fillStyle = '#EF4444';
      [0.04, 0.1, 0.16, 0.22].forEach(x => { ctx.fillRect(W * x, -4, W * 0.04, 4); });
      ctx.restore();
      ctx.fillStyle = '#1a2535';
      ctx.fillRect(W * 0.55, H * 0.35, W * 0.14, H * 0.4);
      ctx.fillStyle = 'rgba(34,211,238,0.2)';
      ctx.fillRect(W * 0.57, H * 0.38, W * 0.10, H * 0.12);
      const vPhase = (t * 0.00015) % 1;
      const vx = W * 0.12 + W * 0.3 * vPhase;
      ctx.fillStyle = '#1e2e45';
      ctx.fillRect(vx, H * 0.5, W * 0.14, H * 0.1);
      ctx.fillStyle = 'rgba(255,235,100,0.3)';
      ctx.fillRect(vx + W * 0.1, H * 0.52, W * 0.03, H * 0.04);
      const pBob = Math.sin(t * 0.002) * 2;
      ctx.fillStyle = '#8B5CF6';
      ctx.beginPath(); ctx.arc(W * 0.62, H * 0.72 + pBob, W * 0.015, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(W * 0.6125, H * 0.74 + pBob, W * 0.015, H * 0.06);
    },
  },
  {
    id: 'cam02',
    label: 'Cargo Bay — Bay A',
    location: 'Cargo Terminal',
    status: 'live',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#06090e';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#101820';
      ctx.fillRect(0, H * 0.5, W, H * 0.5);
      ctx.fillStyle = '#0d1520';
      ctx.fillRect(0, 0, W, H * 0.5);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(W * (i / 3), 0); ctx.lineTo(W * (i / 3), H); ctx.stroke();
      }
      const bounce = Math.sin(t * 0.001) * 1.5;
      ctx.fillStyle = '#1a2840';
      ctx.fillRect(W * 0.15, H * 0.35 + bounce, W * 0.45, H * 0.2);
      ctx.fillStyle = '#0e1820';
      ctx.fillRect(W * 0.55, H * 0.35 + bounce, W * 0.12, H * 0.12);
      [0.05, 0.15, 0.25, 0.6, 0.7, 0.8].forEach((x, i) => {
        ctx.fillStyle = `rgba(${80 + i * 10},${100 + i * 5},${130 + i * 3},0.6)`;
        ctx.fillRect(W * x, H * 0.6, W * 0.08, H * 0.12);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(W * x, H * 0.6, W * 0.08, H * 0.12);
      });
      const fx = W * 0.6 + Math.sin(t * 0.0004) * W * 0.1;
      ctx.fillStyle = '#D97706';
      ctx.fillRect(fx, H * 0.65, W * 0.07, H * 0.08);
      ctx.fillStyle = '#92400E';
      ctx.fillRect(fx + W * 0.065, H * 0.64, W * 0.008, H * 0.1);
      ctx.fillRect(fx + W * 0.065, H * 0.64, W * 0.04, W * 0.008);
    },
  },
  {
    id: 'cam03',
    label: 'Immigration Hall',
    location: 'Terminal A',
    status: 'crowded',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#0a0f18';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#0d1422';
      ctx.fillRect(0, H * 0.4, W, H * 0.6);
      ctx.fillStyle = '#141e2e';
      [0.05, 0.3, 0.55, 0.78].forEach(x => {
        ctx.fillRect(W * x, H * 0.45, W * 0.18, H * 0.08);
        ctx.strokeStyle = 'rgba(34,211,238,0.15)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(W * x, H * 0.45, W * 0.18, H * 0.08);
      });
      for (let i = 0; i < 20; i++) {
        const baseX = W * (0.05 + (i % 4) * 0.25) + (i % 3) * W * 0.04;
        const queueY = H * (0.58 + Math.floor(i / 4) * 0.08);
        const bob = Math.sin(t * 0.002 + i * 0.7) * 1.5;
        const colors = ['#60A5FA', '#10B981', '#F59E0B', '#8B5CF6', '#F87171'];
        ctx.fillStyle = colors[i % 5];
        ctx.beginPath(); ctx.arc(baseX, queueY + bob, W * 0.02, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${60 + (i * 7) % 80},${70 + (i * 11) % 70},${90 + (i * 13) % 50},0.7)`;
        ctx.fillRect(baseX - W * 0.02, queueY + W * 0.02 + bob, W * 0.04, H * 0.05);
      }
      ctx.fillStyle = 'rgba(244,63,94,0.08)';
      ctx.fillRect(0, 0, W, H);
    },
  },
  {
    id: 'cam04',
    label: 'Scanner Room',
    location: 'X-Ray Unit 1',
    status: 'live',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#06080f';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#141e30';
      ctx.fillRect(W * 0.12, H * 0.3, W * 0.76, H * 0.3);
      ctx.strokeStyle = 'rgba(34,211,238,0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(W * 0.12, H * 0.3, W * 0.76, H * 0.3);
      ctx.fillStyle = '#060c18';
      ctx.fillRect(W * 0.25, H * 0.32, W * 0.5, H * 0.26);
      ctx.fillStyle = '#1a2535';
      ctx.fillRect(W * 0.05, H * 0.52, W * 0.9, H * 0.05);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      const beltOffset = (t * 0.05) % (W * 0.06);
      for (let x = -W * 0.06; x < W * 1.1; x += W * 0.06) {
        ctx.beginPath(); ctx.moveTo(x + beltOffset, H * 0.52); ctx.lineTo(x + beltOffset, H * 0.57); ctx.stroke();
      }
      const bagX = (t * 0.04) % (W * 1.1) - W * 0.05;
      ctx.fillStyle = '#2a3e5a';
      ctx.fillRect(bagX, H * 0.46, W * 0.12, H * 0.07);
      ctx.strokeStyle = 'rgba(0,255,100,0.15)';
      ctx.lineWidth = 0.5;
      for (let xr = 0; xr < 6; xr++) {
        for (let yr = 0; yr < 4; yr++) {
          ctx.strokeRect(W * (0.26 + xr * 0.08), H * (0.33 + yr * 0.055), W * 0.07, H * 0.05);
        }
      }
      const opBob = Math.sin(t * 0.0015) * 1.5;
      ctx.fillStyle = '#4B5563';
      ctx.beginPath(); ctx.arc(W * 0.88, H * 0.44 + opBob, W * 0.025, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#374151';
      ctx.fillRect(W * 0.855, H * 0.47 + opBob, W * 0.05, H * 0.08);
    },
  },
  {
    id: 'cam05',
    label: 'Perimeter Fence — North',
    location: 'Perimeter Zone',
    status: 'alert',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#050810';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#0a1018';
      ctx.fillRect(0, H * 0.55, W, H * 0.45);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, H * 0.55); ctx.lineTo(W, H * 0.55); ctx.stroke();
      for (let x = 0; x < W; x += W * 0.06) {
        ctx.beginPath(); ctx.moveTo(x, H * 0.3); ctx.lineTo(x, H * 0.55); ctx.stroke();
      }
      const angle = Math.sin(t * 0.0006) * 0.4;
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      ctx.moveTo(W * 0.5, H * 0.2);
      ctx.lineTo(W * 0.5 + Math.sin(angle) * W * 0.6, H);
      ctx.lineTo(W * 0.5 + Math.sin(angle) * W * 0.6 + W * 0.25, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      const figX = W * 0.35 + Math.sin(t * 0.0004) * W * 0.08;
      const figY = H * 0.62;
      const alertBlink = Math.sin(t * 0.008) > 0;
      if (alertBlink) {
        ctx.fillStyle = 'rgba(244,63,94,0.15)';
        ctx.fillRect(figX - W * 0.06, figY - H * 0.15, W * 0.12, H * 0.18);
      }
      ctx.fillStyle = '#374151';
      ctx.beginPath(); ctx.arc(figX, figY - H * 0.1, W * 0.02, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1F2937';
      ctx.fillRect(figX - W * 0.015, figY - H * 0.07, W * 0.03, H * 0.06);
      if (alertBlink) {
        ctx.fillStyle = 'rgba(244,63,94,0.8)';
        ctx.font = `bold ${W * 0.03}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('MOTION DETECTED', W * 0.5, H * 0.18);
      }
    },
  },
  {
    id: 'cam06',
    label: 'Parking Lot A',
    location: 'Holding Area',
    status: 'live',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#07090f';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#0d1220';
      ctx.fillRect(0, H * 0.35, W, H);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.setLineDash([H * 0.02, H * 0.02]);
      ctx.lineWidth = 1;
      for (let x = 0; x <= 5; x++) {
        ctx.beginPath(); ctx.moveTo(W * x * 0.2, H * 0.35); ctx.lineTo(W * x * 0.2, H); ctx.stroke();
      }
      ctx.setLineDash([]);
      const vehicles = [
        { x: 0.02, c: '#1a2840' }, { x: 0.22, c: '#2a1a18' }, { x: 0.42, c: '#1e2818' },
        { x: 0.62, c: '#1a2840' }, { x: 0.82, c: '#241a28' },
      ];
      vehicles.forEach(v => {
        ctx.fillStyle = v.c;
        ctx.fillRect(W * v.x, H * 0.45, W * 0.15, H * 0.12);
        ctx.fillStyle = 'rgba(34,211,238,0.06)';
        ctx.fillRect(W * (v.x + 0.02), H * 0.47, W * 0.11, H * 0.05);
      });
      ctx.fillStyle = '#0a1218';
      ctx.fillRect(0, 0, W, H * 0.35);
      const walkX = W * 0.05 + (t * 0.035 % (W * 0.9));
      const bob = Math.sin(t * 0.006) * 2;
      ctx.fillStyle = '#1D4ED8';
      ctx.beginPath(); ctx.arc(walkX, H * 0.66 + bob, W * 0.018, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1E40AF';
      ctx.fillRect(walkX - W * 0.014, H * 0.68 + bob, W * 0.028, H * 0.06);
    },
  },
  {
    id: 'cam07',
    label: 'Export Gate — Out',
    location: 'Gate Bravo',
    status: 'live',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#07090f';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#0f1820';
      ctx.fillRect(W * 0.15, 0, W * 0.7, H);
      ctx.strokeStyle = 'rgba(255,235,100,0.12)';
      ctx.setLineDash([H * 0.05, H * 0.04]);
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(W * 0.5, 0); ctx.lineTo(W * 0.5, H); ctx.stroke();
      ctx.setLineDash([]);
      const ty = H * 0.85 - (t * 0.04 % (H * 0.9));
      ctx.fillStyle = '#1e2f42';
      ctx.fillRect(W * 0.2, ty, W * 0.26, H * 0.14);
      ctx.fillStyle = 'rgba(249,115,22,0.4)';
      ctx.font = `${W * 0.018}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('EXPORT', W * 0.33, ty + H * 0.06);
      const cwBob = Math.sin(t * 0.0015) * 2;
      ctx.fillStyle = '#7C3AED';
      ctx.beginPath(); ctx.arc(W * 0.68, H * 0.55 + cwBob, W * 0.022, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#6D28D9';
      ctx.fillRect(W * 0.658, H * 0.575 + cwBob, W * 0.044, H * 0.06);
      const waveAngle = Math.sin(t * 0.003) * 0.5;
      ctx.save();
      ctx.translate(W * 0.7, H * 0.56 + cwBob);
      ctx.rotate(waveAngle);
      ctx.fillStyle = '#6D28D9';
      ctx.fillRect(0, -H * 0.005, W * 0.04, H * 0.007);
      ctx.restore();
    },
  },
  {
    id: 'cam08',
    label: 'Currency Exchange',
    location: 'Arrivals Lobby',
    status: 'live',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#080b14';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#0c1222';
      ctx.fillRect(0, H * 0.45, W, H);
      ctx.fillStyle = '#111e30';
      ctx.fillRect(W * 0.15, H * 0.42, W * 0.7, H * 0.1);
      ctx.fillStyle = 'rgba(96,165,250,0.15)';
      ctx.fillRect(W * 0.17, H * 0.44, W * 0.66, H * 0.06);
      ctx.fillStyle = '#0e1825';
      ctx.fillRect(W * 0.1, H * 0.08, W * 0.8, H * 0.28);
      ctx.strokeStyle = 'rgba(96,165,250,0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(W * 0.1, H * 0.08, W * 0.8, H * 0.28);
      ctx.fillStyle = '#60A5FA';
      ctx.font = `bold ${W * 0.025}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('BDT / INR', W * 0.3, H * 0.18);
      ctx.fillStyle = '#10B981';
      ctx.fillText((0.7 + Math.sin(t * 0.0001) * 0.002).toFixed(4), W * 0.3, H * 0.27);
      ctx.fillStyle = '#60A5FA';
      ctx.fillText('NPR / INR', W * 0.7, H * 0.18);
      ctx.fillStyle = '#10B981';
      ctx.fillText((0.615 + Math.sin(t * 0.00012) * 0.001).toFixed(4), W * 0.7, H * 0.27);
      [0.25, 0.5, 0.75].forEach((x, i) => {
        const bob = Math.sin(t * 0.002 + i * 1.2) * 1.5;
        ctx.fillStyle = ['#F59E0B', '#8B5CF6', '#10B981'][i];
        ctx.beginPath(); ctx.arc(W * x, H * 0.58 + bob, W * 0.02, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(150,150,150,0.5)';
        ctx.fillRect(W * (x - 0.02), H * 0.61 + bob, W * 0.04, H * 0.06);
      });
    },
  },
  {
    id: 'cam09',
    label: 'Server Room',
    location: 'IT Infrastructure',
    status: 'offline',
    draw: (ctx, W, H, t) => {
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 1500; i++) {
        const nx = Math.floor((i * 7 + t * 0.01) % W);
        const ny = Math.floor((i * 13 + t * 0.007) % H);
        const alpha = 0.03 + ((i * 17 + t * 0.003) % 100) * 0.001;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillRect(nx, ny, 1.5, 1.5);
      }
      ctx.fillStyle = 'rgba(244,63,94,0.08)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#F87171';
      ctx.font = `bold ${W * 0.06}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('NO SIGNAL', W * 0.5, H * 0.42);
      ctx.fillStyle = 'rgba(232,240,255,0.25)';
      ctx.font = `${W * 0.038}px monospace`;
      ctx.fillText('CAM-09 OFFLINE', W * 0.5, H * 0.57);
      ctx.fillText('Reconnecting...', W * 0.5, H * 0.68);
    },
  },
];

const STATUS_CONFIG = {
  live:    { label: 'LIVE',    color: '#10B981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.25)' },
  crowded: { label: 'CROWDED', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
  alert:   { label: 'ALERT',   color: '#F87171', bg: 'rgba(244,63,94,0.12)',  border: 'rgba(244,63,94,0.25)'  },
  offline: { label: 'OFFLINE', color: 'rgba(232,240,255,0.3)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)' },
};

// ─── Timestamp Overlay (DOM) ─────────────────────────────────────────────────
function TimestampOverlay() {
  const [ts, setTs] = useState(() => new Date().toLocaleTimeString('en-IN', { hour12: false }));
  useEffect(() => {
    const t = setInterval(() => setTs(new Date().toLocaleTimeString('en-IN', { hour12: false })), 1000);
    return () => clearInterval(t);
  }, []);
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return (
    <div style={{ position: 'absolute', bottom: '36px', left: '8px', pointerEvents: 'none' }}>
      <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,235,100,0.6)', letterSpacing: '0.04em' }}>
        {today} {ts} IST
      </span>
    </div>
  );
}

// ─── Camera Feed Canvas ──────────────────────────────────────────────────────
function CameraFeed({ scene, onClick, dataTour }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(performance.now());

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const t = performance.now() - startRef.current;
    const W = canvas.width;
    const H = canvas.height;
    scene.draw(ctx, W, H, t);
    ctx.fillStyle = 'rgba(0,0,0,0.07)';
    for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
    rafRef.current = requestAnimationFrame(loop);
  }, [scene]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [loop]);

  const cfg = STATUS_CONFIG[scene.status];

  return (
    <div
      data-tour={dataTour}
      onClick={() => onClick && onClick(scene)}
      className="cam-cell"
      style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', border: `1px solid ${cfg.border}`, background: '#050810' }}
    >
      <canvas
        ref={canvasRef}
        width={320}
        height={190}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
      {/* Status badge */}
      <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 8px', borderRadius: '5px', background: cfg.bg, border: `1px solid ${cfg.border}`, backdropFilter: 'blur(8px)' }}>
        {scene.status !== 'offline' && (
          <span style={{
            display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: cfg.color,
            animation: scene.status === 'alert' ? 'blink 1s ease-in-out infinite' : 'liveDot 2.6s ease-in-out infinite',
          }} />
        )}
        <span style={{ fontSize: '9px', fontWeight: 700, color: cfg.color, letterSpacing: '0.06em' }}>{cfg.label}</span>
      </div>
      {/* Camera ID */}
      <div style={{ position: 'absolute', top: '8px', right: '8px', padding: '3px 6px', borderRadius: '4px', background: 'rgba(0,0,0,0.6)' }}>
        <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(232,240,255,0.4)' }}>{scene.id.toUpperCase()}</span>
      </div>
      {/* DOM Timestamp */}
      <TimestampOverlay />
      {/* Expand hint */}
      {onClick && (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', pointerEvents: 'none' }} className="cam-expand-icon">
          <Maximize2 size={12} style={{ color: 'rgba(232,240,255,0.4)' }} />
        </div>
      )}
      {/* Label */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 10px 8px', background: 'linear-gradient(transparent, rgba(5,8,16,0.92))' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8F0FF', margin: 0 }}>{scene.label}</p>
        <p style={{ fontSize: '10px', color: 'rgba(232,240,255,0.3)', margin: 0, marginTop: '1px' }}>{scene.location}</p>
      </div>
    </div>
  );
}

// ─── Expanded Camera Modal ────────────────────────────────────────────────────
function ExpandedCameraModal({ scene, onClose }) {
  useEffect(() => {
    if (!scene) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [scene, onClose]);

  if (!scene) return null;
  const cfg = STATUS_CONFIG[scene.status];

  const detailsMap = {
    live:    [['Connection', 'Stable · 1080p'], ['Latency', '< 80ms'], ['Frame rate', '25 fps'], ['Compression', 'H.264']],
    crowded: [['Crowd density', 'HIGH — ~60 persons'], ['Queue', '35–40 min wait'], ['Latency', '< 80ms'], ['Compression', 'H.264']],
    alert:   [['Motion detected', '2 subjects'], ['Alert since', '08:42 IST'], ['CISF notified', 'Yes'], ['Incident ID', 'INC-2024-0891']],
    offline: [['Connection', 'LOST — 09:14 IST'], ['Last frame', '09:13:58 IST'], ['Ping', 'No response'], ['IT Ticket', 'IT-2024-1042']],
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9990, background: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '900px', borderRadius: '20px', overflow: 'hidden', background: 'rgba(13,22,38,0.98)', border: `1px solid ${cfg.border}`, boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>{cfg.label}</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#E8F0FF' }}>{scene.label}</span>
            <span style={{ fontSize: '12px', color: 'rgba(232,240,255,0.3)' }}>{scene.location}</span>
          </div>
          <button onClick={onClose} aria-label="Close camera view" style={{ padding: '6px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} style={{ color: 'rgba(232,240,255,0.5)' }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>
          <div style={{ padding: '20px' }}>
            <CameraFeed scene={scene} />
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.07)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(232,240,255,0.25)', marginBottom: '12px' }}>
                Camera Details
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(detailsMap[scene.status] || []).map(([k, v]) => (
                  <div key={k}>
                    <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.32)', display: 'block', marginBottom: '2px' }}>{k}</span>
                    <span style={{ fontSize: '13px', color: '#E8F0FF' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {scene.status === 'alert' && (
              <div style={{ borderRadius: '12px', padding: '14px', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <AlertTriangle size={14} style={{ color: '#F87171' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#F87171' }}>Active Alert</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.5)', lineHeight: 1.55 }}>
                  Unidentified movement near perimeter fence at 08:42 IST. CISF Quick Response Team dispatched.
                </p>
              </div>
            )}

            {scene.status === 'crowded' && (
              <div style={{ borderRadius: '12px', padding: '14px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B', marginBottom: '6px' }}>Crowd Advisory</p>
                <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.5)', lineHeight: 1.55 }}>
                  Immigration Hall at 85% capacity. Consider opening additional counters to reduce queue.
                </p>
              </div>
            )}

            {scene.status === 'offline' && (
              <div style={{ borderRadius: '12px', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <WifiOff size={14} style={{ color: 'rgba(232,240,255,0.3)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(232,240,255,0.4)' }}>Camera Offline</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.35)', lineHeight: 1.55 }}>
                  IT ticket raised · Estimated restoration: 2 hours
                </p>
              </div>
            )}

            <div style={{ fontSize: '10px', color: 'rgba(232,240,255,0.18)', fontFamily: 'monospace', marginTop: 'auto', lineHeight: 1.6 }}>
              <p>CAMERA ID: {scene.id.toUpperCase()}</p>
              <p>ENCRYPTION: AES-256</p>
              <p>RETENTION: 90 DAYS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Module ─────────────────────────────────────────────────────────────
export default function SurveillanceModule({ icp = 'PTP' }) {
  const icpData = getICPData(icp);
  const [expandedScene, setExpandedScene] = useState(null);

  const alertCount   = SCENES.filter(s => s.status === 'alert').length;
  const offlineCount = SCENES.filter(s => s.status === 'offline').length;
  const crowdedCount = SCENES.filter(s => s.status === 'crowded').length;

  return (
    <div className="max-w-[1160px] mx-auto space-y-10">
      <style>{`
        .cam-cell:hover .cam-expand-icon { opacity: 1; transition: opacity 0.2s; }
        .cam-expand-icon { opacity: 0; }
      `}</style>

      <ExpandedCameraModal scene={expandedScene} onClose={() => setExpandedScene(null)} />

      {/* Module Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-4" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }}>
          <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: '#00D47A' }} />
          <span className="text-xs font-medium" style={{ color: '#22D3EE', letterSpacing: '0.04em' }}>LPAI Nexus · {icpData.name} ICP</span>
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 300, letterSpacing: '-0.025em', color: '#E8F0FF', lineHeight: 1.1 }}>
          Surveillance
        </h1>
        <p className="text-sm mt-2.5" style={{ color: 'rgba(232,240,255,0.38)', fontStyle: 'italic', lineHeight: 1.6 }}>
          Axiom AI monitors all camera feeds continuously and surfaces only the events that need human attention.
        </p>
      </div>

      {/* Status Summary */}
      <div data-tour="surveillance-kpi-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {[
          { label: 'Cameras Online', value: `${SCENES.length - offlineCount}/${SCENES.length}`, color: '#10B981' },
          { label: 'Active Alerts',  value: String(alertCount),  color: '#F87171' },
          { label: 'Crowded Areas',  value: String(crowdedCount), color: '#F59E0B' },
          { label: 'Offline Feeds',  value: String(offlineCount), color: 'rgba(232,240,255,0.3)' },
        ].map(item => (
          <div key={item.label} style={{ flex: '1 1 120px', padding: '14px 18px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.3)', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ fontSize: '22px', fontWeight: 600, color: item.color }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Camera Grid */}
      <div data-tour="camera-grid" className="glass rounded-2xl p-6">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8F0FF' }}>Live Camera Grid</h2>
            <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.32)', marginTop: '3px' }}>
              Click any feed to expand · {SCENES.length} cameras
            </p>
          </div>
          <div data-tour="camera-legend" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: v.color, display: 'block' }} />
                <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.3)' }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {SCENES.map(scene => (
            <CameraFeed
              key={scene.id}
              scene={scene}
              onClick={setExpandedScene}
              dataTour={scene.status === 'alert' ? 'alert-camera' : undefined}
            />
          ))}
        </div>
      </div>

      <ModuleFooter />
    </div>
  );
}
