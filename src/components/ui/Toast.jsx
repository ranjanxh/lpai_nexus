import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

const iconMap = { success: CheckCircle, warning: AlertTriangle, error: AlertCircle, info: Info };
const colorMap = {
  success: { accent: '#10B981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)', left: '#10B981' },
  warning: { accent: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)', left: '#F59E0B' },
  error:   { accent: '#F43F5E', bg: 'rgba(244,63,94,0.08)',   border: 'rgba(244,63,94,0.25)',  left: '#F43F5E' },
  info:    { accent: '#60A5FA', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.25)', left: '#60A5FA' },
};

function ToastItem({ toast }) {
  const cfg = colorMap[toast.type] || colorMap.info;
  const Icon = iconMap[toast.type] || iconMap.info;
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      padding: '14px 16px',
      background: 'rgba(6,10,18,0.97)',
      border: `1px solid ${cfg.border}`,
      borderLeft: `3px solid ${cfg.left}`,
      borderRadius: '12px',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      minWidth: '300px', maxWidth: '440px',
      animation: 'toastIn 0.25s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <Icon size={14} style={{ color: cfg.accent, flexShrink: 0, marginTop: '2px' }} />
      <p style={{ fontSize: '13px', color: '#E8F0FF', lineHeight: 1.55, flex: 1 }}>{toast.message}</p>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', message, duration = 4500 }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{
        position: 'fixed', top: '80px', right: '20px', zIndex: 9999,
        display: 'flex', flexDirection: 'column', gap: '10px',
        pointerEvents: 'none',
      }}>
        {toasts.map(t => <ToastItem key={t.id} toast={t} />)}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
