import React from 'react';
import { motion } from 'framer-motion';

export const Word = React.memo(({ word, typed, isCurrentWord, isPastWord, status }) => {
  const charsToRender = word.length > typed.length ? word.split('') : (word + typed.slice(word.length)).split('');

  return (
    <div className={`relative flex transition-opacity duration-300 ${isPastWord ? 'opacity-80' : 'opacity-100'}`}>
      {charsToRender.map((char, cIdx) => {
        const isTyped = cIdx < typed.length;
        const isCorrect = isTyped && typed[cIdx] === word[cIdx];
        const isExtra = cIdx >= word.length;
        const isCurrentChar = isCurrentWord && cIdx === typed.length && status !== 'finished';

        let charClass = "text-[#CBD5E1]"; // Default untyped
        if (isTyped) {
          if (isExtra) {
            charClass = "text-red-500 bg-red-100/50 rounded-sm";
          } else if (isCorrect) {
            charClass = "text-slate-800";
          } else {
            charClass = "text-red-500";
          }
        }

        return (
          <span key={cIdx} className={`relative ${charClass}`}>
            {isCurrentChar && (
              <motion.div
                layoutId="caret"
                className="absolute -left-[2px] top-[10%] bottom-[10%] w-[3px] bg-blue-500 rounded-full animate-caret-blink"
                transition={{ type: "spring", stiffness: 600, damping: 35, mass: 0.5 }}
              />
            )}
            {char}
          </span>
        );
      })}
      
      {isCurrentWord && typed.length >= charsToRender.length && status !== 'finished' && (
        <span className="relative">
          <motion.div
            layoutId="caret"
            className="absolute -left-[2px] top-[10%] bottom-[10%] w-[3px] bg-blue-500 rounded-full animate-caret-blink"
            transition={{ type: "spring", stiffness: 600, damping: 35, mass: 0.5 }}
          />
        </span>
      )}
      
      {isCurrentWord && status !== 'finished' && (
        <motion.span 
          layoutId="underline"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-slate-200 rounded-full opacity-50"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </div>
  );
});
