import { X, Brain, AlertTriangle } from 'lucide-react';
import { securityAlerts, aiInsights } from '../../data/mockData.js';

const severityConfig = {
  CRITICAL: { bar: 'border-l-red-500',    badge: 'bg-red-500/15 text-red-400 border-red-500/30',       blink: 'blink-critical', dot: 'bg-red-400 pulse-alert' },
  HIGH:     { bar: 'border-l-orange-400', badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30', blink: '', dot: 'bg-orange-400' },
  MEDIUM:   { bar: 'border-l-yellow-400', badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30', blink: '', dot: 'bg-yellow-400' },
  LOW:      { bar: 'border-l-blue-400',   badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',       blink: '', dot: 'bg-blue-400' },
};

const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };

export default function AlertPanel({ onClose }) {
  const sorted = [...securityAlerts].sort((a, b) =>
    (severityOrder[a.severity] ?? 4) - (severityOrder[b.severity] ?? 4)
  );

  const critical = sorted.filter(a => a.severity === 'CRITICAL');
  const rest     = sorted.filter(a => a.severity !== 'CRITICAL');

  return (
    <div className="w-[280px] bg-navy-900 border-l border-navy-700 flex flex-col flex-shrink-0 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-navy-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <AlertTriangle size={13} className="text-red-400" />
          <span className="text-xs font-bold text-white uppercase tracking-widest">Active Alerts</span>
          <span className="bg-red-500/20 text-red-400 text-xs font-bold rounded-full px-1.5 py-0.5 border border-red-500/30 pulse-alert">
            {securityAlerts.length}
          </span>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-navy-800 text-blue-300/40 hover:text-white transition-colors">
          <X size={13} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">

          {/* Critical first */}
          {critical.map(alert => {
            const cfg = severityConfig[alert.severity];
            return (
              <div key={alert.id} className={`bg-navy-950 rounded-lg border border-navy-700 border-l-2 ${cfg.bar} p-3 ${cfg.blink}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {alert.severity}
                  </span>
                  <span className="text-xs text-blue-300/30 font-mono ml-auto">{alert.time.split(' ')[0]}</span>
                </div>
                <p className="text-xs font-semibold text-white mb-1 leading-tight">{alert.type}</p>
                <p className="text-xs text-blue-300/55 leading-relaxed line-clamp-3">{alert.description}</p>
                <p className="text-xs text-blue-300/30 mt-1.5">{alert.zone}</p>
              </div>
            );
          })}

          {/* Section divider */}
          {critical.length > 0 && rest.length > 0 && (
            <div className="flex items-center gap-2 py-1">
              <div className="flex-1 h-px bg-navy-700" />
              <span className="text-xs text-blue-300/30">Other alerts</span>
              <div className="flex-1 h-px bg-navy-700" />
            </div>
          )}

          {rest.map(alert => {
            const cfg = severityConfig[alert.severity] || severityConfig.LOW;
            return (
              <div key={alert.id} className={`bg-navy-950 rounded-lg border border-navy-700 border-l-2 ${cfg.bar} p-3`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {alert.severity}
                  </span>
                  <span className="text-xs text-blue-300/30 font-mono ml-auto">{alert.time.split(' ')[0]}</span>
                </div>
                <p className="text-xs font-semibold text-white mb-1 leading-tight">{alert.type}</p>
                <p className="text-xs text-blue-300/50 leading-relaxed line-clamp-2">{alert.description}</p>
                <p className="text-xs text-blue-300/30 mt-1.5">{alert.zone}</p>
              </div>
            );
          })}
        </div>

        {/* AI Quick Insights */}
        <div className="border-t border-navy-700 p-3">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={12} className="text-gold" />
            <span className="text-xs font-bold text-gold uppercase tracking-widest">AI Briefing</span>
          </div>
          <div className="space-y-3">
            {aiInsights.slice(0, 2).map(insight => (
              <div key={insight.id} className="bg-navy-950 rounded-lg border border-navy-700 p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-bold ${
                    insight.priority === 'HIGH' ? 'text-orange-400' :
                    insight.priority === 'MEDIUM' ? 'text-yellow-400' : 'text-blue-400'
                  }`}>{insight.priority}</span>
                  <span className="text-xs text-blue-300/30 ml-auto">{insight.category}</span>
                </div>
                <p className="text-xs font-semibold text-white mb-1 leading-tight">{insight.title}</p>
                <p className="text-xs text-blue-300/50 leading-relaxed line-clamp-3">{insight.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
