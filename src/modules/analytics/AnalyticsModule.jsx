import { Award } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell
} from 'recharts';
import StatusBadge from '../../components/shared/StatusBadge.jsx';
import ModuleFooter from '../../components/ui/ModuleFooter.jsx';
import { aiInsights, icpOverview, tradeFlow, dutyRevenue, icpPerformance } from '../../data/mockData.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs shadow-2xl" style={{ background: 'rgba(7,11,20,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)' }}>
      <p className="font-mono mb-2" style={{ color: 'rgba(232,240,255,0.4)' }}>{label}</p>
      {payload.map((p, i) => p.value != null && (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill || p.stroke || p.color }} />
          <span style={{ color: 'rgba(232,240,255,0.6)' }}>{p.name}:</span>
          <span style={{ color: '#E8F0FF' }} className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const tradeColors = {
  Bangladesh: '#60A5FA',
  Nepal:      '#10B981',
  Pakistan:   '#F43F5E',
  Myanmar:    '#F59E0B',
  Bhutan:     '#F97316',
  Others:     'rgba(232,240,255,0.2)',
};

const clearanceColor = (min) => {
  if (min < 75)  return '#10B981';
  if (min <= 100) return '#F59E0B';
  return '#F43F5E';
};

const priorityCfg = {
  HIGH:   { color: '#F97316', border: 'rgba(249,115,22,0.2)',  label: 'High Priority' },
  MEDIUM: { color: '#F59E0B', border: 'rgba(245,158,11,0.15)', label: 'Medium' },
  LOW:    { color: '#60A5FA', border: 'rgba(96,165,250,0.15)', label: 'Advisory' },
};

const topPerformer = [...icpPerformance].sort((a, b) => b.score - a.score)[0];

const SectionHeader = ({ title, subtitle, right }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: '16px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
    <div>
      <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8F0FF' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.32)', marginTop: '3px' }}>{subtitle}</p>}
    </div>
    {right}
  </div>
);

