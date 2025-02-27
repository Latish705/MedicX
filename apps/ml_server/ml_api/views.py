# from django.shortcuts import render
# from django.http import JsonResponse
# from rest_framework.decorators import api_view
# from rest_framework.parsers import JSONParser
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# import os
# import re
# import requests
# from pydantic import BaseModel
# from dotenv import load_dotenv
# # from ocr import classify_text_image_with_tesseract
# from ml_api.ocr import classify_text_image_with_tesseract

# from ml_api.test2 import extract_text, extract_medications, load_local_spacy_model

# # Load environment variables
# load_dotenv()
# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# # Directory for uploads
# UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Load NLP model
# nlp = load_local_spacy_model('ml_api/en_core_sci_sm-0.5.4.tar.gz')

# # Define medical history
# medical_history = {
#     "age": 45,

#     "pre_existing_conditions": ["Type 2 Diabetes", "Hypertension"],
#     "allergies": ["Penicillin", "Aspirin"],
#     "medications": {
#         "Metformin": "500mg daily",
#         "Lisinopril": "10mg daily"
#     },
#     "past_surgeries": ["Appendectomy (2015)"],
#     "lifestyle": {
#         "smoking": False,
#         "alcohol": "Occasional",
#         "exercise": "Moderate"
#     },
#     "recent_issues": ["Seasonal allergies", "Occasional acid reflux"]
# }

# # Function to sanitize user input
# def clean_text(text: str) -> str:
#     """Remove unwanted characters and ensure proper formatting."""
#     text = text.strip()
#     text = re.sub(r"[^\w\s.,!?()-]", "", text)
#     return text


# ### OCR Endpoint
# @api_view(['POST'])
# def ocr(request):
#     if request.method == 'POST':
#         payload = JSONParser().parse(request)
#         image_url = payload.get("image_url")

#         if not image_url:
#             return JsonResponse({"detail": "No image URL provided."}, status=400)

#         try:
#             response = requests.get(image_url)
#             response.raise_for_status()
#         except Exception as e:
#             return JsonResponse({"detail": "Unable to download the image URL."}, status=400)

#         filename = os.path.basename(image_url) or "downloaded_image"
#         file_path = os.path.join(UPLOAD_FOLDER, filename)
        
#         with open(file_path, "wb") as f:
#             f.write(response.content)

#         classification, _, _ = classify_text_image_with_tesseract(file_path, debug=True)

#         if classification == "handwritten":
#             return JsonResponse({
#                 "status": "manual_review",
#                 "message": "The uploaded prescription appears handwritten. Please proceed with manual review."
#             })
#         elif classification == "digital":
#             raw_text = extract_text(file_path)
#             medications = extract_medications(raw_text, nlp)
#             return JsonResponse({
#                 "status": "processed",
#                 "medications": medications
#             })
#         else:
#             return JsonResponse({
#                 "status": "unknown",
#                 "message": "Unable to classify the prescription image."
#             })


# ### Symptom Assessment Endpoint
# class SymptomInput(BaseModel):
#     symptoms: str


# @api_view(['POST'])
# def assess_symptoms(request):
#     if request.method == 'POST':
#         try:
#             payload = JSONParser().parse(request)
#             symptoms = payload.get("symptoms")
            
#             if not symptoms:
#                 return JsonResponse({"detail": "No symptoms provided."}, status=400)

#             cleaned_symptoms = clean_text(symptoms)

#             # Simulate LLM response (replace with real LLM API call)
#             advice = f"Simulated advice for symptoms: {cleaned_symptoms}"
#             response = {
#                 "advice": advice,
#                 "medical_history": medical_history
#             }
#             return JsonResponse(response)
#         except Exception as e:
#             return JsonResponse({"detail": str(e)}, status=500)


# ### Home View
# @api_view(['GET'])
# def home(request):
#     return JsonResponse({
#         "message": "Welcome to the Symptom Assessment API! Use /ocr for OCR or /assess_symptoms for medical guidance."
#     })
# ----------------------------------------------------------------------------------------


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
from dotenv import load_dotenv
from pydantic import BaseModel
# from ocr import classify_text_image_with_tesseract
from ml_api.ocr import classify_text_image_with_tesseract
from ml_api.test2 import extract_text, extract_medications, load_local_spacy_model
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
import json

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Directory for uploads
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load NLP model
nlp = load_local_spacy_model('ml_api/en_core_sci_sm-0.5.4.tar.gz')

# Define medical history
# medical_history = {
#     "age": 45,
#     "pre_existing_conditions": ["Type 2 Diabetes", "Hypertension"],
#     "allergies": ["Penicillin", "Aspirin"],
#     "medications": {
#         "Metformin": "500mg daily",
#         "Lisinopril": "10mg daily"
#     },
#     "past_surgeries": ["Appendectomy (2015)"],
#     "lifestyle": {
#         "smoking": False,
#         "alcohol": "Occasional",
#         "exercise": "Moderate"
#     },
#     "recent_issues": ["Seasonal allergies", "Occasional acid reflux"]
# }

# Function to sanitize user input
def clean_text(text: str) -> str:
    """Remove unwanted characters and ensure proper formatting."""
    text = text.strip()
    text = re.sub(r"[^\w\s.,!?()-]", "", text)
    return text

### OCR Endpoint (No Changes)
@api_view(['POST'])
def ocr(request):
    if request.method == 'POST':
        payload = JSONParser().parse(request)
        image_url = payload.get("image_url")
        print(payload)
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
                # "raw_text": raw_text,
                "medications": medications
            })
        else:
            return JsonResponse({
                "status": "unknown",
                "message": "Unable to classify the prescription image."
            })

### Chatbot Endpoint (Updated from chatbot.py)
# Initialize Groq API
llm = ChatGroq(
    temperature=0,
    groq_api_key=GROQ_API_KEY,
    model_name="llama-3.1-8b-instant"
)

# Define Prompt
prompt = PromptTemplate.from_template(
    """
    ### SYMPTOMS:
    {symptoms}
    ### USER MEDICAL HISTORY:
    {medical_history}
    ### INSTRUCTION:
    Analyze the given symptoms while considering the user's medical history. Keep responses **concise and structured**, ensuring readability. Include:give me in bullet points.

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

@api_view(['POST'])
def assess_symptoms(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON payload
            payload = JSONParser().parse(request)
            
            # Extract symptoms and medical history
            symptoms = payload.get("symptoms")
            medical_history = payload.get("medicalHistory")
            if not medical_history:
                return JsonResponse({"detail": "No medical history provided."}, status=400)
            
            # Validate the extracted data
            if not symptoms:
                return JsonResponse({"detail": "No symptoms provided."}, status=400)
            
            # Optional: Clean the symptoms text
            cleaned_symptoms = clean_text(symptoms)

            # Serialize medical history into JSON format
            medical_history_json = json.dumps(medical_history)

            # Print statements for debugging (can be removed in production)
            print(f"Medical History: {medical_history}")
            print(f"Symptoms: {cleaned_symptoms}")
            
            # Prepare the chain and invoke the model
            chain = prompt | llm
            response = chain.invoke({
                "symptoms": cleaned_symptoms,
                "medical_history": medical_history_json
            })
            
            # Return the model's advice in the response
            return JsonResponse({"advice": response.content})
        
        except Exception as e:
            # Return detailed error information in case of failure
            return JsonResponse({"detail": str(e)}, status=500)


### Home View
@api_view(['GET'])
def home(request):
    return JsonResponse({
        "message": "Welcome to the Symptom Assessment API! Use /ocr for OCR or /assess_symptoms for medical guidance."
    })
