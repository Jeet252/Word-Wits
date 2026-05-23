import React from 'react';

export default function AnswerPlaceholder({ targetWord, isGameOver, isGameWon }) {
  // Pad or split the target word to ensure 5 letters
  const letters = targetWord ? targetWord.split('') : ['', '', '', '', ''];

  return (
    <div className="placeholder-section">
      <span className="placeholder-label">Secret Word</span>
      <div className="placeholder-row">
        {letters.map((char, index) => {
          let tileClass = "placeholder-tile";
          
          if (isGameOver) {
            tileClass += ` revealed ${isGameWon ? 'correct' : 'failed'}`;
          }

          return (
            <div 
              key={index} 
              className={tileClass}
              id={`placeholder-tile-${index}`}
            >
              {isGameOver ? char : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
