import React from 'react';
import LetterTile from './LetterTile';

export default function WordGrid({ guesses, currentGuess, targetWord, currentRowIndex, shakeRowIndex }) {
  const TOTAL_ROWS = 6;
  const WORD_LENGTH = 5;

  /**
   * Evaluates the match statuses of a guess against the target word.
   * Accurately handles duplicate letters in both target and guess.
   * 
   * @param {string} guess 
   * @returns {Array<'correct' | 'present' | 'absent'>}
   */
  const evaluateGuess = (guess) => {
    const statuses = Array(WORD_LENGTH).fill('absent');
    const targetLetterCount = {};
    
    // Step 1: Count letters in target word
    for (let char of targetWord) {
      targetLetterCount[char] = (targetLetterCount[char] || 0) + 1;
    }

    // Step 2: First pass - identify all correct matches (Green)
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guess[i] === targetWord[i]) {
        statuses[i] = 'correct';
        targetLetterCount[guess[i]]--;
      }
    }

    // Step 3: Second pass - identify partial matches (Yellow)
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (statuses[i] !== 'correct') {
        const letter = guess[i];
        if (targetLetterCount[letter] && targetLetterCount[letter] > 0) {
          statuses[i] = 'present';
          targetLetterCount[letter]--;
        }
      }
    }

    return statuses;
  };

  const rows = [];

  for (let i = 0; i < TOTAL_ROWS; i++) {
    if (i < guesses.length) {
      // Completed row
      const guess = guesses[i].toUpperCase();
      const statuses = evaluateGuess(guess);
      
      rows.push(
        <div key={i} className="grid-row">
          {guess.split('').map((letter, j) => (
            <LetterTile 
              key={j} 
              letter={letter} 
              status={statuses[j]} 
              animDelayIndex={j} 
            />
          ))}
        </div>
      );
    } else if (i === currentRowIndex) {
      // Current active row
      const guessChars = currentGuess.toUpperCase().split('');
      const emptySlotsCount = WORD_LENGTH - guessChars.length;
      
      rows.push(
        <div key={i} className={`grid-row ${shakeRowIndex === i ? 'shake' : ''}`}>
          {guessChars.map((letter, j) => (
            <LetterTile 
              key={j} 
              letter={letter} 
              status="active" 
              animDelayIndex={j} 
            />
          ))}
          {Array(emptySlotsCount).fill('').map((_, j) => (
            <LetterTile 
              key={guessChars.length + j} 
              letter="" 
              status="empty" 
              animDelayIndex={guessChars.length + j} 
            />
          ))}
        </div>
      );
    } else {
      // Empty future row
      rows.push(
        <div key={i} className="grid-row">
          {Array(WORD_LENGTH).fill('').map((_, j) => (
            <LetterTile 
              key={j} 
              letter="" 
              status="empty" 
              animDelayIndex={j} 
            />
          ))}
        </div>
      );
    }
  }

  return (
    <div className="grid-container" id="game-board">
      {rows}
    </div>
  );
}
