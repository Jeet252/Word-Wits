from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import random
from database import init_db, get_words



@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Word Wits API", lifespan=lifespan)

# Add CORS middleware to allow requests from your Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Word Wits API!"}

@app.get("/api/word")
def get_random_word():
    words = get_words()
    if not words:
        return {"error": "No words available"}

    return random.choice(words)
