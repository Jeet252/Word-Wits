import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import AnswerPlaceholder from './components/AnswerPlaceholder';
import WordGrid from './components/WordGrid';
import HintBox from './components/HintBox';
import Toast from './components/Toast';
import { fetchWordFromBackend } from './services/api';

export default function App() {
  // Gameplay States
  const [loading, setLoading] = useState(true);
  const [targetWord, setTargetWord] = useState('');
  const [hintText, setHintText] = useState('');

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing' | 'won' | 'lost'

  const [hintUnlocked, setHintUnlocked] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [shakeRowIndex, setShakeRowIndex] = useState(null);
  const [confettiParticles, setConfettiParticles] = useState([]);

  // Toast notifier helper
  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  // Custom float particle generator for win ceremony
  const triggerConfetti = () => {
    const particles = [];
    const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#a855f7', '#06b6d4', '#ff7849'];
    for (let i = 0; i < 90; i++) {
      particles.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
          transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.7})`,
        }
      });
    }
    setConfettiParticles(particles);
  };

  // Pulls a new word and resets game state
  const loadNewChallenge = async () => {
    setLoading(true);
    setGuesses([]);
    setCurrentGuess('');
    setCurrentRowIndex(0);
    setGameStatus('playing');
    setHintUnlocked(false);
    setShakeRowIndex(null);
    setConfettiParticles([]);

    try {
      const data = await fetchWordFromBackend();
      setTargetWord(data.word);
      setHintText(data.hint);

    } catch (err) {
      addToast("Failed to fetch word. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadNewChallenge();
  }, []);

  // Handles character insertion
  const onChar = useCallback((char) => {
    if (gameStatus !== 'playing' || loading) return;
    if (currentGuess.length >= 5) return;

    const letter = char.toUpperCase();
    if (/^[A-Z]$/.test(letter)) {
      setCurrentGuess((prev) => prev + letter);
    }
  }, [currentGuess, gameStatus, loading]);

  // Handles character deletion
  const onDelete = useCallback(() => {
    if (gameStatus !== 'playing' || loading) return;
    if (currentGuess.length === 0) return;

    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus, loading, currentGuess]);

  // Handles guess submission
  const onEnter = useCallback(() => {
    if (gameStatus !== 'playing' || loading) return;

    if (currentGuess.length < 5) {
      // Trigger temporary row shaking
      setShakeRowIndex(currentRowIndex);
      addToast("Not enough letters!", "error", 2000);
      setTimeout(() => setShakeRowIndex(null), 500);
      return;
    }

    const newGuess = currentGuess.toUpperCase();
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    // Evaluate if guess is correct
    if (newGuess === targetWord) {
      setGameStatus('won');
      addToast("Splendid! You guessed the word!", "success", 4000);
      triggerConfetti();
      return;
    }

    // Check if the user has exhausted their attempts
    if (newGuesses.length >= 6) {
      setGameStatus('lost');
      addToast(`Game Over! The word was: ${targetWord}`, "error", 5000);
      return;
    }

    // Move to next row
    setCurrentRowIndex((prev) => prev + 1);
  }, [currentGuess, guesses, targetWord, currentRowIndex, gameStatus, loading, addToast]);

  // Unlock hint callback
  const handleUnlockHint = () => {
    if (gameStatus !== 'playing') return;
    setHintUnlocked(true);
    addToast("Hint unlocked! Check the clue panel.", "success", 2500);
  };



  // Keyboard Event Listeners for physical inputs
  useEffect(() => {
    const handlePhysicalKeyPress = (event) => {
      if (event.code === 'Enter') {
        onEnter();
      } else if (event.code === 'Backspace') {
        onDelete();
      } else {
        const key = event.key;
        if (/^[a-zA-Z]$/.test(key)) {
          onChar(key);
        }
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  }, [onChar, onDelete, onEnter]);

  return (
    <>
      <Header />

      {/* Floating Particles upon Victory */}
      {confettiParticles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={particle.style}
        />
      ))}

      {/* Floating Toasts */}
      <Toast toasts={toasts} />

      {loading ? (
        // High-end blur loader
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid var(--glass-border)',
            borderTopColor: 'var(--color-accent)',
            animation: 'flipIn 1s infinite linear',
            boxShadow: 'var(--glow-accent)'
          }}></div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Summoning Challenge...
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '8px' }}>

          {/* Secret Word Reveal / Mask Placeholder */}
          <AnswerPlaceholder
            targetWord={targetWord}
            isGameOver={gameStatus !== 'playing'}
            isGameWon={gameStatus === 'won'}
          />

          {/* Letter Tiles Grid */}
          <WordGrid
            guesses={guesses}
            currentGuess={currentGuess}
            targetWord={targetWord}
            currentRowIndex={currentRowIndex}
            shakeRowIndex={shakeRowIndex}
          />

          {/* Locked Clue / Hint Drawer */}
          <HintBox
            hintText={hintText}
            isUnlocked={hintUnlocked}
            onUnlock={handleUnlockHint}
            isGameOver={gameStatus !== 'playing'}
          />

          {/* Navigation Game Controls */}
          <div className="game-actions">
            <button
              onClick={loadNewChallenge}
              className={`next-btn ${gameStatus !== 'playing' ? 'active' : ''}`}
              disabled={gameStatus === 'playing'}
              id="next-challenge-btn"
            >
              Next Word
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