export default function AnalyticsModule() {
  return (
    <div className="max-w-[1160px] mx-auto space-y-10">

      {/* Module Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-4" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }}>
          <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: '#00D47A' }} />
          <span className="text-xs font-medium" style={{ color: '#22D3EE', letterSpacing: '0.04em' }}>LPAI Nexus</span>
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 300, letterSpacing: '-0.025em', color: '#E8F0FF', lineHeight: 1.1 }}>
          Intelligence Report
        </h1>
        <p className="text-sm mt-2.5" style={{ color: 'rgba(232,240,255,0.38)', fontStyle: 'italic', lineHeight: 1.6 }}>
          Axiom analyses all operations daily and writes this briefing — across all 12 ICPs, in plain language.
        </p>
      </div>

      {/* FY23-24 KPI Row */}
      <div data-tour="analytics-kpi-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(232,240,255,0.22)' }}>
            FY 2023-24 Actuals
          </p>
          <span style={{ fontSize: '10px', padding: '1px 8px', borderRadius: '4px', background: 'rgba(217,119,6,0.1)', color: '#D97706', border: '1px solid rgba(217,119,6,0.2)' }}>
            LPAI Annual Report
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label:  'Total Trade Facilitated',
              value:  '₹70,952 Cr',
              change: '+32% YoY',
              sub:    'All LPAI ICPs combined',
              color:  '#D97706',
              glow:   'rgba(217,119,6,0.18)',
            },
            {
              label:  'Passengers Processed',
              value:  '30.46 Lakh',
              change: '+21% YoY',
              sub:    'All nationalities, all ICPs',
              color:  '#60A5FA',
              glow:   'rgba(96,165,250,0.15)',
            },
            {
              label:  'Duty Revenue Collected',
              value:  '₹62.17 Cr',
              change: '+100% YoY',
              sub:    'Customs duty, all ports',
              color:  '#10B981',
              glow:   'rgba(16,185,129,0.15)',
            },
            {
              label:  'Active ICPs',
              value:  '12 of 23',
              change: 'Sanctioned strength',
              sub:    '1 under maintenance',
              color:  '#E8F0FF',
              glow:   'rgba(232,240,255,0.08)',
            },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-5 relative overflow-hidden">
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: `linear-gradient(90deg, transparent 5%, ${item.color}55 40%, ${item.color}55 60%, transparent 95%)`,
              }} />
              <p style={{ fontSize: '9px', color: 'rgba(232,240,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '12px' }}>
                {item.label}
              </p>
              <p style={{ fontSize: '1.75rem', fontWeight: 600, color: item.color, letterSpacing: '-0.03em', lineHeight: 1, filter: `drop-shadow(0 0 12px ${item.glow})` }}>
                {item.value}
              </p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: item.color, marginTop: '6px', opacity: 0.7 }}>{item.change}</p>
              <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.32)', marginTop: '3px' }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Axiom Daily Briefing */}
      <div data-tour="axiom-briefing-analytics" className="rounded-2xl overflow-hidden" style={{
        background: 'rgba(13,22,38,0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(139,92,246,0.2)',
        boxShadow: '0 0 0 1px rgba(139,92,246,0.06)',
        borderLeft: '3px solid #8B5CF6',
      }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(139,92,246,0.04)' }}>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md flex items-center justify-center axiom-card">
              <div className="w-1.5 h-1.5 rounded-full axiom-pulse" style={{ background: '#8B5CF6' }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold" style={{ color: '#E8F0FF' }}>Axiom Daily Briefing</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(232,240,255,0.35)' }}>
                LPAI Intelligence Engine · Updated 07:00 IST, {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(217,119,6,0.1)', color: '#D97706', border: '1px solid rgba(217,119,6,0.2)' }}>
            CONFIDENTIAL
          </span>
        </div>
        <div className="p-6">
          <p className="text-sm italic mb-6" style={{ color: 'rgba(232,240,255,0.32)' }}>
            This briefing is automatically written by the LPAI Intelligence Engine after analysing all cargo, immigration, surveillance, and vehicle events from the past 24 hours.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {aiInsights.map(insight => {
              const cfg = priorityCfg[insight.priority] || priorityCfg.LOW;
              return (
                <div key={insight.id} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${cfg.border}`, borderLeft: `3px solid ${cfg.color}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: cfg.color }}>{cfg.label}</span>
                    <span className="ml-auto font-mono text-xs" style={{ color: 'rgba(232,240,255,0.2)' }}>{insight.time}</span>
                  </div>
                  <h4 className="text-sm font-semibold mb-2 leading-snug" style={{ color: '#E8F0FF' }}>{insight.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,240,255,0.5)' }}>{insight.summary}</p>
                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.25)' }}>{insight.category}</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-16 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-full rounded-full" style={{ width: `${insight.confidence}%`, background: '#10B981' }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#10B981' }}>{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Multi-ICP Command Table */}
      <div data-tour="icp-comparison-table" className="glass rounded-2xl overflow-hidden">
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <SectionHeader title="Multi-ICP Command Overview" subtitle="Live operational status across all 12 active check posts" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['ICP', 'State', 'Cargo', 'Cleared', 'Pending', 'Flagged', 'Vehicles', 'Crossings', 'Alerts', 'Avg Clear', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 whitespace-nowrap" style={{ color: 'rgba(232,240,255,0.4)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {icpOverview.map((icp) => (
                <tr
                  key={icp.id}
                  className="row-hover"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: icp.status === 'degraded' ? 'rgba(249,115,22,0.04)' : 'transparent',
                    opacity: icp.status === 'maintenance' ? 0.4 : 1,
                  }}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-mono font-bold" style={{ color: '#D97706', fontSize: '12px' }}>{icp.id}</span>
                    <span className="font-medium ml-2" style={{ color: '#E8F0FF' }}>{icp.name}</span>
                  </td>
                  <td className="px-5 py-3.5" style={{ color: 'rgba(232,240,255,0.45)' }}>{icp.state}</td>
                  <td className="px-5 py-3.5 font-mono" style={{ color: '#E8F0FF' }}>{icp.cargoToday.toLocaleString()}</td>
                  <td className="px-5 py-3.5 font-mono" style={{ color: '#10B981' }}>{icp.cleared.toLocaleString()}</td>
                  <td className="px-5 py-3.5 font-mono" style={{ color: '#F59E0B' }}>{icp.pending}</td>
                  <td className="px-5 py-3.5 font-mono">
                    <span style={{ color: icp.flagged > 0 ? '#F43F5E' : 'rgba(232,240,255,0.2)' }}>{icp.flagged}</span>
                  </td>
                  <td className="px-5 py-3.5 font-mono" style={{ color: 'rgba(232,240,255,0.5)' }}>{icp.vehicles.toLocaleString()}</td>
                  <td className="px-5 py-3.5 font-mono" style={{ color: 'rgba(232,240,255,0.5)' }}>{icp.crossings.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    {icp.alerts > 0 ? (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full blink" style={{ background: 'rgba(244,63,94,0.12)', color: '#F87171', border: '1px solid rgba(244,63,94,0.2)' }}>
                        {icp.alerts}
                      </span>
                    ) : <span style={{ color: 'rgba(232,240,255,0.2)' }}>—</span>}
                  </td>
                  <td className="px-5 py-3.5 font-mono font-semibold" style={{ color: icp.clearanceAvg === 0 ? 'rgba(232,240,255,0.2)' : clearanceColor(icp.clearanceAvg) }}>
                    {icp.clearanceAvg === 0 ? '—' : `${icp.clearanceAvg}m`}
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={icp.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
          <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.22)' }}>Showing 12 of 12 active ICPs · 1 under maintenance excluded from aggregates</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div data-tour="trade-flow-chart" className="glass rounded-2xl p-6">
          <SectionHeader title="Trade Flow by Country" subtitle="Monthly (Crore ₹) · FY23-24 actuals" />
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={tradeFlow} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '10px', color: 'rgba(232,240,255,0.4)' }} />
              {Object.entries(tradeColors).map(([key, color]) => (
                <Bar key={key} dataKey={key} stackId="a" fill={color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6">
          <SectionHeader title="Revenue vs Target" subtitle="Duty collected (₹ Lakhs)" />
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={dutyRevenue} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(232,240,255,0.4)' }} />
              <Line type="monotone" dataKey="collected" name="Collected" stroke="#22D3EE" strokeWidth={2.5} dot={{ fill: '#22D3EE', r: 3 }} />
              <Line type="monotone" dataKey="target" name="Target" stroke="rgba(232,240,255,0.3)" strokeWidth={1.5} strokeDasharray="6 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Benchmarking */}
      <div data-tour="icp-benchmarking" className="glass rounded-2xl p-6">
        <SectionHeader
          title="ICP Performance Benchmarking"
          subtitle="Axiom composite score — clearance time, detection rate, accuracy"
          right={
            <div className="flex items-center gap-2">
              <Award size={13} style={{ color: '#D97706' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#D97706' }}>
                Top: {topPerformer?.name} ({topPerformer?.score})
              </span>
            </div>
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={icpPerformance} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} width={75} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" name="Score" radius={[0, 3, 3, 0]}>
                {icpPerformance.map((entry, index) => (
                  <Cell key={index} fill={entry.name === topPerformer?.name ? '#D97706' : '#22D3EE'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['ICP', 'Clear Time', 'Detection', 'Accuracy', 'Score'].map(h => (
                    <th key={h} className="text-left pb-3" style={{ color: 'rgba(232,240,255,0.4)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...icpPerformance].sort((a, b) => b.score - a.score).map((icp) => (
                  <tr key={icp.name} className="row-hover" style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: icp.name === topPerformer?.name ? 'rgba(217,119,6,0.04)' : 'transparent',
                  }}>
                    <td className="py-3 font-semibold" style={{ color: icp.name === topPerformer?.name ? '#D97706' : '#E8F0FF' }}>
                      {icp.name}{icp.name === topPerformer?.name && <span className="ml-1" style={{ color: '#D97706' }}>★</span>}
                    </td>
                    <td className="py-3 font-mono" style={{ color: clearanceColor(icp.clearanceTime) }}>{icp.clearanceTime}m</td>
                    <td className="py-3 font-mono" style={{ color: '#60A5FA' }}>{icp.detectionRate}%</td>
                    <td className="py-3 font-mono" style={{ color: '#10B981' }}>{icp.accuracy}%</td>
                    <td className="py-3 font-mono font-bold" style={{ color: icp.name === topPerformer?.name ? '#D97706' : '#E8F0FF' }}>{icp.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModuleFooter />
    </div>
  );
}
