import { useState } from 'react';
import { ToastProvider } from './components/ui/Toast.jsx';
import TopNav from './components/layout/TopNav.jsx';
import OverviewScreen from './components/layout/OverviewScreen.jsx';
import CargoModule from './modules/cargo/CargoModule.jsx';
import ImmigrationModule from './modules/immigration/ImmigrationModule.jsx';
import SurveillanceModule from './modules/surveillance/SurveillanceModule.jsx';
import VehicleModule from './modules/vehicle/VehicleModule.jsx';
import AnalyticsModule from './modules/analytics/AnalyticsModule.jsx';
import WalkthroughController from './components/walkthrough/WalkthroughController.jsx';
import { useWalkthrough } from './components/walkthrough/useWalkthrough.js';

const pages = {
  overview:     (props) => <OverviewScreen {...props} />,
  cargo:        (props) => <CargoModule {...props} />,
  immigration:  (props) => <ImmigrationModule {...props} />,
  surveillance: (props) => <SurveillanceModule {...props} />,
  vehicle:      (props) => <VehicleModule {...props} />,
  analytics:    (props) => <AnalyticsModule {...props} />,
};

function FloatingTourButton({ onStart, completed }) {
  return (
    <button
      onClick={onStart}
      title={completed ? 'Restart guided tour' : 'Take a guided tour'}
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 9980,
        width: '48px', height: '48px', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(139,92,246,0.12))',
        border: '1px solid rgba(34,211,238,0.35)',
        color: '#22D3EE', fontSize: '18px', fontWeight: 700,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        animation: 'tourButtonPulse 4s ease-in-out infinite',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 32px rgba(34,211,238,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
      }}
    >
      ?
    </button>
  );
}

export default function App() {
  const [active, setActive] = useState('overview');
  const [icp, setIcp] = useState('PTP');
  const tour = useWalkthrough();

  const isOverview = active === 'overview';
  const Page = pages[active] || pages.overview;

  return (
    <ToastProvider>
      <style>{`
        @keyframes tourButtonPulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 0 0 0 rgba(34,211,238,0.25); }
          50%       { box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 0 0 8px rgba(34,211,238,0); }
        }
      `}</style>

      <div style={{ background: isOverview ? '#000' : '#070B14', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        {!isOverview && <div className="dot-grid" />}
        <TopNav active={active} setActive={setActive} icp={icp} setIcp={setIcp} />
        <main
          key={active}
          className={isOverview ? '' : 'page-enter'}
          style={isOverview ? {} : {
            paddingTop: '88px',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            paddingBottom: '2rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Page setActive={setActive} icp={icp} onStartTour={tour.start} />
        </main>
      </div>

      <WalkthroughController
        step={tour.step}
        stepIndex={tour.stepIndex}
        totalSteps={tour.totalSteps}
        isActive={tour.isActive}
        activeModule={active}
        setActive={setActive}
        onNext={tour.next}
        onPrev={tour.prev}
        onExit={tour.exit}
        onRestart={tour.restart}
      />

      {!tour.isActive && (
        <FloatingTourButton onStart={tour.start} completed={tour.completed} />
      )}
    </ToastProvider>
  );
}
