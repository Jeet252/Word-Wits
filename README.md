# 🌌 Word Wits — The Ultimate GenAI Word Guessing Challenge

Welcome to **Word Wits**, a premium, five-letter word guessing game built with a high-end, responsive **React.js + Vite** frontend and an intelligent **Python + FastAPI** backend powered by **LangChain**, **Google Gemini**, and **MongoDB**. 

Word Wits delivers a deep-space, glassmorphic twist on the classic word deduction formula. It offers engaging visual feedback, unlocking hints, hidden answer placeholder mechanics, dynamic LLM-generated clues, and smooth high-fps animations.

---

## 📸 Interface Preview & Design Aesthetics

Handcrafted with custom vanilla CSS in [index.css](file:///d:/Resume%20Projects/Word%20Wits/client/src/index.css) (no heavy utility utility-framework bloat):
*   **Obsidian-to-Amethyst Radial Background:** A smooth obsidian canvas sweeping into royal violet amethyst (`#080510` to `#160f29`).
*   **Glassmorphism Panels:** Frosted panels utilizing `backdrop-filter: blur(12px)` with subtle translucent borders (`rgba(255, 255, 255, 0.08)`) and soft drop-shadows.
*   **Tactile Micro-animations:** High-fidelity scale bounces on typing, 3D card flips on row reveals, horizontal card shaking on invalid/short entries, and a glowing purple pulsar for active call-to-actions.
*   **Pure CSS Canvas-Free Confetti:** A custom, performant confetti particle engine that showers the screen upon a victorious guess without dragging frame rates.

---

## 🎮 Core Gameplay Mechanics

1.  **6 Strategic Attempts:** You have six chances to guess a secret five-letter target word.
2.  **Color-Coded Feedback Grid:** Submission tiles dynamically flip over in 3D to reveal accuracy:
    *   🟩 **Green (Correct):** The letter is correct and in the perfect position.
    *   🟨 **Yellow (Present):** The letter exists in the word but is in a different position.
    *   ⬛ **Grey (Absent):** The letter does not exist in the secret word.
3.  **Padlocked Masked Placeholder:** The secret target word remains locked at the top of the board as a row of custom padlocked cards. Upon game completion, it triggers an unlocking reveal animation in **Neon Green** (Victory) or **Crimson Red** (Defeat).
4.  **Generative AI Hint Drawer:** Stuck on a word? Slide open the Clue Drawer and unlock a custom, creative, one-sentence cryptic hint generated in real-time by the AI backend.
5.  **Smart Flow Control:** The **Next Word** button is strictly locked during gameplay and blooms into a glowing, pulsing purple action button once the mystery is solved or attempts are exhausted.
6.  **Dual Input Architecture:** Supports a responsive, color-tracked virtual touch keyboard alongside native physical keyboard listeners (handling letter keying, Backspace, and Enter).

---

## 🧠 Backend Intelligence (FastAPI + LangChain + Gemini)

The backend server is built using **Python & FastAPI**, implementing a clean Generative AI pipeline:
*   **FastAPI Engine:** Serves lightweight, asynchronous JSON endpoints with configured Cross-Origin Resource Sharing (CORS) matching the Vite client.
*   **MongoDB Repository:** Connects to a MongoDB database holding a curated set of five-letter vocabulary words. On server startup, these words are successfully loaded into memory for rapid access.
*   **LangChain & Gemini Agent:** Uses LangChain to orchestrate a "Hint Master" agent backed by Google's **Gemini** (`gemini-3-flash-preview` / configurable).
*   **Prompt Engineering:** When a word is chosen, the agent is dynamically prompted to write exactly *one* cryptic but helpful sentence describing the word's definition, associations, or situational context—stringently restricted from ever using the secret word itself, its root, or variations.

---

## 🌐 Dynamic API Connection & Zero-Setup Fallback

The React client fetches dynamic challenges from the backend API:
`GET http://localhost:5000/api/word`

### 💡 Graceful Offline Fallback (Demo Mode)
If your backend server is offline, returns an error, or takes longer than 2.5 seconds to respond, the client automatically handles the failure gracefully:
1.  It falls back to a curated collection of **50+ local vocabulary words & hints** (e.g., *PIXEL*, *MAGIC*, *HEART*).
2.  It displays a sleek violet **Demo Mode** indicator pill in the header.
3.  It fires a slide-in warnings toast notifying the user of the local fallback.
*This ensures the application is **fully interactive, playable, and presentable immediately out-of-the-box** without any configuration!*

---

## 📂 Monorepo Structure

```bash
Word Wits/
├── client/                     # React.js + Vite Frontend
│   ├── public/                 # Static web assets & icons
│   ├── src/
│   │   ├── components/         # Header, AnswerPlaceholder, WordGrid, HintBox, Toast
│   │   ├── services/
│   │   │   ├── api.js          # API client with offline fallback orchestrator
│   │   │   └── word.json       # Premium local fallback word database
│   │   ├── App.jsx             # Core state machine and game manager
│   │   ├── index.css           # Premium glass design tokens & animations
│   │   └── main.jsx            # Application entrypoint
│   ├── .env                    # Client environment configurations
│   └── package.json            # Vite/React configuration and scripts
│
└── server/                     # FastAPI + Python Backend
    ├── agent.py                # LangChain + Gemini LLM Hint Master prompt setup
    ├── database.py             # MongoDB loader & word fetch repository
    ├── main.py                 # FastAPI app initialization, CORS, and endpoint routing
    ├── requirements.txt        # Python dependency manifest
    └── .env                    # Backend secret credentials (MongoDB & Gemini API keys)
```

---

## 🚀 Setup & Launch Guide

Follow these simple steps to run both the frontend and backend environments locally.

### 1. Run the Frontend (Client)

1.  Navigate into the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch the Vite development server:
    ```bash
    npm run dev
    ```
4.  Open **[http://localhost:5173/](http://localhost:5173/)** in your browser!

> [!NOTE]
> By default, the client environment file (`client/.env`) is pre-configured to look for the backend at `http://localhost:5000/api/word`. If the backend is not running, it will automatically enter **Demo Mode** and play flawlessly offline.

---

### 2. Run the Backend (Server)

1.  Navigate into the server directory:
    ```bash
    cd server
    ```
2.  Create a local Python virtual environment:
    ```bash
    python -m venv venv
    ```
3.  Activate the virtual environment:
    *   **Windows (PowerShell):**
        ```powershell
        .\venv\Scripts\Activate.ps1
        ```
    *   **Windows (CMD):**
        ```cmd
        .\venv\Scripts\activate.bat
        ```
    *   **macOS / Linux:**
        ```bash
        source venv/bin/activate
        ```
4.  Install the required libraries:
    ```bash
    pip install -r requirements.txt
    ```
5.  Create a `.env` file in the server directory and configure your MongoDB and Gemini credentials:
    ```env
    MONGODB_URL="your-mongodb-connection-string"
    GEMINI_API_KEY="your-google-gemini-api-key"
    ```
6.  Launch the FastAPI server using Uvicorn:
    ```bash
    uvicorn main:app --host 127.0.0.1 --port 5000 --reload
    ```
7.  The server is now live at **[http://localhost:5000](http://localhost:5000)**! The frontend will automatically detect the server on the next game reset and switch the header badge from **Demo Mode** to **Live API**.

---

## 🛠️ Verification & API Payloads

The FastAPI server exposes `/api/word` yielding a dynamic JSON payload matching this shape:

```json
{
  "word": "BRAIN",
  "hint": "The organ that allows you to contemplate this very puzzle."
}
```

*Enjoy exploring Word Wits! Command your vocabulary and challenge the Hint Master!* 🌌🎮
