import { motion, AnimatePresence } from 'framer-motion';
import { FaUndo } from 'react-icons/fa';

const TIMER_OPTIONS = [15, 30, 60, 120];

export const Header = ({ status, timeLeft, timeLimit, setTimeLimit, onRestart }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12 select-none">
      <motion.div layout className="flex items-center gap-4">
        <motion.div 
          animate={{ 
            backgroundColor: status === 'running' ? '#3b82f6' : status === 'finished' ? '#ef4444' : '#cbd5e1',
            boxShadow: status === 'running' ? '0 0 12px rgba(59,130,246,0.6)' : 'none'
          }}
          className={`w-2 h-2 rounded-full ${status === 'running' ? 'animate-pulse' : ''}`} 
        />
        <motion.h2 layout className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 tabular-nums">
          {timeLeft}s
        </motion.h2>
      </motion.div>
      
      <div className="flex items-center gap-6">
        <AnimatePresence mode="popLayout">
          {status === 'idle' && (
            <motion.div 
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 text-sm font-semibold tracking-wide"
            >
              {TIMER_OPTIONS.map(time => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.1, color: '#3b82f6' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTimeLimit(time)}
                  className={`transition-colors duration-200 focus:outline-none ${timeLimit === time ? 'text-blue-500' : 'text-slate-400'}`}
                >
                  {time}s
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button 
          whileHover={{ scale: 1.15, rotate: 180 }}
          whileTap={{ scale: 0.85, rotate: -90 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={onRestart}
          className="text-slate-400 hover:text-slate-800 transition-colors duration-200 focus:outline-none focus:bg-slate-100 rounded-full p-2 origin-center"
          title="Restart Test"
        >
          <FaUndo size={16} />
        </motion.button>
      </div>
    </div>
  );
};
