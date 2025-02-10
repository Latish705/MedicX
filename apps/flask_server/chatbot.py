import os
import re
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

# Define medical history
medical_history = {
    "age": 45,
    "pre_existing_conditions": ["Type 2 Diabetes", "Hypertension"],
    "allergies": ["Penicillin", "Aspirin"],
    "medications": {
        "Metformin": "500mg daily",
        "Lisinopril": "10mg daily"
    },
    "past_surgeries": ["Appendectomy (2015)"],
    "lifestyle": {
        "smoking": False,
        "alcohol": "Occasional",
        "exercise": "Moderate"
    },
    "recent_issues": ["Seasonal allergies", "Occasional acid reflux"]
}

# Initialize FastAPI
app = FastAPI(title="Symptom Assessment API", version="1.0")

# Initialize Groq API
llm = ChatGroq(
    temperature=0,
    groq_api_key="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",
    model_name="llama-3.1-8b-instant"
)

# Define input model
class SymptomInput(BaseModel):
    symptoms: str

# Function to sanitize user input
def clean_text(text: str) -> str:
    """Remove unwanted characters and ensure proper formatting."""
    text = text.strip()
    text = re.sub(r"[^\w\s.,!?()-]", "", text)
    return text

# Define medical prompt
medical_prompt = PromptTemplate.from_template(
    """
    ### SYMPTOMS:
    {symptoms}
    ### USER MEDICAL HISTORY:
    {medical_history}
    ### INSTRUCTION:
    Analyze the symptoms based on the user's medical history. Keep responses concise and structured:
    
    1. *Possible Causes:* (2-3 sentences)
    2. *Home Remedies:* (Top 2-3 recommendations)
    3. *Doctor Visit:* (Is it necessary and why?)
    4. *Avoid:* (2-3 key points)
    5. *Actions:* (2-3 key points)
    6. *OTC Medications:* (Most effective 2-3)
    
    Ensure the response is **empathetic, structured, and clear**.
    """
)

# Define general prompt
general_prompt = PromptTemplate.from_template(
    """
    ### USER INPUT:
    {query}
    
    ### INSTRUCTION:
    Respond to the user in a **friendly and engaging** manner. Keep responses **concise and clear**.
    
    - If it’s a **greeting** (e.g., "hi", "hello"), reply with a warm greeting.
    - If it’s a **general knowledge question**, provide a brief, direct answer.
    - If it's **off-topic**, politely respond without medical advice.
    
    *Keep the tone conversational and positive!*
    """
)

# Define classification prompt
classification_prompt = PromptTemplate.from_template(
    """
    ### USER INPUT:
    {query}
    
    ### INSTRUCTION:
    Determine if the input is **medical-related** or **general**. Respond with either "medical" or "general" only.
    """
)

@app.post("/assess_symptoms")
async def assess_symptoms(input_data: SymptomInput):
    """API endpoint to analyze symptoms and provide guidance."""
    try:
        cleaned_input = clean_text(input_data.symptoms)
        
        # Determine if the query is medical-related
        classification_chain = classification_prompt | llm
        classification_response = classification_chain.invoke({"query": cleaned_input})
        category = classification_response.content.strip().lower()
        
        # Choose the appropriate prompt
        if category == "medical":
            chain = medical_prompt | llm
            response = chain.invoke({"symptoms": cleaned_input, "medical_history": json.dumps(medical_history)})
        else:
            chain = general_prompt | llm
            response = chain.invoke({"query": cleaned_input})
        
        return {"response": response.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Welcome to the Symptom Assessment API! Use /assess_symptoms to get guidance."}