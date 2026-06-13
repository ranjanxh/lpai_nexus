import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, width = '680px', danger = false }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '16px',
        animation: 'toastIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: width,
          maxHeight: '90vh',
          background: 'rgba(7,11,20,0.99)',
          border: `1px solid ${danger ? 'rgba(244,63,94,0.25)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: danger ? 'rgba(244,63,94,0.06)' : 'rgba(255,255,255,0.02)',
          flexShrink: 0,
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: danger ? '#F87171' : '#E8F0FF' }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,240,255,0.35)', padding: '4px', borderRadius: '6px', lineHeight: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = '#E8F0FF'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,240,255,0.35)'}
            aria-label="Close modal"
          >
            <X size={17} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
