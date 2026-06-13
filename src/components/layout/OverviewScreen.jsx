import { ArrowRight } from 'lucide-react';
import ShinyText from '../ui/ShinyText.jsx';
import { aiInsights, icpOverview, securityAlerts } from '../../data/mockData.js';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';

const priorityCfg = {
  HIGH:   { color: '#F97316', border: 'rgba(249,115,22,0.22)',  label: 'High Priority' },
  MEDIUM: { color: '#F59E0B', border: 'rgba(245,158,11,0.18)',  label: 'Medium' },
  LOW:    { color: '#60A5FA', border: 'rgba(96,165,250,0.18)',  label: 'Advisory' },
};

export default function OverviewScreen({ setActive, icp, onStartTour }) {
  const selected = icpOverview.find(i => i.id === icp) || icpOverview[0];
  const critical = securityAlerts.filter(a => a.severity === 'CRITICAL').length;

  return (
    <div style={{ background: '#000' }}>

      {/* ══════════════════════════════════════════════════════════
          HERO — full viewport height
      ══════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#000' }}>

        {/* Video background */}
        <video
          autoPlay loop muted playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.38, zIndex: 1 }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 58%, rgba(0,0,0,0.96) 100%)',
        }} />

        {/* ── ZONE 1: Top info bar (desktop only) ── */}
        {/* FIX: no inline display — Tailwind hidden/sm:flex controls visibility */}
        <div
          className="hidden sm:flex"
          style={{
            position: 'absolute', top: '80px', left: 0, right: 0, zIndex: 10,
            justifyContent: 'space-between', alignItems: 'center',
            padding: '0 48px',
          }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', fontWeight: 500, textTransform: 'uppercase' }}>
            LPAI Nexus &nbsp;·&nbsp; Ministry of Home Affairs &nbsp;·&nbsp; Border Command Platform
          </span>
          <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
            <span className="live-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D47A', flexShrink: 0 }} />
            LIVE &nbsp;—&nbsp; 8,247 border crossings secured today across all 12 ICPs
          </span>
        </div>

        {/* ── ZONE 2: Center hero content ── */}
        {/*
          FIX: fills the full section with inset:0 and uses flex centering.
          Padding reserves space for Zone 1 (top ~108px) and Zone 3 KPI strip
          (bottom ~122px) so content is centered in the actual usable band
          and never overlaps or gets clipped behind either strip.
        */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '108px 40px 122px',
        }}>
          {/* Eyebrow label */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.32)',
            textTransform: 'uppercase',
            marginBottom: '22px',
            fontWeight: 500,
          }}>
            Axiom AI &nbsp;·&nbsp; Border Intelligence Engine &nbsp;·&nbsp; Est. 2024
          </p>

          {/* Main headings — FIX: smaller clamp so "Secured by Intelligence." fits the container */}
          <div data-tour="hero-section" style={{ marginBottom: '22px' }}>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              India's Borders.
            </h1>
            <ShinyText
              text="Secured by Intelligence."
              baseColor="#64CEFB"
              shineColor="#ffffff"
              speed={3}
              spread={100}
              className="hero-shiny"
            />
          </div>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '500px',
            margin: '0 auto 26px',
            lineHeight: 1.7,
          }}>
            The Land Port Authority of India's next-generation border intelligence platform —
            protecting sovereignty, facilitating trade, and powering India's 23 integrated check posts.
          </p>

          {/* CTA */}
          <button
            onClick={() => setActive('cargo')}
            className="group inline-flex items-center gap-2 rounded-full"
            style={{
              padding: '13px 30px',
              background: 'rgba(0,0,0,0.72)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              marginBottom: '18px',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,20,35,0.88)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.72)'}
          >
            Enter Command Dashboard
            <ArrowRight size={14} style={{ flexShrink: 0 }} className="group-hover:translate-x-1" />
          </button>

          {onStartTour && (
            <button
              onClick={onStartTour}
              style={{
                padding: '10px 24px', marginBottom: '18px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '13px', fontWeight: 400, cursor: 'pointer',
                borderRadius: '100px', letterSpacing: '0.01em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              ▶ Take a Guided Tour
            </button>
          )}

          {/* Trust row */}
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', margin: 0 }}>
            12 Active ICPs &nbsp;·&nbsp; ₹70,952 Cr Trade Facilitated &nbsp;·&nbsp; 30.46 Lakh Passengers Annually
          </p>
        </div>

        {/* ── ZONE 3: KPI strip — desktop (4 columns) ── */}
        {/*
          FIX: outer wrapper has NO inline display — Tailwind hidden/sm:block
          controls visibility without being overridden by an inline style.
          Inner div carries the grid layout styles.
        */}
        <div className="hidden sm:block" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>
          <div data-tour="hero-kpi-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              {
                label:  'Cargo Consignments Today',
                value:  selected.cargoToday.toLocaleString(),
                sub:    `${selected.cleared} cleared · ${selected.flagged} flagged`,
                module: 'cargo',        alert: false,
              },
              {
                label:  'Border Crossings Today',
                value:  selected.crossings.toLocaleString(),
                sub:    '494 foreign nationals · Petrapole ICP',
                module: 'immigration',  alert: false,
              },
              {
                label:  'Vehicles Processed Today',
                value:  selected.vehicles.toLocaleString(),
                sub:    '100% ANPR coverage · 8 overloaded',
                module: 'vehicle',      alert: false,
              },
              {
                label:  'Active Security Alerts',
                value:  String(securityAlerts.length),
                sub:    `${critical} critical · 8 of 9 cameras live`,
                module: 'surveillance', alert: true,
              },
            ].map((stat, i) => (
              <div
                key={i}
                onClick={() => setActive(stat.module)}
                style={{
                  padding: '20px 28px',
                  background: 'rgba(0,0,0,0.56)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderLeft: i === 3
                    ? '2px solid rgba(244,63,94,0.55)'
                    : i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.74)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.56)'}
              >
                <p style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', fontWeight: 600, color: stat.alert ? '#F43F5E' : '#E8F0FF', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 6px' }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', margin: 0 }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── ZONE 3: KPI strip — mobile (2×2) ── */}
        {/* FIX: same pattern — no inline display on outer wrapper */}
        <div className="sm:hidden" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { label: 'Cargo Today',  value: selected.cargoToday.toLocaleString(), alert: false, module: 'cargo' },
              { label: 'Crossings',    value: selected.crossings.toLocaleString(),  alert: false, module: 'immigration' },
              { label: 'Vehicles',     value: selected.vehicles.toLocaleString(),   alert: false, module: 'vehicle' },
              { label: 'Alerts',       value: String(securityAlerts.length),        alert: true,  module: 'surveillance' },
            ].map((stat, i) => (
              <div
                key={i}
                onClick={() => setActive(stat.module)}
                style={{
                  padding: '14px 18px',
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(24px)',
                  borderLeft:  i % 2 === 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  borderTop:   i >= 2      ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  cursor: 'pointer',
                }}
              >
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 5px' }}>{stat.label}</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 600, color: stat.alert ? '#F43F5E' : '#fff', letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════
          BELOW FOLD
      ══════════════════════════════════════════════════════════ */}
      <div style={{ background: '#070B14' }}>
        {/* Gradient transition */}
        <div style={{ height: '80px', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #070B14 100%)' }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24 space-y-16">

          {/* Secondary stats */}
          <div data-tour="secondary-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'System Health',  value: '98.4%',  sub: '11 of 12 ICPs operational',            color: '#10B981' },
              {
                label: 'Avg Clearance',
                value: `${selected.clearanceAvg}m`,
                sub: 'Average cargo clearance time',
                color: selected.clearanceAvg < 75 ? '#10B981' : selected.clearanceAvg < 100 ? '#F59E0B' : '#F43F5E',
              },
              { label: 'Duty Revenue',   value: '₹12.1Cr', sub: 'Collected today vs ₹10.5Cr target',  color: '#22D3EE' },
              { label: 'Axiom Insights', value: '4',        sub: 'AI reports generated today', color: '#A78BFA', module: 'analytics' },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => item.module && setActive(item.module)}
                className="glass glass-hover rounded-2xl p-6 relative overflow-hidden"
                style={{ cursor: item.module ? 'pointer' : 'default' }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: `linear-gradient(90deg, transparent 5%, ${item.color}55 40%, ${item.color}55 60%, transparent 95%)`,
                }} />
                <p style={{ fontSize: '9px', color: 'rgba(232,240,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '14px' }}>
                  {item.label}
                </p>
                <p style={{
                  fontSize: '2.6rem', fontWeight: 600, color: '#E8F0FF',
                  letterSpacing: '-0.04em', lineHeight: 1,
                  filter: `drop-shadow(0 0 14px ${item.color}55)`,
                }}>
                  {item.value}
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.38)', marginTop: '8px' }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Axiom Intelligence Briefing */}
          <div data-tour="axiom-briefing">
            {/* Intro paragraph */}
            <p style={{
              fontSize: '16px',
              color: 'rgba(232,240,255,0.55)',
              maxWidth: '680px',
              margin: '0 auto 32px',
              textAlign: 'center',
              fontStyle: 'italic',
              lineHeight: 1.7,
            }}>
              Axiom Intelligence Engine monitors 2,000+ cargo consignments and 8,000+ travellers daily
              across all 12 active ICPs — surfacing anomalies and alerting officers to threats before
              they reach the gate.
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center axiom-card">
                  <div className="w-2 h-2 rounded-full axiom-pulse" style={{ background: '#8B5CF6' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#E8F0FF' }}>Axiom Intelligence Briefing</p>
                  <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.3)' }}>
                    LPAI Intelligence Engine · Generated at 07:00 IST
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActive('analytics')}
                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{ background: 'rgba(34,211,238,0.07)', color: '#22D3EE', border: '1px solid rgba(34,211,238,0.18)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,211,238,0.13)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(34,211,238,0.07)'}
              >
                Full report →
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {aiInsights.map((insight, idx) => {
                const cfg = priorityCfg[insight.priority] || priorityCfg.LOW;
                return (
                  <div
                    key={insight.id}
                    data-tour={idx === 0 ? 'ai-insight-card' : undefined}
                    className="rounded-2xl p-6 transition-all duration-200"
                    style={{
                      background: 'rgba(13,22,38,0.9)',
                      border: `1px solid ${cfg.border}`,
                      borderLeft: `3px solid ${cfg.color}`,
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
                        {cfg.label}
                      </span>
                      <span className="ml-auto text-xs font-mono" style={{ color: 'rgba(232,240,255,0.2)' }}>
                        {insight.time}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold mb-2 leading-snug" style={{ color: '#E8F0FF' }}>
                      {insight.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,240,255,0.5)' }}>
                      {insight.summary}
                    </p>
                    <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-xs" style={{ color: 'rgba(232,240,255,0.22)' }}>{insight.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: 'rgba(232,240,255,0.22)' }}>Confidence</span>
                        <div className="w-20 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                          <div className="h-full rounded-full" style={{ width: `${insight.confidence}%`, background: '#10B981' }} />
                        </div>
                        <span className="text-xs font-semibold" style={{ color: '#10B981' }}>{insight.confidence}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All ICPs grid */}
          <div data-tour="icp-grid">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5" style={{ color: 'rgba(232,240,255,0.2)' }}>
              All LPAI Integrated Check Posts
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {icpOverview.map(item => {
                const isDown = item.status === 'maintenance';
                const isDeg  = item.status === 'degraded';
                const statusColor = isDown ? 'rgba(232,240,255,0.15)' : isDeg ? '#F97316' : '#10B981';
                return (
                  <div
                    key={item.id}
                    className="glass rounded-xl p-4 transition-all duration-200"
                    style={{
                      opacity: isDown ? 0.4 : 1,
                      border: isDeg ? '1px solid rgba(249,115,22,0.2)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={e => { if (!isDown) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = isDeg ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.08)'; }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-xs" style={{ color: '#22D3EE' }}>{item.id}</span>
                      <div className="flex items-center gap-1.5">
                        {item.alerts > 0 && (
                          <span className="text-xs font-bold blink" style={{ color: '#F43F5E', fontSize: '10px' }}>{item.alerts}</span>
                        )}
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                      </div>
                    </div>
                    <p className="text-sm font-semibold truncate" style={{ color: '#E8F0FF' }}>{item.name}</p>
                    <p className="text-xs truncate mb-3" style={{ color: 'rgba(232,240,255,0.3)' }}>{item.state}</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span style={{ color: 'rgba(232,240,255,0.3)' }}>Cargo</span>
                        <span className="font-medium" style={{ color: '#E8F0FF' }}>{item.cargoToday}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: 'rgba(232,240,255,0.3)' }}>Avg clear</span>
                        <span className="font-medium" style={{
                          color: item.clearanceAvg === 0 ? 'rgba(232,240,255,0.15)'
                            : item.clearanceAvg < 75 ? '#10B981'
                            : item.clearanceAvg < 100 ? '#F59E0B' : '#F43F5E',
                        }}>
                          {item.clearanceAvg === 0 ? '—' : `${item.clearanceAvg}m`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
