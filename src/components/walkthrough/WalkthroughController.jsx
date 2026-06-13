import { useEffect, useRef, useState, useCallback } from 'react';
import WalkthroughOverlay from './WalkthroughOverlay.jsx';
import WalkthroughTooltip from './WalkthroughTooltip.jsx';

export default function WalkthroughController({
  step,
  stepIndex,
  totalSteps,
  isActive,
  activeModule,
  setActive,
  onNext,
  onPrev,
  onExit,
  onRestart,
}) {
  const [highlightRect, setHighlightRect] = useState(null);
  const [visible, setVisible] = useState(false);

  const timerRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const targetElRef = useRef(null);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
  };

  // Update rect when element moves (scroll / resize)
  const updateRect = useCallback(() => {
    if (targetElRef.current) {
      setHighlightRect(targetElRef.current.getBoundingClientRect());
    }
  }, []);

  // Keyboard nav
  useEffect(() => {
    if (!isActive) return;
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); onNext(); }
      else if (e.key === 'ArrowLeft')               { e.preventDefault(); onPrev(); }
      else if (e.key === 'Escape')                  { e.preventDefault(); onExit(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isActive, onNext, onPrev, onExit]);

  // Main step effect
  useEffect(() => {
    if (!isActive || !step) {
      setVisible(false);
      setHighlightRect(null);
      targetElRef.current = null;
      return;
    }

    clearTimers();
    setVisible(false);
    setHighlightRect(null);
    targetElRef.current = null;

    if (step.type === 'transition') {
      setActive(step.module);
      setVisible(true);
      if (step.autoAdvance) {
        timerRef.current = setTimeout(onNext, step.autoAdvance);
      }
      return;
    }

    if (!step.target) {
      setVisible(true);
      return;
    }

    const needsModuleChange = step.module && step.module !== activeModule;
    if (needsModuleChange) {
      setActive(step.module);
    }

    const navDelay = needsModuleChange ? 650 : 80;

    timerRef.current = setTimeout(() => {
      const el = document.querySelector(`[data-tour="${step.target}"]`);

      if (!el) {
        setVisible(true);
        return;
      }

      targetElRef.current = el;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      scrollTimerRef.current = setTimeout(() => {
        setHighlightRect(el.getBoundingClientRect());
        setVisible(true);
      }, 420);
    }, navDelay);

    return clearTimers;
  }, [isActive, stepIndex]);

  // Track element position on scroll/resize
  useEffect(() => {
    if (!visible || !targetElRef.current) return;
    window.addEventListener('scroll', updateRect, { passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, [visible, updateRect]);

  // Cleanup on unmount
  useEffect(() => () => clearTimers(), []);

  if (!isActive || !step) return null;

  return (
    <>
      <WalkthroughOverlay
        step={step}
        highlightRect={highlightRect}
        padding={step.highlightPadding ?? 8}
        visible={visible}
      />
      <WalkthroughTooltip
        step={step}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        highlightRect={highlightRect}
        visible={visible}
        onNext={onNext}
        onPrev={onPrev}
        onExit={onExit}
        onRestart={onRestart}
      />
    </>
  );
}
