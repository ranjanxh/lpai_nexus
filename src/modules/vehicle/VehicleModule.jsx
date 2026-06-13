import { useState, useEffect, useRef, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import KPICard from '../../components/shared/KPICard.jsx';
import StatusBadge from '../../components/shared/StatusBadge.jsx';
import ModuleFooter from '../../components/ui/ModuleFooter.jsx';
import { vehicleData, trafficFlow, laneStatus, getICPData } from '../../data/mockData.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs shadow-2xl" style={{ background: 'rgba(7,11,20,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)' }}>
      <p className="font-mono mb-2" style={{ color: 'rgba(232,240,255,0.4)' }}>{label}</p>
      {payload.map((p, i) => p.value != null && (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.stroke }} />
          <span style={{ color: 'rgba(232,240,255,0.6)' }}>{p.name}:</span>
          <span style={{ color: '#E8F0FF' }} className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const riskColor = (score) => {
  if (score < 30) return '#10B981';
  if (score < 61) return '#F59E0B';
  if (score < 81) return '#F97316';
  return '#F43F5E';
};
const varianceColor = (declared, actual) => {
  if (!declared || !actual) return 'rgba(232,240,255,0.3)';
  const pct = Math.abs((actual - declared) / declared) * 100;
  if (pct <= 1) return '#10B981';
  if (pct <= 3) return '#F59E0B';
  return '#F43F5E';
};
const variancePct = (declared, actual) => {
  if (!declared || !actual) return '—';
  const pct = ((actual - declared) / declared) * 100;
  return (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%';
};
const laneBarColor = { normal: '#10B981', busy: '#F97316', restricted: '#F43F5E' };

// ─── ANPR Scanner Widget ──────────────────────────────────────────────────────
const ANPR_PLATES = vehicleData.map(v => ({
  plate: v.plate,
  anpr: v.anpr,
  risk: v.riskScore,
  cargo: v.cargo,
  driver: v.driver,
}));

function drawANPR(ctx, W, H, phase, progress, plateInfo) {
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#050810';
  ctx.fillRect(0, 0, W, H);

  // Road surface
  ctx.fillStyle = '#0e1520';
  ctx.fillRect(W * 0.2, 0, W * 0.6, H);

  // Lane markings
  ctx.strokeStyle = 'rgba(255,235,100,0.22)';
  ctx.setLineDash([H * 0.04, H * 0.03]);
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(W * 0.35, 0); ctx.lineTo(W * 0.35, H * 0.55); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W * 0.65, 0); ctx.lineTo(W * 0.65, H * 0.55); ctx.stroke();
  ctx.setLineDash([]);

  // ANPR Scanner platform
  ctx.fillStyle = '#141e2e';
  ctx.fillRect(W * 0.1, H * 0.6, W * 0.8, H * 0.08);
  ctx.strokeStyle = 'rgba(34,211,238,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(W * 0.1, H * 0.6, W * 0.8, H * 0.08);
  ctx.fillStyle = '#22D3EE';
  ctx.font = `bold ${W * 0.02}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('ANPR SCAN ZONE', W * 0.5, H * 0.657);

  // Camera poles
  ctx.fillStyle = '#2a3545';
  ctx.fillRect(W * 0.12, H * 0.3, W * 0.015, H * 0.32);
  ctx.fillRect(W * 0.865, H * 0.3, W * 0.015, H * 0.32);
  // Camera heads
  ctx.fillStyle = '#3a4a5a';
  ctx.fillRect(W * 0.10, H * 0.28, W * 0.055, H * 0.05);
  ctx.fillRect(W * 0.845, H * 0.28, W * 0.055, H * 0.05);
  // Camera lens
  ctx.fillStyle = '#22D3EE';
  ctx.beginPath(); ctx.arc(W * 0.135, H * 0.305, W * 0.012, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W * 0.865, H * 0.305, W * 0.012, 0, Math.PI * 2); ctx.fill();

  // Vehicle
  if (phase === 'approaching' || phase === 'scanning' || phase === 'result') {
    let vehicleY;
    if (phase === 'approaching') {
      vehicleY = H * (0.05 + 0.35 * progress);
    } else {
      vehicleY = H * 0.4;
    }

    const vw = W * 0.32;
    const vh = H * 0.16;
    const vx = W * 0.34;

    // Truck body
    ctx.fillStyle = '#1a2535';
    ctx.beginPath();
    ctx.roundRect(vx, vehicleY, vw, vh, 4);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(vx, vehicleY, vw, vh);

    // Cab
    ctx.fillStyle = '#0e1820';
    ctx.fillRect(vx + vw * 0.65, vehicleY, vw * 0.35, vh * 0.6);

    // Headlights (pointing down when going down road)
    ctx.fillStyle = 'rgba(255,230,100,0.4)';
    ctx.fillRect(vx + vw * 0.67, vehicleY + vh * 0.6, vw * 0.07, vh * 0.08);
    ctx.fillRect(vx + vw * 0.88, vehicleY + vh * 0.6, vw * 0.07, vh * 0.08);

    // Wheels
    ctx.fillStyle = '#080e18';
    [vx + vw * 0.1, vx + vw * 0.5, vx + vw * 0.8].forEach(wx => {
      ctx.beginPath(); ctx.arc(wx, vehicleY + vh, H * 0.025, 0, Math.PI * 2); ctx.fill();
    });
  }

  // Scanning beam (phase === 'scanning')
  if (phase === 'scanning') {
    const scanY = H * 0.4 + H * 0.08;
    const beamProgress = (progress * 2) % 1;
    const beamX = W * 0.2 + W * 0.6 * beamProgress;
    const beamGrad = ctx.createLinearGradient(beamX - 12, 0, beamX + 12, 0);
    beamGrad.addColorStop(0, 'transparent');
    beamGrad.addColorStop(0.5, 'rgba(34,211,238,0.85)');
    beamGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = beamGrad;
    ctx.fillRect(beamX - 12, H * 0.35, 24, H * 0.34);

    ctx.fillStyle = '#22D3EE';
    ctx.font = `bold ${W * 0.022}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('SCANNING PLATE...', W * 0.5, H * 0.88);
  }

  // Result phase
  if (phase === 'result' && plateInfo) {
    const boxY = H * 0.72;
    ctx.fillStyle = 'rgba(5,8,16,0.92)';
    ctx.fillRect(W * 0.08, boxY, W * 0.84, H * 0.24);
    ctx.strokeStyle = 'rgba(34,211,238,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(W * 0.08, boxY, W * 0.84, H * 0.24);

    // Plate number
    ctx.fillStyle = '#F59E0B';
    ctx.font = `bold ${W * 0.04}px monospace`;
    ctx.textAlign = 'left';
    ctx.fillText(plateInfo.plate, W * 0.12, boxY + H * 0.07);

    const ok = plateInfo.anpr === 'Matched';
    const color = ok ? '#10B981' : '#F43F5E';
    const symbol = ok ? '✓' : '✗';

    ctx.font = `${W * 0.022}px monospace`;
    ctx.fillStyle = '#10B981';
    ctx.fillText(`${symbol} VAHAN: ${ok ? 'MATCHED' : 'NO RECORD'}`, W * 0.12, boxY + H * 0.13);
    ctx.fillStyle = plateInfo.risk < 30 ? '#10B981' : plateInfo.risk < 80 ? '#F59E0B' : '#F43F5E';
    ctx.fillText(`${plateInfo.risk < 80 ? '✓' : '✗'} RISK SCORE: ${plateInfo.risk}/100`, W * 0.12, boxY + H * 0.19);

    if (plateInfo.cargo) {
      ctx.fillStyle = 'rgba(232,240,255,0.4)';
      ctx.font = `${W * 0.018}px monospace`;
      ctx.fillText(`CARGO: ${plateInfo.cargo}`, W * 0.55, boxY + H * 0.13);
    }
  }

  // Scanlines overlay
  ctx.fillStyle = 'rgba(0,0,0,0.07)';
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
}

function ANPRWidget() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ phase: 'approaching', phaseStart: performance.now(), plateIdx: 0 });

  const PHASES = { approaching: 2800, scanning: 1800, result: 2200 };

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const now = performance.now();
    const s = stateRef.current;
    const elapsed = now - s.phaseStart;
    const duration = PHASES[s.phase];
    let progress = Math.min(elapsed / duration, 1);

    if (elapsed >= duration) {
      const phaseOrder = ['approaching', 'scanning', 'result'];
      const nextIdx = (phaseOrder.indexOf(s.phase) + 1) % 3;
      if (nextIdx === 0) stateRef.current.plateIdx = (s.plateIdx + 1) % ANPR_PLATES.length;
      stateRef.current.phase = phaseOrder[nextIdx];
      stateRef.current.phaseStart = now;
      progress = 0;
    }

    const plateInfo = ANPR_PLATES[stateRef.current.plateIdx];
    drawANPR(ctx, W, H, stateRef.current.phase, progress, plateInfo);
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [loop]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={280}
      style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
    />
  );
}

