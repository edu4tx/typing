import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime = 30) => {
  const [timeLimit, setTimeLimit] = useState(initialTime);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'finished'

  const startTimer = useCallback(() => {
    if (status !== 'running') {
      setStatus('running');
    }
  }, [status]);

  const resetTimer = useCallback(() => {
    setStatus('idle');
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  // Handle time limit change
  useEffect(() => {
    resetTimer();
  }, [timeLimit, resetTimer]);

  useEffect(() => {
    let interval;
    if (status === 'running') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStatus('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  return {
    timeLimit,
    setTimeLimit,
    timeLeft,
    status,
    startTimer,
    resetTimer,
  };
};
