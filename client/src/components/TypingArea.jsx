import { motion } from 'framer-motion';
import { Word } from './Word';

export const TypingArea = ({ words, typedWords, currentWordIndex, status, restartKey }) => {
  return (
    <motion.div 
      key={restartKey}
      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
      animate={{ opacity: status === 'finished' ? 0.3 : 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-4 sm:gap-y-6 text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.4] sm:leading-[1.5] font-medium font-mono select-none focus:outline-none relative"
    >
      {words.map((word, wIdx) => {
        const typed = typedWords[wIdx] || '';
        const isCurrentWord = wIdx === currentWordIndex;
        const isPastWord = wIdx < currentWordIndex;
        
        return (
          <Word 
            key={wIdx}
            word={word}
            typed={typed}
            isCurrentWord={isCurrentWord}
            isPastWord={isPastWord}
            status={status}
          />
        );
      })}
    </motion.div>
  );
};
