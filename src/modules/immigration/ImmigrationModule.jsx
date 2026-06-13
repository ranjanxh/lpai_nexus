import { useState, useMemo } from 'react';
import { Search, User, ShieldAlert } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import KPICard from '../../components/shared/KPICard.jsx';
import StatusBadge from '../../components/shared/StatusBadge.jsx';
import Modal from '../../components/ui/Modal.jsx';
import ModuleFooter from '../../components/ui/ModuleFooter.jsx';
import { useToast } from '../../components/ui/Toast.jsx';
import { immigrationRecords, queuePrediction, nationalityStats, getICPData } from '../../data/mockData.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs shadow-2xl" style={{ background: 'rgba(7,11,20,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)' }}>
      <p className="font-mono mb-2" style={{ color: 'rgba(232,240,255,0.4)' }}>{label}</p>
      {payload.map((p, i) => p.value != null && (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.stroke || p.fill || p.color }} />
          <span style={{ color: 'rgba(232,240,255,0.6)' }}>{p.name}:</span>
          <span style={{ color: '#E8F0FF' }} className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const counters = [
  { id: 1, status: 'Open',   officer: 'A. Sharma', processed: 312, nationality: 'All'     },
  { id: 2, status: 'Busy',   officer: 'P. Kumar',  processed: 289, nationality: 'Foreign' },
  { id: 3, status: 'Open',   officer: 'S. Devi',   processed: 276, nationality: 'All'     },
  { id: 4, status: 'Busy',   officer: 'R. Nair',   processed: 341, nationality: 'All'     },
  { id: 5, status: 'Busy',   officer: 'G. Singh',  processed: 198, nationality: 'Foreign' },
  { id: 6, status: 'Busy',   officer: 'M. Khan',   processed: 267, nationality: 'All'     },
  { id: 7, status: 'Open',   officer: 'T. Roy',    processed: 154, nationality: 'All'     },
  { id: 8, status: 'Closed', officer: '—',          processed: 0,   nationality: '—'       },
];

const nationalityFlag = { Bangladeshi: '🇧🇩', Indian: '🇮🇳', Nepali: '🇳🇵', Pakistani: '🇵🇰', Chinese: '🇨🇳' };

const travelHistory = [
  { date: '12 Nov 2024', port: 'Petrapole',  type: 'Tourist', status: 'Entry'        },
  { date: '28 Oct 2024', port: 'Petrapole',  type: 'Tourist', status: 'Exit'         },
  { date: '14 Sep 2024', port: 'Petrapole',  type: 'Tourist', status: 'Entry'        },
  { date: '08 Sep 2024', port: 'Petrapole',  type: 'Tourist', status: 'Exit'         },
  { date: '22 Jul 2024', port: 'Agartala',   type: 'Tourist', status: 'Entry & Exit' },
];

const riskScores = [
  { label: 'Travel History',     score: 72,  color: '#F59E0B' },
  { label: 'Document Validity',  score: 0,   color: '#F43F5E' },
  { label: 'Biometric Match',    score: 99,  color: '#10B981' },
  { label: 'Watchlist Status',   score: 15,  color: '#F43F5E' },
];

function SubjectProfileModal({ isOpen, onClose, toast }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Subject Profile — DETAINED" danger width="780px">
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px' }}>
        {/* Left column */}
        <div>
          <div style={{ width: '100%', aspectRatio: '3/4', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <User size={40} style={{ color: 'rgba(232,240,255,0.2)' }} />
            <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.2)', marginTop: '8px' }}>Biometric photo</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            {[
              ['Passport',      'BD3214567'],
              ['Name',          'Arif Hossain'],
              ['Nationality',   '🇧🇩 Bangladeshi'],
              ['Date of Birth', '14 Mar 1989 (35)'],
              ['Gender',        'Male'],
              ['Entry Type',    'Tourist'],
              ['Visa Type',     'Tourist Single Entry'],
              ['Visa Issue',    '01 Jul 2024'],
              ['Visa Expiry',   '30 Oct 2024 — EXPIRED'],
              ['Overstay',      '14 days'],
            ].map(([k, v]) => (
              <div key={k}>
                <span style={{ color: 'rgba(232,240,255,0.35)', display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{k}</span>
                <span style={{ color: k === 'Visa Expiry' ? '#F87171' : k === 'Overstay' ? '#F97316' : '#E8F0FF', fontWeight: k === 'Overstay' ? 600 : 400 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Travel history */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(232,240,255,0.3)', marginBottom: '10px' }}>
              Travel History — Last 5 Records
            </p>
            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                    {['Date', 'Port', 'Type', 'Status'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'rgba(232,240,255,0.35)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {travelHistory.map((r, i) => (
                    <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '8px 12px', color: 'rgba(232,240,255,0.55)', fontFamily: 'monospace' }}>{r.date}</td>
                      <td style={{ padding: '8px 12px', color: '#E8F0FF' }}>{r.port}</td>
                      <td style={{ padding: '8px 12px', color: 'rgba(232,240,255,0.5)' }}>{r.type}</td>
                      <td style={{ padding: '8px 12px', color: r.status.includes('Entry') ? '#10B981' : '#60A5FA' }}>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Biometric + Watchlist */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: '12px', padding: '14px' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#10B981', marginBottom: '6px' }}>Biometric</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#10B981' }}>Fingerprint MATCHED</p>
              <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.45)', marginTop: '4px' }}>Confidence: 99.2%</p>
            </div>
            <div style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '12px', padding: '14px' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F87171', marginBottom: '6px' }}>Watchlist</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#F87171' }}>BoI — Visa Overstay</p>
              <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.45)', marginTop: '4px' }}>Category: Overstay</p>
            </div>
          </div>

          {/* Risk assessment */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(232,240,255,0.3)' }}>Risk Assessment</p>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '4px', background: 'rgba(244,63,94,0.15)', color: '#F87171', border: '1px solid rgba(244,63,94,0.3)' }}>
                CRITICAL
              </span>
            </div>
            {riskScores.map(r => (
              <div key={r.label} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(232,240,255,0.55)' }}>{r.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: r.color }}>{r.score}/100</span>
                </div>
                <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)' }}>
                  <div style={{ height: '100%', borderRadius: '2px', width: `${r.score}%`, background: r.color, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <button
              onClick={() => { toast({ type: 'success', message: 'Alert escalated to DCP Sunita Menon · Control Room notified · Case ID: DET-2024-0847 generated' }); onClose(); }}
              style={{ flex: 1, padding: '10px 16px', background: 'rgba(244,63,94,0.12)', color: '#F87171', border: '1px solid rgba(244,63,94,0.28)', borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
            >
              Escalate to DCP
            </button>
            <button
              onClick={() => { toast({ type: 'info', message: 'Detention Report DET-2024-0847 generated · Dispatched to: MHA · BoI HQ · District Magistrate, Nadia' }); }}
              style={{ flex: 1, padding: '10px 16px', background: 'rgba(255,255,255,0.05)', color: 'rgba(232,240,255,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
            >
              Generate Report
            </button>
            <button
              onClick={() => { toast({ type: 'info', message: 'Bureau of Immigration HQ contacted · Reference: DET-2024-0847 · Awaiting response' }); }}
              style={{ flex: 1, padding: '10px 16px', background: 'rgba(255,255,255,0.05)', color: 'rgba(232,240,255,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
            >
              Contact BoI HQ
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function ImmigrationModule({ icp = 'PTP' }) {
  const icpData = getICPData(icp);
  const toast = useToast();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRecords = useMemo(() => {
    return immigrationRecords.filter(rec => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        rec.passport.toLowerCase().includes(q) ||
        rec.name.toLowerCase().includes(q) ||
        rec.nationality.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || rec.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [searchQuery, statusFilter]);

  const hasFilters = searchQuery || statusFilter !== 'all';
  const statusOptions = ['all', ...new Set(immigrationRecords.map(r => r.status))];

  const selectStyle = {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', color: 'rgba(232,240,255,0.65)', fontSize: '12px',
    padding: '7px 10px', cursor: 'pointer', outline: 'none',
  };

  return (
    <div className="max-w-[1160px] mx-auto space-y-10">

      <SubjectProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} toast={toast} />

      {/* Module Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-4" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }}>
          <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: '#00D47A' }} />
          <span className="text-xs font-medium" style={{ color: '#22D3EE', letterSpacing: '0.04em' }}>LPAI Nexus · {icpData.name} ICP</span>
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 300, letterSpacing: '-0.025em', color: '#E8F0FF', lineHeight: 1.1 }}>
          People Movement
        </h1>
        <p className="text-sm mt-2.5" style={{ color: 'rgba(232,240,255,0.38)', fontStyle: 'italic', lineHeight: 1.6 }}>
          Axiom reads every passport in under 1 second and cross-checks against national watchlists automatically.
        </p>
      </div>

      {/* KPI Row */}
      <div data-tour="immigration-kpi-row" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Crossings"     value={icpData.crossings.toLocaleString()} sub="today"               change={3}  color="blue" />
        <KPICard label="Indian Nationals"     value="1,847"                              sub="citizens"             change={1}  color="green" />
        <KPICard label="Foreign Nationals"    value="494"                                sub="arrivals"             change={7}  color="white" />
        <KPICard label="Flagged / Detained"   value="12"                                 sub="requiring action"     change={20} color="red" pulse />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div data-tour="queue-chart" className="glass rounded-2xl p-6">
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,240,255,0.2)', marginBottom: '20px' }}>
            Queue Prediction — Next 6 Hours
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={queuePrediction} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(232,240,255,0.2)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="rgba(232,240,255,0.2)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="time" tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(232,240,255,0.4)' }} />
              <Area type="monotone" dataKey="actual" name="Actual" stroke="#22D3EE" strokeWidth={2} fill="url(#actualGrad)" connectNulls={false} dot={false} />
              <Area type="monotone" dataKey="predicted" name="Predicted" stroke="rgba(232,240,255,0.3)" strokeWidth={2} strokeDasharray="5 5" fill="url(#predictedGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6">
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,240,255,0.2)', marginBottom: '20px' }}>
            Nationality Breakdown
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={nationalityStats} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis dataKey="nationality" type="category" tick={{ fill: 'rgba(232,240,255,0.3)', fontSize: 10 }} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(232,240,255,0.4)' }} />
              <Bar dataKey="entries" name="Entries" fill="#60A5FA" radius={[0, 2, 2, 0]} />
              <Bar dataKey="exits" name="Exits" fill="#10B981" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Counter Status Grid */}
      <div data-tour="counter-grid" className="glass rounded-2xl p-6">
        <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,240,255,0.2)', marginBottom: '20px' }}>
          Immigration Counter Status
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {counters.map(c => {
            const statusColor = c.status === 'Open' ? '#10B981' : c.status === 'Busy' ? '#F97316' : 'rgba(232,240,255,0.2)';
            const statusBg = c.status === 'Open' ? 'rgba(16,185,129,0.06)' : c.status === 'Busy' ? 'rgba(249,115,22,0.06)' : 'rgba(255,255,255,0.02)';
            return (
              <div key={c.id} className="rounded-xl p-3 text-center" style={{ background: statusBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#E8F0FF', marginBottom: '4px' }}>C{c.id}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: statusColor, marginBottom: '4px' }}>{c.status}</div>
                <div style={{ fontSize: '11px', color: 'rgba(232,240,255,0.35)' }} className="truncate">{c.officer}</div>
                {c.processed > 0 && <div style={{ fontSize: '10px', color: 'rgba(232,240,255,0.25)', fontFamily: 'monospace', marginTop: '4px' }}>{c.processed}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Immigration Records Table */}
      <div data-tour="immigration-table" className="glass rounded-2xl overflow-hidden">
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8F0FF' }}>Immigration Records</h2>
              <p style={{ fontSize: '12px', color: 'rgba(232,240,255,0.32)', marginTop: '3px' }}>Click a DETAINED row to open subject profile</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(232,240,255,0.25)', pointerEvents: 'none' }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by passport, name, or nationality..."
                style={{ width: '100%', paddingLeft: '30px', paddingRight: '12px', paddingTop: '7px', paddingBottom: '7px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#E8F0FF', fontSize: '12px', outline: 'none' }}
              />
            </div>
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
                {['Passport', 'Name', 'Nationality', 'Visa', 'Risk', 'Status', 'Counter', 'Time'].map(h => (
                  <th key={h} className="text-left px-5 py-3" style={{ color: 'rgba(232,240,255,0.4)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '40px 24px', textAlign: 'center', color: 'rgba(232,240,255,0.25)', fontSize: '13px' }}>
                    No records match current filters.{' '}
                    <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} style={{ color: '#22D3EE', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
                      Clear filters
                    </button>
                  </td>
                </tr>
              ) : filteredRecords.map((rec) => (
                <tr
                  key={rec.id}
                  onClick={rec.status === 'DETAINED' ? () => setProfileOpen(true) : undefined}
                  className="row-hover"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: rec.status === 'DETAINED' ? 'rgba(244,63,94,0.06)' : 'transparent',
                    cursor: rec.status === 'DETAINED' ? 'pointer' : 'default',
                  }}
                >
                  <td className="px-5 py-3.5 font-mono" style={{ color: '#60A5FA', fontSize: '12px' }}>{rec.passport}</td>
                  <td className="px-5 py-3.5 font-medium" style={{ color: '#E8F0FF' }}>{rec.name}</td>
                  <td className="px-5 py-3.5" style={{ color: 'rgba(232,240,255,0.5)' }}>{nationalityFlag[rec.nationality] || ''} {rec.nationality}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={rec.visa} /></td>
                  <td className="px-5 py-3.5"><StatusBadge status={rec.riskLevel} /></td>
                  <td className="px-5 py-3.5"><StatusBadge status={rec.status} /></td>
                  <td className="px-5 py-3.5 text-center font-mono" style={{ color: 'rgba(232,240,255,0.4)', fontSize: '12px' }}>{rec.counter}</td>
                  <td className="px-5 py-3.5 font-mono" style={{ color: 'rgba(232,240,255,0.3)', fontSize: '12px' }}>{rec.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
          <span style={{ fontSize: '11px', color: 'rgba(232,240,255,0.28)' }}>
            Showing {filteredRecords.length} of {immigrationRecords.length} records
          </span>
          {hasFilters && (
            <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} style={{ fontSize: '11px', color: '#22D3EE', background: 'none', border: 'none', cursor: 'pointer' }}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Watchlist Alert */}
      <div data-tour="watchlist-alert" className="rounded-2xl p-6" style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)', backdropFilter: 'blur(14px)' }}>
        <div className="flex items-start gap-4">
          <ShieldAlert size={18} style={{ color: '#F87171', flexShrink: 0, marginTop: '2px' }} className="blink" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#F87171' }}>Active Watchlist Alert</span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(232,240,255,0.25)' }}>08:47</span>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#E8F0FF', marginBottom: '4px' }}>
              Arif Hossain — Passport BD3214567
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(232,240,255,0.5)', lineHeight: 1.55 }}>
              Bangladeshi national detained at Counter 8 — visa expired 14 days ago. Currently in holding area. CISF team notified. BoI database match confirmed.
            </p>
            <div className="flex gap-3 mt-4 flex-wrap">
              <button
                onClick={() => { toast({ type: 'success', message: 'Alert escalated to DCP Sunita Menon · Control Room notified · Case ID: DET-2024-0847 generated' }); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{ background: 'rgba(244,63,94,0.15)', color: '#F87171', border: '1px solid rgba(244,63,94,0.25)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,63,94,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,63,94,0.15)'}
              >
                Escalate to DCP
              </button>
              <button
                data-tour="profile-modal-trigger"
                onClick={() => setProfileOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(232,240,255,0.7)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                View Full Profile
              </button>
              <button
                onClick={() => { toast({ type: 'info', message: 'Detention Report DET-2024-0847 generated · Dispatched to MHA, BoI HQ, District Magistrate' }); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(232,240,255,0.7)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Generate Detention Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModuleFooter />
    </div>
  );
}
