function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function getTooltipStyle(highlightRect, step) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const TW = 420;
  const gap = 14;
  const pad = 16;

  if (!highlightRect || step.type !== 'default') {
    return {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: step.type === 'center' || step.type === 'transition' ? '560px' : `${TW}px`,
      maxWidth: `calc(100vw - 32px)`,
      zIndex: 9993,
    };
  }

  if (W < 640) {
    return {
      position: 'fixed',
      bottom: '16px',
      left: '16px',
      right: '16px',
      width: 'auto',
      zIndex: 9993,
    };
  }

  const centreX = clamp(
    highlightRect.left + highlightRect.width / 2 - TW / 2,
    pad,
    W - TW - pad
  );

  if (highlightRect.top > H / 2) {
    return {
      position: 'fixed',
      bottom: `${H - highlightRect.top + gap}px`,
      left: `${centreX}px`,
      width: `${TW}px`,
      zIndex: 9993,
    };
  }

  return {
    position: 'fixed',
    top: `${highlightRect.bottom + gap}px`,
    left: `${centreX}px`,
    width: `${TW}px`,
    zIndex: 9993,
  };
}

export default function WalkthroughTooltip({
  step,
  stepIndex,
  totalSteps,
  highlightRect,
  visible,
  onNext,
  onPrev,
  onExit,
  onRestart,
}) {
  if (!visible || !step) return null;

  const isFirst = stepIndex === 0;
  const isLast = step.isFinal;
  const isCenterCard = step.type === 'center' || step.type === 'transition' || !highlightRect;
  const style = getTooltipStyle(highlightRect, step);

  if (step.type === 'transition') {
    return (
      <div style={{ ...style, pointerEvents: 'none' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(6,10,18,0.98) 0%, rgba(13,22,38,0.98) 100%)',
            border: '1px solid rgba(34,211,238,0.22)',
            borderRadius: '20px',
            padding: '48px 52px',
            textAlign: 'center',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(34,211,238,0.06)',
            animation: 'walkthroughEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ fontSize: '52px', marginBottom: '18px' }}>{step.emoji}</div>
          <div style={{
            fontSize: '10px', letterSpacing: '0.2em', color: '#22D3EE',
            textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600,
          }}>
            {step.badge}
          </div>
          <h2 style={{
            fontSize: '26px', fontWeight: 700, color: '#E8F0FF',
            letterSpacing: '-0.02em', marginBottom: '14px', lineHeight: 1.15,
          }}>
            {step.title}
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(232,240,255,0.5)', lineHeight: 1.65 }}>
            {step.body}
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(232,240,255,0.22)', marginTop: '20px', letterSpacing: '0.04em' }}>
            Loading module…
          </p>
        </div>
      </div>
    );
  }

  const progress = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <div style={{ ...style, animation: 'walkthroughEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div
        style={{
          background: 'rgba(6,10,18,0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(34,211,238,0.08)',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Progress bar */}
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
            transition: 'width 0.4s ease',
          }} />
        </div>

        <div style={{ padding: '22px 24px 20px' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {step.emoji && (
                <span style={{ fontSize: '20px' }}>{step.emoji}</span>
              )}
              <span style={{
                fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.14em', color: '#22D3EE',
                background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)',
                borderRadius: '4px', padding: '2px 7px',
              }}>
                {step.badge}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: 'rgba(232,240,255,0.25)', fontFamily: 'monospace' }}>
                {stepIndex + 1} / {totalSteps}
              </span>
              <button
                onClick={onExit}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(232,240,255,0.3)', fontSize: '16px',
                  lineHeight: 1, padding: '2px 4px', borderRadius: '4px',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(232,240,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,240,255,0.3)'}
                title="Exit tour (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Center card stats (intro/final) */}
          {isCenterCard && step.stats && (
            <div style={{
              display: 'grid', gridTemplateColumns: `repeat(${step.stats.length}, 1fr)`,
              gap: '10px', marginBottom: '16px',
            }}>
              {step.stats.map((stat, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '12px 8px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                }}>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#22D3EE', letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(232,240,255,0.35)', marginTop: '3px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 style={{
            fontSize: '15px', fontWeight: 700, color: '#E8F0FF',
            letterSpacing: '-0.015em', marginBottom: '10px', lineHeight: 1.3,
          }}>
            {step.title}
          </h3>

          {/* Body */}
          <p style={{
            fontSize: '13px', color: 'rgba(232,240,255,0.55)',
            lineHeight: 1.68, whiteSpace: 'pre-line',
          }}>
            {step.body}
          </p>

          {/* Footer nav */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: '18px', paddingTop: '14px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            gap: '8px',
          }}>
            <button
              onClick={onPrev}
              disabled={isFirst}
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', padding: '7px 14px',
                fontSize: '12px', color: isFirst ? 'rgba(232,240,255,0.2)' : 'rgba(232,240,255,0.6)',
                cursor: isFirst ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isFirst) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#E8F0FF'; } }}
              onMouseLeave={e => { if (!isFirst) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(232,240,255,0.6)'; } }}
            >
              ← Back
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {/* Keyboard hint */}
              <span style={{ fontSize: '10px', color: 'rgba(232,240,255,0.18)', alignSelf: 'center' }}>
                ← → Space · Esc
              </span>
            </div>

            {isLast ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={onRestart}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '7px 14px',
                    fontSize: '12px', color: 'rgba(232,240,255,0.6)',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#E8F0FF'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(232,240,255,0.6)'; }}
                >
                  ↺ Restart
                </button>
                <button
                  onClick={onExit}
                  style={{
                    background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
                    border: 'none', borderRadius: '8px', padding: '7px 18px',
                    fontSize: '12px', fontWeight: 600, color: '#fff',
                    cursor: 'pointer', letterSpacing: '0.01em',
                  }}
                >
                  Enter Dashboard →
                </button>
              </div>
            ) : (
              <button
                onClick={onNext}
                style={{
                  background: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(139,92,246,0.14))',
                  border: '1px solid rgba(34,211,238,0.3)',
                  borderRadius: '8px', padding: '7px 18px',
                  fontSize: '12px', fontWeight: 600, color: '#22D3EE',
                  cursor: 'pointer', transition: 'all 0.15s', letterSpacing: '0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.22)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(139,92,246,0.14))'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