// ─── Main Module ─────────────────────────────────────────────────────────────
export default function VehicleModule({ icp = 'PTP' }) {
  const icpData = getICPData(icp);

  return (
    <div className="max-w-[1160px] mx-auto space-y-10">

      {/* Module Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-4" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }}>
          <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: '#00D47A' }} />
          <span className="text-xs font-medium" style={{ color: '#22D3EE', letterSpacing: '0.04em' }}>LPAI Nexus · {icpData.name} ICP</span>
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 300, letterSpacing: '-0.025em', color: '#E8F0FF', lineHeight: 1.1 }}>
          Vehicle Gate
        </h1>
        <p className="text-sm mt-2.5" style={{ color: 'rgba(232,240,255,0.38)', fontStyle: 'italic', lineHeight: 1.6 }}>
          Axiom reads number plates in 2 seconds and automatically checks each vehicle against VAHAN and national blacklists.
        </p>
      </div>

      {/* KPI Row */}
      <div data-tour="vehicle-kpi-row" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Processed Today"  value={icpData.vehicles.toLocaleString()} sub="vehicles cleared"       change={4}  color="white" />
        <KPICard label="ANPR Success"      value="100%"                              sub="plate recognition rate"  color="green" />
        <KPICard label="Overloaded"        value="8"                                 sub="weight violations"       change={60} color="red" pulse />
        <KPICard label="Blacklisted"       value="2"                                 sub="blocked vehicles"        color="yellow" />
      </div>

      {/* Traffic Flow + Lane Status + ANPR */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
        <div className="lg:col-span-4 glass rounded-2xl p-6">
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,240,255,0.2)', marginBottom: '20px' }}>
            Vehicle Traffic Flow — Today
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trafficFlow} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="hour" tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(232,240,255,0.4)' }} />
              <Line type="monotone" dataKey="actual" name="Actual" stroke="#22D3EE" strokeWidth={2.5} dot={{ fill: '#22D3EE', r: 3 }} connectNulls={false} />
              <Line type="monotone" dataKey="predicted" name="Predicted" stroke="rgba(232,240,255,0.3)" strokeWidth={2} strokeDasharray="6 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div data-tour="lane-status" className="lg:col-span-3 glass rounded-2xl p-6">
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,240,255,0.2)', marginBottom: '20px' }}>
            Lane Status
          </p>
          <div className="space-y-5">
            {laneStatus.map(lane => {
              const pct = (lane.queue / lane.capacity) * 100;
              const barColor = laneBarColor[lane.status] || '#10B981';
              const statusKey = lane.status === 'normal' ? 'operational' : lane.status === 'busy' ? 'degraded' : 'maintenance';
              return (
                <div key={lane.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8F0FF' }}>{lane.name}</span>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '12px', color: 'rgba(232,240,255,0.35)' }}>{lane.queue}/{lane.capacity}</span>
                      <StatusBadge status={statusKey} />
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: barColor }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.25)' }}>Queue utilization</span>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, color: barColor }}>{Math.round(pct)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ANPR Widget */}
        <div data-tour="anpr-widget" className="lg:col-span-4 glass rounded-2xl p-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,240,255,0.2)' }}>
              ANPR Live Feed
            </p>
            <div className="flex items-center gap-1.5">
              <span className="live-dot" style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: '#00D47A' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#00D47A' }}>LIVE</span>
            </div>
          </div>
          <ANPRWidget />
          <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.22)', textAlign: 'center', marginTop: '10px' }}>
            Simulated Axiom ANPR scan — VAHAN + NCRB + TAS lookup
          </p>
        </div>
      </div>

      {/* Vehicle Table */}
      <div data-tour="vehicle-table" className="glass rounded-2xl overflow-hidden">
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8F0FF', marginBottom: '3px' }}>Vehicle Registry</h2>
          <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.32)' }}>{vehicleData.length} vehicles processed today · Sample data from Petrapole ICP</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Plate', 'Type', 'Driver', 'Cargo', 'Declared (kg)', 'Actual (kg)', 'Variance', 'Risk', 'Status', 'Time'].map(h => (
                  <th key={h} className="text-left px-5 py-3 whitespace-nowrap" style={{ color: 'rgba(232,240,255,0.4)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((v) => (
                <tr
                  key={v.id}
                  className="row-hover"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: v.riskScore >= 81 || v.status === 'FLAGGED — No Appointment' ? 'rgba(244,63,94,0.04)' :
                                v.status === 'Overloaded — Hold' || v.status === 'Held' ? 'rgba(249,115,22,0.04)' : 'transparent',
                  }}
                >
                  <td className="px-5 py-3.5 font-mono font-bold" style={{ color: '#E8F0FF' }}>{v.plate}</td>
                  <td className="px-5 py-3.5" style={{ color: 'rgba(232,240,255,0.5)' }}>{v.type}</td>
                  <td className="px-5 py-3.5" style={{ color: 'rgba(232,240,255,0.65)' }}>{v.driver}</td>
                  <td className="px-5 py-3.5" style={{ color: 'rgba(232,240,255,0.5)' }}>{v.cargo}</td>
                  <td className="px-5 py-3.5 font-mono text-right" style={{ color: 'rgba(232,240,255,0.4)' }}>{v.declaredWeight > 0 ? v.declaredWeight.toLocaleString() : '—'}</td>
                  <td className="px-5 py-3.5 font-mono text-right" style={{ color: '#E8F0FF' }}>{v.actualWeight > 0 ? v.actualWeight.toLocaleString() : '—'}</td>
                  <td className="px-5 py-3.5 font-mono font-semibold" style={{ color: varianceColor(v.declaredWeight, v.actualWeight) }}>{variancePct(v.declaredWeight, v.actualWeight)}</td>
                  <td className="px-5 py-3.5 font-bold" style={{ color: riskColor(v.riskScore) }}>{v.riskScore}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={v.status} /></td>
                  <td className="px-5 py-3.5 font-mono" style={{ color: 'rgba(232,240,255,0.3)' }}>{v.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
          <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.28)' }}>Showing {vehicleData.length} of {vehicleData.length} records</span>
        </div>
      </div>

      {/* Weighbridge Stats */}
      <div className="glass rounded-2xl p-6">
        <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,240,255,0.2)', marginBottom: '20px' }}>
          Weighbridge Summary
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Weighed Today', value: icpData.vehicles.toLocaleString(), sub: 'vehicles', color: '#E8F0FF', bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)' },
            { label: 'Overloaded Detected', value: '8', sub: 'violations', color: '#F43F5E', bg: 'rgba(244,63,94,0.04)', border: 'rgba(244,63,94,0.12)' },
            { label: 'Top Violator', value: 'UP78BT2341', sub: '+9.2% overweight', color: '#F97316', bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)', mono: true },
            { label: 'Average Variance', value: '0.4%', sub: 'declared vs actual', color: '#10B981', bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)' },
          ].map((item, i) => (
            <div key={i} style={{ borderRadius: '12px', padding: '20px', background: item.bg, border: `1px solid ${item.border}` }}>
              <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.3)', marginBottom: '10px' }}>{item.label}</p>
              <p style={{ fontSize: item.mono ? '14px' : '24px', fontWeight: 600, color: item.color, fontFamily: item.mono ? 'monospace' : undefined }}>{item.value}</p>
              <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.25)', marginTop: '6px' }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <ModuleFooter />
    </div>
  );
}
