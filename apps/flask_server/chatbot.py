import os
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import json


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
    groq_api_key=api_key,
    model_name="llama-3.1-8b-instant"
)

# Define input model
class SymptomInput(BaseModel):
    symptoms: str

# Function to sanitize user input
def clean_text(text: str) -> str:
    """Remove unwanted characters and ensure proper formatting."""
    text = text.strip()  # Remove leading/trailing whitespace
    text = re.sub(r"[^\w\s.,!?()-]", "", text)  # Remove problematic characters except punctuation
    return text

# Define Prompt
prompt = PromptTemplate.from_template(
    """
    ### SYMPTOMS:
    {symptoms}
    ### USER MEDICAL HISTORY:
    {medical_history}
    ### INSTRUCTION:
    Analyze the given symptoms while considering the user's medical history. Keep responses **concise and structured**, ensuring readability. Include:

    1. **Advice:** A brief overview of possible causes and insight (limit to 2-3 sentences).
    2. **Home remedies:** Suggest **only the best** evidence-based remedies (max 2-3).
    3. **Consultation recommendation:** Clearly state if a doctor visit is needed and **why** (if applicable).
    4. **What to avoid:** Summarize key things to avoid (in 2-3 bullet points).
    5. **What to do:** Provide **only the most important** actions (in 2-3 bullet points).
    6. **Over-the-counter medications:** Mention **only the most effective** options (limit to 2-3).

    **IMPORTANT:**
    - Keep responses **short and to the point** (avoid unnecessary details).
    - Use bullet points for clarity where applicable.
    - Always be **empathetic** and reassuring.
    - End with an **engaging follow-up question** to build trust (e.g., *"Does this sound helpful? Let me know if you need more details!"*).
    - If the user asks a **general life question** (e.g., about the weather, technology, or random facts), answer it **directly** without giving medical advice.

    ### RESPONSE (NO PREAMBLE):
    """
)

@app.post("/assess_symptoms")
async def assess_symptoms(input_data: SymptomInput):
    """API endpoint to analyze symptoms and provide medical guidance."""
    try:
        # Clean input to prevent JSON parsing errors
        cleaned_symptoms = clean_text(input_data.symptoms)

        chain = prompt | llm
        response = chain.invoke({"symptoms": cleaned_symptoms, "medical_history": json.dumps(medical_history)})  
        return {"advice": response.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Welcome to the Symptom Assessment API! Use /assess_symptoms to get medical guidance."}
