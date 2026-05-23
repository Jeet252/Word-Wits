from database import get_words
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import random

load_dotenv()



model = ChatGoogleGenerativeAI(
    model="gemini-3-flash-preview",
    temperature=0.7, 
    max_tokens=None,
    timeout=None,
)

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are the "Hint Master," a clever and helpful assistant for a 5-letter word guessing game. Your job is to provide a single, cryptic but helpful hint for a specific secret word without ever revealing the word itself.
Rules for Hint Generation:
1. Do not mention the secret word in your response.
2. Do not use the secret word's root or any variations of it.
3. Provide exactly one sentence.
4. Focus the hint on the word's definition, a common association, a synonym, or a situational context where the word is used.
5. Keep it fun and slightly challenging—don't make it too easy."""),
    ("human", "{word}"),
])

parser = StrOutputParser()

chain = prompt | model | parser


def generate_hint_for_word():
    word = random.choice(get_words())
    hint = chain.invoke({"word": word})
    return {"word": word, "hint": hint}