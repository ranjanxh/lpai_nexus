// Helper: convert a hex/rgba color to rgba with a given alpha for bg
function dotColorToRgba(dot, alpha) {
  // Map known hex colors to their rgb components
  const hexMap = {
    '#10B981': '16,185,129',
    '#F43F5E': '244,63,94',
    '#F59E0B': '245,158,11',
    '#F97316': '249,115,22',
    '#60A5FA': '96,165,250',
    '#818CF8': '129,140,248',
    '#F87171': '248,113,113',
  };
  if (hexMap[dot]) return `rgba(${hexMap[dot]},${alpha})`;
  return dot; // fallback: return as-is
}

const map = {
  // Operational
  'operational':  { dot: '#10B981', text: '#10B981', label: 'Operational' },
  'active':       { dot: '#10B981', text: '#10B981', label: 'Active' },
  'online':       { dot: '#10B981', text: '#10B981', label: 'Online' },
  'CLEARED':      { dot: '#10B981', text: '#10B981', label: 'Cleared', bg: true },
  'Cleared':      { dot: '#10B981', text: '#10B981', label: 'Cleared', bg: true },
  'Green':        { dot: '#10B981', text: '#10B981', label: 'Green', bg: true },
  'Cleared (exit)': { dot: '#10B981', text: '#10B981', label: 'Cleared', bg: true },
  'Matched':      { dot: '#10B981', text: '#10B981', label: 'Matched', bg: true },
  'Valid':        { dot: '#10B981', text: '#10B981', label: 'Valid', bg: true },
  'Low':          { dot: '#10B981', text: '#10B981', label: 'Low' },
  'Open':         { dot: '#10B981', text: '#10B981', label: 'Open' },

  // Warning
  'degraded':     { dot: '#F59E0B', text: '#F59E0B', label: 'Degraded' },
  'PENDING':      { dot: '#F59E0B', text: '#F59E0B', label: 'Pending', bg: true },
  'UNDER REVIEW': { dot: '#60A5FA', text: '#60A5FA', label: 'Review', bg: true },
  'Busy':         { dot: '#F97316', text: '#F97316', label: 'Busy' },
  'Yellow':       { dot: '#F59E0B', text: '#F59E0B', label: 'Yellow', bg: true },
  'Orange':       { dot: '#F97316', text: '#F97316', label: 'Orange', bg: true },
  'Medium':       { dot: '#F59E0B', text: '#F59E0B', label: 'Medium' },
  'Monitoring':   { dot: '#F59E0B', text: '#F59E0B', label: 'Monitoring', bg: true },
  'Weighbridge Check':  { dot: '#F59E0B', text: '#F59E0B', label: 'Weighbridge Check', bg: true },
  'Document Check':     { dot: '#F59E0B', text: '#F59E0B', label: 'Document Check', bg: true },
  'Secondary Check':    { dot: '#F59E0B', text: '#F59E0B', label: 'Secondary Check', bg: true },
  'Under Examination':  { dot: '#F97316', text: '#F97316', label: 'Under Exam', bg: true },
  'Physical Check':     { dot: '#F97316', text: '#F97316', label: 'Physical Check', bg: true },

  // Critical / High risk
  'CRITICAL':     { dot: '#F43F5E', text: '#F43F5E', label: 'Critical', bg: true, pulse: true },
  'Critical':     { dot: '#F43F5E', text: '#F43F5E', label: 'Critical', bg: true, pulse: true },
  'HIGH':         { dot: '#F97316', text: '#F97316', label: 'High', bg: true },
  'High':         { dot: '#F43F5E', text: '#F43F5E', label: 'High', bg: true },
  'MEDIUM':       { dot: '#F59E0B', text: '#F59E0B', label: 'Medium', bg: true },
  'LOW':          { dot: '#60A5FA', text: '#60A5FA', label: 'Low', bg: true },
  'FLAGGED':      { dot: '#F43F5E', text: '#F43F5E', label: 'Flagged', bg: true, pulse: true },
  'FLAGGED — No Appointment': { dot: '#F43F5E', text: '#F43F5E', label: 'Flagged', bg: true, pulse: true },
  'DETAINED':     { dot: '#F43F5E', text: '#F43F5E', label: 'Detained', bg: true, pulse: true },
  'Held':         { dot: '#F43F5E', text: '#F43F5E', label: 'Held', bg: true },
  'Held — Full Exam': { dot: '#F43F5E', text: '#F43F5E', label: 'Held — Full Exam', bg: true },
  'Red':          { dot: '#F43F5E', text: '#F43F5E', label: 'Red', bg: true },
  'ACTIVE':       { dot: '#F43F5E', text: '#F43F5E', label: 'Active', bg: true, pulse: true },
  'Active':       { dot: '#F43F5E', text: '#F43F5E', label: 'Active', bg: true, pulse: true },
  'Investigating': { dot: '#F97316', text: '#F97316', label: 'Investigating', bg: true },
  'Overloaded — Hold': { dot: '#F43F5E', text: '#F43F5E', label: 'Overloaded', bg: true },
  'No TAS Record': { dot: '#F43F5E', text: '#F43F5E', label: 'No TAS Record', bg: true, pulse: true },
  'EXPIRED':      { dot: '#F43F5E', text: '#F43F5E', label: 'Expired', bg: true, pulse: true },
  'Expired':      { dot: '#F43F5E', text: '#F43F5E', label: 'Expired', bg: true },

  // Dim / offline
  'maintenance':  { dot: 'rgba(232,240,255,0.2)', text: 'rgba(232,240,255,0.3)', label: 'Maintenance' },
  'Maintenance':  { dot: 'rgba(232,240,255,0.2)', text: 'rgba(232,240,255,0.3)', label: 'Maintenance' },
  'offline':      { dot: 'rgba(232,240,255,0.15)', text: 'rgba(232,240,255,0.25)', label: 'Offline' },
  'Closed':       { dot: 'rgba(232,240,255,0.15)', text: 'rgba(232,240,255,0.25)', label: 'Closed' },
  'N/A':          { dot: 'rgba(232,240,255,0.15)', text: 'rgba(232,240,255,0.25)', label: 'N/A' },

  // Info / neutral
  'RESOLVED':     { dot: '#10B981', text: '#10B981', label: 'Resolved', bg: true },
  'INVESTIGATING':{ dot: '#F59E0B', text: '#F59E0B', label: 'Investigating', bg: true },
  'Tourist':      { dot: '#60A5FA', text: '#60A5FA', label: 'Tourist' },
  'Business':     { dot: '#818CF8', text: '#818CF8', label: 'Business' },
  'Transit':      { dot: '#F59E0B', text: '#F59E0B', label: 'Transit' },
  'Diplomatic':   { dot: '#10B981', text: '#10B981', label: 'Diplomatic' },
  'Cross-border': { dot: '#60A5FA', text: '#60A5FA', label: 'Cross-border' },
  'LOW RISK':     { dot: '#10B981', text: '#10B981', label: 'Low Risk' },
  'MEDIUM RISK':  { dot: '#F59E0B', text: '#F59E0B', label: 'Med Risk', bg: true },
  'HIGH RISK':    { dot: '#F43F5E', text: '#F43F5E', label: 'High Risk', bg: true },
};

export default function StatusBadge({ status }) {
  const cfg = map[status];

  if (!cfg) {
    // Fallback: raw string in dim text
    return (
      <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'rgba(232,240,255,0.35)' }}>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(232,240,255,0.2)' }} />
        {status}
      </span>
    );
  }

  if (cfg.bg) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${cfg.pulse ? 'blink' : ''}`}
        style={{
          background: dotColorToRgba(cfg.dot, 0.1),
          border: `1px solid ${dotColorToRgba(cfg.dot, 0.18)}`,
          color: cfg.text,
          fontSize: '10px',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
        {cfg.label}
      </span>
    );
  }

  // Dot + text only, no background
  return (
    <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: cfg.text, fontSize: '10px' }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}
