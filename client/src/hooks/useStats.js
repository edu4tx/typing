import { useMemo } from 'react';

export const useStats = ({ typedWords, words, timeLimit, timeLeft, currentWordIndex }) => {
  return useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    
    typedWords.forEach((typed, wIdx) => {
      const word = words[wIdx];
      if (!word) return;
      
      for (let cIdx = 0; cIdx < typed.length; cIdx++) {
        if (cIdx >= word.length) {
          incorrect++;
        } else if (typed[cIdx] === word[cIdx]) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const typedSpaces = Math.max(0, currentWordIndex);
    correct += typedSpaces;

    const total = correct + incorrect;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
    
    const elapsedSeconds = timeLimit - timeLeft;
    const elapsedMinutes = elapsedSeconds / 60;
    const wpm = elapsedMinutes > 0 ? Math.round((correct / 5) / elapsedMinutes) : 0;

    return {
      wpm,
      accuracy,
      correctChars: correct,
      incorrectChars: incorrect,
      mistakes: incorrect,
      elapsed: elapsedSeconds
    };
  }, [typedWords, words, timeLimit, timeLeft, currentWordIndex]);
};
