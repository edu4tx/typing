import { motion, AnimatePresence } from 'framer-motion';
import { StatItem } from './StatItem';

export const StatsBar = ({ status, stats }) => {
  return (
    <AnimatePresence>
      {status !== 'idle' && (
        <motion.div 
          initial={{ opacity: 0, height: 0, y: -20, filter: 'blur(8px)', marginBottom: 0 }}
          animate={{ opacity: 1, height: 'auto', y: 0, filter: 'blur(0px)', marginBottom: 40 }}
          exit={{ opacity: 0, height: 0, y: -20, filter: 'blur(8px)', marginBottom: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-6 gap-4 overflow-hidden"
        >
          <StatItem label="WPM" value={stats.wpm} />
          <StatItem label="Accuracy" value={`${stats.accuracy}%`} />
          <StatItem label="Time" value={`${stats.elapsed}s`} />
          <StatItem label="Correct" value={stats.correctChars} />
          <StatItem label="Incorrect" value={stats.incorrectChars} color="text-red-500" />
          <StatItem label="Mistakes" value={stats.mistakes} color="text-red-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
