import React from 'react';

export default function HintBox({ hintText, isUnlocked, onUnlock, isGameOver }) {
  // If the game is over, we automatically unlock/show the hint if it wasn't already
  const showHint = isUnlocked || isGameOver;

  return (
    <div className="hint-container" id="hint-section">
      <div className="hint-card glass-panel">
        <div className="hint-info">
          <div className="hint-icon-wrapper">
            {showHint ? (
              // Glowing Lightbulb
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(168, 85, 247, 0.6))' }}>
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                <line x1="9" y1="18" x2="15" y2="18"></line>
                <line x1="10" y1="22" x2="14" y2="22"></line>
              </svg>
            ) : (
              // Locked Lock
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            )}
          </div>
          
          <div className="hint-text-group">
            <span className="hint-label">Clue / Hint</span>
            <p className="hint-text">
              {showHint 
                ? hintText 
                : "Unlock a description of the secret word to help guide your guesses."}
            </p>
          </div>
        </div>

        {!showHint && (
          <button 
            className="hint-lock-btn" 
            onClick={onUnlock}
            id="unlock-hint-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
            </svg>
            Unlock
          </button>
        )}
      </div>
    </div>
  );
}
