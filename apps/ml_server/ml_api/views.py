from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import re
import requests
from pydantic import BaseModel
from dotenv import load_dotenv
# from ocr import classify_text_image_with_tesseract
from ml_api.ocr import classify_text_image_with_tesseract

from ml_api.test2 import extract_text, extract_medications, load_local_spacy_model

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Directory for uploads
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load NLP model
nlp = load_local_spacy_model('ml_api/en_core_sci_scibert-0.5.4.tar.gz')

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

# Function to sanitize user input
def clean_text(text: str) -> str:
    """Remove unwanted characters and ensure proper formatting."""
    text = text.strip()
    text = re.sub(r"[^\w\s.,!?()-]", "", text)
    return text


### OCR Endpoint
@api_view(['POST'])
def ocr(request):
    if request.method == 'POST':
        payload = JSONParser().parse(request)
        image_url = payload.get("image_url")

        if not image_url:
            return JsonResponse({"detail": "No image URL provided."}, status=400)

        try:
            response = requests.get(image_url)
            response.raise_for_status()
        except Exception as e:
            return JsonResponse({"detail": "Unable to download the image URL."}, status=400)

        filename = os.path.basename(image_url) or "downloaded_image"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        
        with open(file_path, "wb") as f:
            f.write(response.content)

        classification, _, _ = classify_text_image_with_tesseract(file_path, debug=True)

        if classification == "handwritten":
            return JsonResponse({
                "status": "manual_review",
                "message": "The uploaded prescription appears handwritten. Please proceed with manual review."
            })
        elif classification == "digital":
            raw_text = extract_text(file_path)
            medications = extract_medications(raw_text, nlp)
            return JsonResponse({
                "status": "processed",
                "raw_text": raw_text,
                "medications": medications
            })
        else:
            return JsonResponse({
                "status": "unknown",
                "message": "Unable to classify the prescription image."
            })


### Symptom Assessment Endpoint
class SymptomInput(BaseModel):
    symptoms: str


@api_view(['POST'])
def assess_symptoms(request):
    if request.method == 'POST':
        try:
            payload = JSONParser().parse(request)
            symptoms = payload.get("symptoms")
            
            if not symptoms:
                return JsonResponse({"detail": "No symptoms provided."}, status=400)

            cleaned_symptoms = clean_text(symptoms)

            # Simulate LLM response (replace with real LLM API call)
            advice = f"Simulated advice for symptoms: {cleaned_symptoms}"
            response = {
                "advice": advice,
                "medical_history": medical_history
            }
            return JsonResponse(response)
        except Exception as e:
            return JsonResponse({"detail": str(e)}, status=500)


### Home View
@api_view(['GET'])
def home(request):
    return JsonResponse({
        "message": "Welcome to the Symptom Assessment API! Use /ocr for OCR or /assess_symptoms for medical guidance."
    })
