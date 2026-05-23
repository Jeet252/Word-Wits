import React, { useState } from 'react';

export default function Header() {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <>
      <header className="game-header">
        <div className="logo-container">
          <h1 className="logo">Word Wits</h1>
          <span className="tagline">The Word Mind Game</span>
        </div>

        <div className="header-actions">
          {/* Help Button */}
          <button
            className="icon-btn"
            onClick={() => setShowHowToPlay(true)}
            aria-label="How to Play"
            id="how-to-play-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* How To Play Modal */}
      {showHowToPlay && (
        <div className="modal-overlay" onClick={() => setShowHowToPlay(false)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowHowToPlay(false)}>&times;</button>
            <h3 className="modal-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              How To Play
            </h3>
            <div className="modal-body">
              <p>Guess the <strong>Word Wits</strong> mystery word in 6 attempts. Each guess must be a valid 5-letter word.</p>

              <h4>Visual Clues</h4>
              <p>After each guess, the color of the tiles will change to show how close your guess was to the word:</p>

              <div className="color-example-list">
                <div className="color-example-item">
                  <div className="example-tile" style={{ backgroundColor: 'var(--color-correct)' }}>W</div>
                  <span className="example-text"><strong>W</strong> is in the word and in the <strong>correct position</strong> (Green).</span>
                </div>

                <div className="color-example-item">
                  <div className="example-tile" style={{ backgroundColor: 'var(--color-present)' }}>I</div>
                  <span className="example-text"><strong>I</strong> is in the word but in the <strong>wrong position</strong> (Yellow).</span>
                </div>

                <div className="color-example-item">
                  <div className="example-tile" style={{ backgroundColor: 'var(--color-absent)' }}>T</div>
                  <span className="example-text"><strong>T</strong> is <strong>not</strong> in the word in any spot (Grey).</span>
                </div>
              </div>

              <h4>Premium Features</h4>
              <ul>
                <li>💡 <strong>Hints:</strong> Stymied? Unlock a small descriptive hint of the word at any time.</li>
                <li>🔒 <strong>Answer Mask:</strong> The mystery word is kept locked at the top of the board, unlocking instantly with a beautiful visual effect once you solve the word or exhaust your turns.</li>
                <li>🔄 <strong>Next Challenge:</strong> Submit the correct guess or finish all turns to enable navigation to the next word.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
