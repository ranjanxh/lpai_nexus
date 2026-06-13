import { useState, useCallback } from 'react';
import { STEPS } from './walkthroughSteps.js';

export function useWalkthrough() {
  const [isActive, setIsActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(
    () => localStorage.getItem('lpai_tour_completed') === 'true'
  );

  const start = useCallback(() => {
    setStepIndex(0);
    setIsActive(true);
  }, []);

  const next = useCallback(() => {
    setStepIndex(prev => {
      const nextIdx = prev + 1;
      if (nextIdx >= STEPS.length) {
        setIsActive(false);
        setCompleted(true);
        localStorage.setItem('lpai_tour_completed', 'true');
        return prev;
      }
      return nextIdx;
    });
  }, []);

  const prev = useCallback(() => {
    setStepIndex(prev => Math.max(0, prev - 1));
  }, []);

  const exit = useCallback(() => {
    setIsActive(false);
  }, []);

  const restart = useCallback(() => {
    setStepIndex(0);
    setIsActive(true);
    setCompleted(false);
    localStorage.removeItem('lpai_tour_completed');
  }, []);

  return {
    isActive,
    stepIndex,
    step: STEPS[stepIndex] || null,
    completed,
    totalSteps: STEPS.length,
    start,
    next,
    prev,
    exit,
    restart,
  };
}
