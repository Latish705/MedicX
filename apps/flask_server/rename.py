import os
import re
import json
import requests  # new import
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse  # new import for upload_prescription route
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from werkzeug.utils import secure_filename  # new import

# New imports from rename.py
from test import classify_text_image_with_tesseract
<<<<<<< HEAD
from test2 import extract_text, extract_medications, load_local_spacy_model
=======
from apps.ml_server.ml_api.test2 import extract_text, extract_medications, load_local_spacy_model
>>>>>>> 808ca0c42e893979f7cc0c0a7c6ab6144c77f7f1

# Load environment variables
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

# Define medical history (existing)
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
app = FastAPI(title="Combined API", version="1.0")

# Initialize Groq API
llm = ChatGroq(
    temperature=0,
    groq_api_key=api_key,
    model_name="llama-3.1-8b-instant"
)

# Define input model for /assess_symptoms
class SymptomInput(BaseModel):
    symptoms: str

# Function to sanitize user input
def clean_text(text: str) -> str:
    text = text.strip()
    text = re.sub(r"[^\w\s.,!?()-]", "", text)
    return text

# Define Prompt for /assess_symptoms
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
    try:
        cleaned_symptoms = clean_text(input_data.symptoms)
        chain = prompt | llm
        response = chain.invoke({"symptoms": cleaned_symptoms, "medical_history": json.dumps(medical_history)})  
        return {"advice": response.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New /upload_prescription endpoint from rename.py
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
nlp = load_local_spacy_model('en_core_sci_scibert-0.5.4.tar.gz')

@app.post("/upload_prescription")
async def upload_prescription(payload: dict):  # changed parameter from file to payload
    image_url = payload.get("image_url")
    if not image_url:
        raise HTTPException(status_code=400, detail="No image URL provided.")

    try:
        response = requests.get(image_url)
        response.raise_for_status()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Unable to download the image URL.")

    filename = secure_filename(os.path.basename(image_url)) or "downloaded_image"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    
    with open(file_path, "wb") as f:
        f.write(response.content)
    
    classification, _, _ = classify_text_image_with_tesseract(file_path, debug=True)
    
    if classification == "handwritten":
        return JSONResponse(content={
            "status": "manual_review",
            "message": "The uploaded prescription appears handwritten. Please proceed with manual review."
        })
    elif classification == "digital":
        raw_text = extract_text(file_path)
        medications = extract_medications(raw_text, nlp)
        return JSONResponse(content={
            "status": "processed",
            "raw_text": raw_text,
            "medications": medications
        })
    else:
        return JSONResponse(content={
            "status": "unknown",
            "message": "Unable to classify the prescription image."
        })

@app.get("/")
def home():
    return {"message": "Welcome to the Combined API! Use /assess_symptoms or /upload_prescription as needed."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)
