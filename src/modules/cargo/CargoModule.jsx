import React, { useState, useMemo } from 'react';
import { X, Search, ChevronDown, AlertTriangle, FileText } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import KPICard from '../../components/shared/KPICard.jsx';
import StatusBadge from '../../components/shared/StatusBadge.jsx';
import ModuleFooter from '../../components/ui/ModuleFooter.jsx';
import { cargoData, cargoThroughput, riskDistribution, clearanceStages, cargoAnomalies, getICPData } from '../../data/mockData.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs shadow-2xl" style={{ background: 'rgba(7,11,20,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)' }}>
      <p className="font-mono mb-2" style={{ color: 'rgba(232,240,255,0.4)' }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill || p.color }} />
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

const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: '16px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
    <div>
      <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8F0FF' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.32)', marginTop: '3px' }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default function CargoModule({ icp = 'PTP' }) {
  const icpData = getICPData(icp);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dismissedAnomalies, setDismissedAnomalies] = useState([]);
  const [expandedAnomaly, setExpandedAnomaly] = useState(null);
  const [flaggedBEs, setFlaggedBEs] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [laneFilter, setLaneFilter] = useState('all');

  const activeAnomalies = cargoAnomalies.filter(a => !dismissedAnomalies.includes(a.id));

  const filteredData = useMemo(() => {
    return cargoData.filter(row => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        row.id.toLowerCase().includes(q) ||
        row.declarant.toLowerCase().includes(q) ||
        row.commodity.toLowerCase().includes(q) ||
        row.origin.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || row.status === statusFilter;
      const matchLane   = laneFilter   === 'all' || row.lane   === laneFilter;
      return matchSearch && matchStatus && matchLane;
    });
  }, [searchQuery, statusFilter, laneFilter]);

  const hasFilters = searchQuery || statusFilter !== 'all' || laneFilter !== 'all';

  const statusOptions = ['all', ...new Set(cargoData.map(r => r.status))];
  const laneOptions   = ['all', 'Green', 'Yellow', 'Orange', 'Red'];

  const selectStyle = {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', color: 'rgba(232,240,255,0.65)', fontSize: '12px',
    padding: '7px 10px', cursor: 'pointer', outline: 'none',
  };

  return (
    <div className="max-w-[1160px] mx-auto space-y-10">

      {/* Module Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-4" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }}>
          <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: '#00D47A' }} />
          <span className="text-xs font-medium" style={{ color: '#22D3EE', letterSpacing: '0.04em' }}>LPAI Nexus · {icpData.name} ICP</span>
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 300, letterSpacing: '-0.025em', color: '#E8F0FF', lineHeight: 1.1 }}>
          Cargo Clearance
        </h1>
        <p className="text-sm mt-2.5" style={{ color: 'rgba(232,240,255,0.38)', fontStyle: 'italic', lineHeight: 1.6 }}>
          Axiom reads every document in seconds and assigns each shipment a risk score — no manual checking required.
        </p>
      </div>

      {/* KPI Row */}
      <div data-tour="cargo-kpi-row" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Received Today"    value={icpData.cargoToday.toLocaleString()} sub="consignments"       change={12} color="white" />
        <KPICard label="Cleared"           value={icpData.cleared.toLocaleString()}     sub="auto + manual"      change={8}  color="green" />
        <KPICard label="Under Review"      value={icpData.pending.toLocaleString()}     sub="awaiting processing" change={-5} color="yellow" />
        <KPICard label="Flagged by Axiom"  value={icpData.flagged.toLocaleString()}     sub="for examination"    change={22} color="red" pulse />
      </div>

      {/* Risk Ribbon */}
      <div data-tour="risk-ribbon" className="glass rounded-2xl p-6">
        <SectionHeader title="Risk Ribbon" subtitle={`${icpData.cargoToday} consignments today — Petrapole ICP`} />
        <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5 mb-4">
          <div style={{ width: '57%', background: '#10B981', borderRadius: '6px 0 0 6px' }} />
          <div style={{ width: '23%', background: '#F59E0B' }} />
          <div style={{ width: '15%', background: '#F97316' }} />
          <div style={{ width: '5%',  background: '#F43F5E', borderRadius: '0 6px 6px 0' }} />
        </div>
        <div className="flex items-center gap-6 text-xs flex-wrap">
          {[
            { label: 'Green — Cleared',  value: '487', color: '#10B981' },
            { label: 'Yellow — Review',  value: '198', color: '#F59E0B' },
            { label: 'Orange — Inspect', value: '124', color: '#F97316' },
            { label: 'Red — Hold',       value: '38',  color: '#F43F5E' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span style={{ color: 'rgba(232,240,255,0.4)' }}>{item.label}</span>
              <span className="font-semibold" style={{ color: '#E8F0FF' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div data-tour="cargo-chart" className="lg:col-span-3 glass rounded-2xl p-6">
          <SectionHeader title="Cargo Throughput" subtitle="Today — hourly" />
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={cargoThroughput} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="hour" tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(232,240,255,0.4)', paddingTop: '8px' }} />
              <Bar dataKey="cleared" name="Cleared" stackId="a" fill="#10B981" />
              <Bar dataKey="pending" name="Pending" stackId="a" fill="#F59E0B" />
              <Bar dataKey="flagged" name="Flagged" stackId="a" fill="#F43F5E" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div data-tour="risk-donut" className="lg:col-span-2 glass rounded-2xl p-6">
          <SectionHeader title="Risk Distribution" />
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={38} outerRadius={60} dataKey="value" paddingAngle={2}>
                {riskDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip content={({ active, payload }) => active && payload?.length ? (
                <div className="rounded-xl p-2 text-xs shadow-2xl" style={{ background: 'rgba(7,11,20,0.97)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: payload[0].payload.color }}>{payload[0].payload.name}</p>
                  <p style={{ color: '#E8F0FF' }} className="font-bold">{payload[0].value} consignments</p>
                </div>
              ) : null} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {riskDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span style={{ color: 'rgba(232,240,255,0.45)' }}>{item.name}</span>
                </div>
                <span className="font-semibold" style={{ color: '#E8F0FF' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consignment Table */}
      <div data-tour="cargo-table" className="glass rounded-2xl overflow-hidden">
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <SectionHeader
            title="Consignment Queue"
            subtitle={`Sample data · Petrapole ICP`}
            action={
              <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.3)' }}>
                {cargoData.length} total entries
              </span>
            }
          />
          {/* Search/filter bar */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(232,240,255,0.25)', pointerEvents: 'none' }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by BE number, declarant, commodity..."
                style={{ width: '100%', paddingLeft: '30px', paddingRight: '12px', paddingTop: '7px', paddingBottom: '7px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#E8F0FF', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <select value={laneFilter} onChange={e => setLaneFilter(e.target.value)} style={selectStyle}>
              {laneOptions.map(o => <option key={o} value={o} style={{ background: '#0D1626' }}>{o === 'all' ? 'All Lanes' : `Lane: ${o}`}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
              <option value="all" style={{ background: '#0D1626' }}>All Status</option>
              {statusOptions.filter(s => s !== 'all').map(o => <option key={o} value={o} style={{ background: '#0D1626' }}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['BE Number', 'Declarant', 'Commodity', 'Origin', 'Risk', 'Status', 'Time'].map(h => (
                  <th key={h} className="text-left px-5 py-3" style={{ color: 'rgba(232,240,255,0.4)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px 24px', textAlign: 'center', color: 'rgba(232,240,255,0.25)', fontSize: '13px' }}>
                    No consignments match current filters.{' '}
                    <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); setLaneFilter('all'); }} style={{ color: '#22D3EE', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
                      Clear filters
                    </button>
                  </td>
                </tr>
              ) : filteredData.map((row, rowIdx) => (
                <React.Fragment key={row.id}>
                  <tr
                    onClick={() => setSelectedRow(selectedRow === row.id ? null : row.id)}
                    className="row-hover cursor-pointer"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: selectedRow === row.id ? 'rgba(34,211,238,0.04)' : row.riskScore >= 81 ? 'rgba(244,63,94,0.04)' : 'transparent',
                    }}
                  >
                    <td className="px-5 py-3.5 font-mono" style={{ color: '#60A5FA', fontSize: '12px' }}>{row.id}</td>
                    <td className="px-5 py-3.5 font-medium" style={{ color: '#E8F0FF' }}>{row.declarant}</td>
                    <td className="px-5 py-3.5" style={{ color: 'rgba(232,240,255,0.5)' }}>{row.commodity}</td>
                    <td className="px-5 py-3.5" style={{ color: 'rgba(232,240,255,0.5)' }}>{row.origin}</td>
                    <td data-tour={rowIdx === 0 ? 'risk-score-cell' : undefined} className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold" style={{ color: riskColor(row.riskScore) }}>{row.riskScore}</span>
                        <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <div className="h-full rounded-full" style={{ width: `${row.riskScore}%`, background: riskColor(row.riskScore) }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={flaggedBEs.has(row.id) ? 'Under Examination' : row.status} /></td>
                    <td className="px-5 py-3.5 font-mono" style={{ color: 'rgba(232,240,255,0.3)', fontSize: '12px' }}>{row.time}</td>
                  </tr>
                  {selectedRow === row.id && (
                    <tr key={`${row.id}-detail`}>
                      <td colSpan={7} className="px-5 py-5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,240,255,0.25)', marginBottom: '16px' }}>
                          Clearance Pipeline — {row.id}
                        </p>
                        <div className="flex items-center gap-1 overflow-x-auto pb-2">
                          {clearanceStages.map((stage, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <div className="flex flex-col items-center min-w-[80px]">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1" style={{
                                  background: stage.status === 'done' ? '#22D3EE' : stage.status === 'active' ? 'rgba(34,211,238,0.18)' : 'rgba(255,255,255,0.08)',
                                  color: stage.status === 'done' ? '#070B14' : stage.status === 'active' ? '#E8F0FF' : 'rgba(232,240,255,0.3)',
                                  fontSize: '11px',
                                }}>
                                  {idx + 1}
                                </div>
                                <span className="text-center leading-tight" style={{ fontSize: '11px', color: stage.status === 'done' ? '#22D3EE' : stage.status === 'active' ? '#E8F0FF' : 'rgba(232,240,255,0.25)' }}>{stage.stage}</span>
                                <span style={{ fontSize: '10px', color: 'rgba(232,240,255,0.2)', marginTop: '2px' }}>{stage.duration}m</span>
                              </div>
                              {idx < clearanceStages.length - 1 && (
                                <div className="h-0.5 w-6 flex-shrink-0 rounded-full" style={{ background: stage.status === 'done' ? '#22D3EE' : 'rgba(255,255,255,0.08)' }} />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '12px' }}>
                          <div><span style={{ color: 'rgba(232,240,255,0.35)' }}>Officer:</span> <span style={{ color: '#E8F0FF', marginLeft: '4px' }}>{row.officer}</span></div>
                          <div><span style={{ color: 'rgba(232,240,255,0.35)' }}>Documents:</span> <span style={{ color: row.documents === 'Verified' ? '#10B981' : '#F97316', marginLeft: '4px' }}>{row.documents}</span></div>
                          <div><span style={{ color: 'rgba(232,240,255,0.35)' }}>Declared value:</span> <span style={{ color: '#E8F0FF', marginLeft: '4px' }}>₹{(row.value / 100000).toFixed(2)}L</span></div>
                          <div><span style={{ color: 'rgba(232,240,255,0.35)' }}>Weight (D/A):</span> <span style={{ color: row.weight !== row.declaredWeight ? '#F97316' : '#10B981', marginLeft: '4px' }}>{row.declaredWeight.toLocaleString()} / {row.weight.toLocaleString()} kg</span></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
          <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.28)' }}>
            Showing {filteredData.length} of {cargoData.length} records
          </span>
          {hasFilters && (
            <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); setLaneFilter('all'); }} style={{ fontSize: '11px', color: '#22D3EE', background: 'none', border: 'none', cursor: 'pointer' }}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Axiom Anomaly Detection */}
      {activeAnomalies.length > 0 && (
        <div data-tour="anomaly-panel" className="glass rounded-2xl p-6">
          <SectionHeader
            title="Axiom Anomaly Detection"
            subtitle={`${activeAnomalies.length} active anomalies requiring attention`}
            action={
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#F43F5E' }}>
                {activeAnomalies.length} Active
              </span>
            }
          />
          <div className="space-y-3">
            {activeAnomalies.map(anomaly => {
              const accentColor = anomaly.severity === 'CRITICAL' ? '#F43F5E' : anomaly.severity === 'HIGH' ? '#F97316' : '#F59E0B';
              const isExpanded = expandedAnomaly === anomaly.id;
              return (
                <div
                  key={anomaly.id}
                  className="rounded-xl overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${accentColor}` }}
                >
                  <div
                    className="flex items-start gap-4 p-4 cursor-pointer"
                    onClick={() => setExpandedAnomaly(isExpanded ? null : anomaly.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: accentColor }}>{anomaly.severity}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8F0FF' }}>{anomaly.type}</span>
                        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(232,240,255,0.22)', marginLeft: 'auto' }}>{anomaly.time}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'rgba(232,240,255,0.52)' }}>{anomaly.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); setDismissedAnomalies(p => [...p, anomaly.id]); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,240,255,0.2)', lineHeight: 0, padding: '4px' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#E8F0FF'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,240,255,0.2)'}
                        aria-label="Dismiss anomaly"
                      >
                        <X size={13} />
                      </button>
                      <ChevronDown size={14} style={{ color: 'rgba(232,240,255,0.3)', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: '0 16px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ paddingTop: '14px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'start' }}>
                        <div>
                          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(232,240,255,0.3)', marginBottom: '8px' }}>
                            Recommended Action
                          </p>
                          <p style={{ fontSize: '13px', color: 'rgba(232,240,255,0.75)', lineHeight: 1.6 }}>{anomaly.action}</p>
                          <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.35)', marginTop: '10px' }}>
                            <span style={{ color: 'rgba(232,240,255,0.22)' }}>Assigned officer:</span>{' '}
                            {anomaly.officer}
                          </p>
                        </div>
                        <button
                          onClick={() => setFlaggedBEs(prev => {
                            const next = new Set(prev);
                            const beId = anomaly.description.match(/BE2024\/[A-Z]+\/\d+/)?.[0];
                            if (beId) next.add(beId);
                            setExpandedAnomaly(null);
                            return next;
                          })}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '8px 14px',
                            background: `rgba(${accentColor === '#F43F5E' ? '244,63,94' : accentColor === '#F97316' ? '249,115,22' : '245,158,11'},0.12)`,
                            border: `1px solid ${accentColor}44`,
                            borderRadius: '8px', color: accentColor,
                            fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <AlertTriangle size={12} />
                          Flag for Inspection
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ModuleFooter />
    </div>
  );
}
