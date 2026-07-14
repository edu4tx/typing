import { WORDS } from '../data/index';

/**
 * Generates an array of random words.
 * @param {number} count - The number of random words to generate.
 * @returns {string[]} An array of random words.
 */
export const generateRandomWords = (count = 200) => {
  const words = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    words.push(WORDS[randomIndex]);
  }
  return words;
};
