import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URL")

if not MONGO_URI:
    raise ValueError("MONGO_URI is not defined in the environment variables.")

# Global variable to store words in memory
cached_words = []

def init_db():
    global cached_words
    
    print("Connecting to MongoDB...")
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        collection = client["database"]['fiveletterwords']
        
        document = collection.find_one({})
        
        if document and "fiveLettersWords" in document:
            cached_words = document["fiveLettersWords"]
        else:
            cached_words = []
            
        print(f"Successfully loaded {len(cached_words)} words from MongoDB into memory.")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        print("Falling back to hardcoded words for now...")

def get_words():
    return cached_words
