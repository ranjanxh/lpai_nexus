import { useState, useEffect } from 'react';

export default function ModuleFooter() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const ts = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  return (
    <div style={{ marginTop: '3rem', paddingTop: '1.25rem', paddingBottom: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.055)' }}>
      <p style={{ fontSize: '10px', color: 'rgba(232,240,255,0.15)', textAlign: 'center', letterSpacing: '0.07em', fontFamily: 'monospace' }}>
        LPAI NEXUS &nbsp;·&nbsp; MINISTRY OF HOME AFFAIRS, GOVERNMENT OF INDIA &nbsp;·&nbsp; DATA CLASSIFICATION: RESTRICTED &nbsp;·&nbsp; LAST SYNC: {ts} IST
      </p>
    </div>
  );
}
