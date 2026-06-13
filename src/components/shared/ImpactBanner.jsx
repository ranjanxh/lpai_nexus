import { ArrowRight } from 'lucide-react';

export default function ImpactBanner({ icon: Icon, title, subtitle, before, after, stat, statLabel }) {
  return (
    <div className="rounded-xl border border-navy-700 bg-gradient-to-r from-navy-900 via-navy-900 to-navy-800 px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">

        {/* Module identity */}
        <div className="flex items-start gap-3 md:w-48 flex-shrink-0">
          {Icon && (
            <div className="p-2 rounded-lg bg-navy-800 border border-navy-700 text-gold mt-0.5">
              <Icon size={16} />
            </div>
          )}
          <div>
            <h2 className="text-sm font-bold text-white">{title}</h2>
            <p className="text-xs text-blue-300/50 mt-0.5 leading-relaxed">{subtitle}</p>
          </div>
        </div>

        <div className="hidden md:block w-px h-12 bg-navy-700 flex-shrink-0" />

        {/* Before / After */}
        <div className="flex items-center gap-3 flex-1">
          {/* Before */}
          <div className="flex-1 rounded-lg bg-red-500/5 border border-red-500/15 px-4 py-3">
            <p className="text-xs font-bold text-red-400/70 uppercase tracking-wider mb-1.5">Without AI</p>
            <p className="text-sm text-blue-300/60 leading-relaxed">{before}</p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <ArrowRight size={16} className="text-gold" />
          </div>

          {/* After */}
          <div className="flex-1 rounded-lg bg-emerald-500/5 border border-emerald-500/15 px-4 py-3">
            <p className="text-xs font-bold text-emerald-400/70 uppercase tracking-wider mb-1.5">With AI</p>
            <p className="text-sm text-blue-300/70 leading-relaxed">{after}</p>
          </div>
        </div>

        {/* Stat */}
        {stat && (
          <>
            <div className="hidden md:block w-px h-12 bg-navy-700 flex-shrink-0" />
            <div className="flex-shrink-0 text-center md:w-32">
              <div className="text-2xl font-bold text-gold">{stat}</div>
              <div className="text-xs text-blue-300/40 mt-0.5 leading-tight">{statLabel}</div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
