export default function WalkthroughOverlay({ step, highlightRect, padding, visible }) {
  if (!visible) return null;

  const isSpotlight = highlightRect && step.type === 'default';

  if (!isSpotlight) {
    return (
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9990,
          background: 'rgba(0,0,0,0.84)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          pointerEvents: 'all',
        }}
      />
    );
  }

  const p = padding;
  return (
    <div
      style={{
        position: 'fixed',
        top: `${highlightRect.top - p}px`,
        left: `${highlightRect.left - p}px`,
        width: `${highlightRect.width + p * 2}px`,
        height: `${highlightRect.height + p * 2}px`,
        borderRadius: '10px',
        zIndex: 9991,
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.78)',
        border: '1.5px solid rgba(34,211,238,0.55)',
        outline: '4px solid rgba(34,211,238,0.08)',
        pointerEvents: 'none',
        animation: 'walkthroughPulse 2.5s ease-in-out infinite',
      }}
    />
  );
}
