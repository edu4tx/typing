import { useState, useEffect, useCallback } from 'react';

export const useTypingEngine = (words, onStart, disabled) => {
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize state when words change
  useEffect(() => {
    setTypedWords(words.map(() => ''));
    setCurrentWordIndex(0);
    setHasStarted(false);
  }, [words]);

  const reset = useCallback(() => {
    setTypedWords(words.map(() => ''));
    setCurrentWordIndex(0);
    setHasStarted(false);
  }, [words]);

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    
    // We only care about single characters, Backspace, and Space
    const key = e.key;
    
    // Ignore modifier combinations
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const isTypingKey = key.length === 1 || key === 'Backspace';
    
    if (isTypingKey && !hasStarted) {
      setHasStarted(true);
      if (onStart) onStart();
    }

    // Handle space (move to next word)
    if (key === ' ') {
      e.preventDefault();
      // Allow moving to next word only if something was typed in the current word,
      // or if we're just skipping (we can allow skipping to simulate standard behavior)
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex((prev) => prev + 1);
      }
    } 
    // Handle backspace
    else if (key === 'Backspace') {
      e.preventDefault();
      setTypedWords((prev) => {
        const newTyped = [...prev];
        const currentTyped = newTyped[currentWordIndex];
        
        if (currentTyped.length > 0) {
          // Remove last character of current word
          newTyped[currentWordIndex] = currentTyped.slice(0, -1);
        } else if (currentWordIndex > 0) {
          // Move back to previous word if current word is empty
          setCurrentWordIndex((prevIdx) => prevIdx - 1);
        }
        return newTyped;
      });
    }
    // Handle regular typing (single characters)
    else if (key.length === 1) {
      e.preventDefault();
      setTypedWords((prev) => {
        const newTyped = [...prev];
        // Limit max extra characters typed to prevent layout breaking (e.g., word.length + 10)
        const wordLimit = words[currentWordIndex].length + 10;
        if (newTyped[currentWordIndex].length < wordLimit) {
          newTyped[currentWordIndex] += key;
        }
        return newTyped;
      });
    }
  }, [currentWordIndex, words, disabled, hasStarted, onStart]);

  // Global keydown listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    typedWords,
    currentWordIndex,
    reset
  };
};
