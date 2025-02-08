from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
from werkzeug.utils import secure_filename
import requests  # new import

from test import classify_text_image_with_tesseract
from test2 import extract_text, extract_medications, load_local_spacy_model

app = FastAPI()
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

nlp = load_local_spacy_model('en_core_sci_scibert-0.5.4.tar.gz')

@app.post("/upload_prescription")
async def upload_prescription(payload: dict):  # changed parameter from file to payload
    # Validate the provided URL in the payload
    image_url = payload.get("image_url")
    if not image_url:
        raise HTTPException(status_code=400, detail="No image URL provided.")

    # Download the image data from the URL
    try:
        response = requests.get(image_url)
        response.raise_for_status()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Unable to download the image URL.")

    # Use the URL's filename or a default name
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)
