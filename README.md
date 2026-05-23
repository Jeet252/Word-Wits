# 🌌 Word Wits — The Ultimate Word Guessing Challenge

Welcome to **Word Wits**, a premium, five-letter word guessing game built with a high-end **React.js** frontend and a responsive **Node.js** backend architecture. 

Word Wits delivers a deep-space, glassmorphic twist on the classic word deduction formula, offering engaging visual feedback, unlocking hints, hidden answer placeholder mechanics, and smooth transitions.

---

## 🎯 Gameplay Mechanics

1. **6 Attempts:** You have six chances to guess a secret five-letter word.
2. **Color-Coded Feedback:** After submitting a guess, individual letter tiles flip over to reveal accuracy:
   - **🟩 Green:** The letter is correct and in the perfect position.
   - **🟨 Yellow:** The letter exists in the word but is in the wrong position.
   - **⬛ Grey:** The letter does not exist in the word.
3. **Masked Answer Placeholder:** The secret target word remains locked and hidden at the top of the interface as a row of padlocked cards during gameplay. It instantly performs an unlocking reveal animation in **neon Green** (if solved) or **Crimson Red** (if lost) when the game terminates.
4. **Unlockable Hints:** Stuck on a tough word? Click the glowing lock button in the Clue drawer to slide-reveal a short, creative text description of the target word.
5. **Smart Game Progression:** The **Next Word** navigation button is strictly locked and disabled during active gameplay. Once solved or exhausted, the button blooms into a glowing, pulsing purple accent that resets the game board and summons the next challenge.
6. **Physical Keyboard Integration:** Optimised for computer users—supporting standard physical letter keying, Backspace deletions, and Enter submissions.

---

## 💎 Premium Design Aesthetics

The interface is handcrafted with custom vanilla CSS in [index.css](file:///d:/Resume%20Projects%20/Word%20Wits/client/src/index.css) (no heavy CSS frameworks required):
- **Glassmorphism panels:** Translucent frosted panels (`backdrop-filter: blur(12px)`) with thin, high-contrast borders and deep shadows.
- **Radial Lighting Background:** A gradient sweeping from deep obsidian to royal purple amethyst (`#080510` to `#160f29`).
- **Tactile Micro-animations:** Scaling bounces on typing, 3D card flips on reveals, and horizontal card shaking on invalid guesses.
- **Pure CSS Confetti Shower:** A custom, canvas-free victory flurry of colourful floating particles that rains down upon successful guesses.

---

## 📂 Project Structure

The project is structured as a clean monorepo:

```bash
Word Wits/
├── client/          # React.js + Vite Frontend
│   ├── public/      # Static web assets
│   ├── src/
│   │   ├── components/  # Header, AnswerPlaceholder, WordGrid, HintBox, Toast
│   │   ├── services/    # api.js connection service
│   │   ├── App.jsx      # Core state coordinator & input event listeners
│   │   ├── index.css    # Typography, glass design system, animations
│   │   └── main.jsx     # App entrypoint
│   └── package.json
└── server/          # Node.js Backend (for word/hint generation)
```

---

## 🌐 API Service & Zero-Setup Fallback

The frontend tries to fetch the target word and description from:
`http://localhost:5000/api/word`

### 💡 Graceful Offline Fallback (Demo Mode)
If your backend server is not running or takes longer than 2.5 seconds to reply, the client automatically falls back to a curated list of **50+ vocabulary words and hints** (e.g., *PIXEL*, *BRAIN*, *OCEAN*). It displays a **Demo Mode** indicator in the header and pops a slide-in warning toast. This ensures the application is **fully interactive and playable immediately out-of-the-box**!

---

## 🚀 Quick Start

### 1. Run the Frontend (Client)
1. Navigate into the client directory:
   ```bash
   cd client
   ```
2. Install the lightweight dependencies:
   ```bash
   npm install
   ```
3. Start the high-speed Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to **[http://localhost:5173/](http://localhost:5173/)** to play!

### 2. Set Up the Backend (Server)
When you are ready to connect a backend server:
1. Ensure your server is listening on `http://localhost:5000`.
2. Configure an endpoint `/api/word` that accepts `GET` requests and returns a JSON payload:
   ```json
   {
     "word": "HEART",
     "hint": "A hollow muscular organ that pumps blood throughout the body."
   }
   ```
3. The frontend will automatically detect the server, switch the header pill to **Live API**, and fetch new challenges directly from your backend!
