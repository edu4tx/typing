import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { generateRandomWords } from './utils/wordGenerator';
import { useTypingEngine } from './hooks/useTypingEngine';
import { useTimer } from './hooks/useTimer';
import { useStats } from './hooks/useStats';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { TypingArea } from './components/TypingArea';

function App() {
  const [words, setWords] = useState([]);
  const [restartKey, setRestartKey] = useState(0);

  // Modular Hooks
  const { timeLimit, setTimeLimit, timeLeft, status, startTimer, resetTimer } = useTimer(30);

  const { typedWords, currentWordIndex, reset: resetEngine } = useTypingEngine(
    words,
    startTimer,
    status === 'finished'
  );

  const stats = useStats({
    typedWords,
    words,
    timeLimit,
    timeLeft,
    currentWordIndex
  });

  // Orchestration logic
  const handleRestart = useCallback(() => {
    resetTimer();
    setWords(generateRandomWords(200));
    resetEngine();
    setRestartKey(prev => prev + 1);
  }, [resetTimer, resetEngine]);

  useEffect(() => {
    handleRestart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLimit]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        handleRestart();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleRestart();
      }
    };
    
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleRestart]);

  return (
    <div className="min-h-screen bg-[#5B8DEF] flex items-center justify-center p-6 sm:p-12 md:p-20 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1024px] bg-white rounded-[32px] p-8 sm:p-12 lg:p-20 shadow-[0_12px_40px_rgb(0,0,0,0.06),0_40px_80px_rgb(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 mix-blend-overlay"></div>
        
        <Header 
          status={status}
          timeLeft={timeLeft}
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
          onRestart={handleRestart}
        />
        
        <StatsBar status={status} stats={stats} />
        
        <TypingArea 
          words={words}
          typedWords={typedWords}
          currentWordIndex={currentWordIndex}
          status={status}
          restartKey={restartKey}
        />
      </motion.div>
    </div>
  );
}

export default App;
