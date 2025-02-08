import pytesseract
from PIL import Image
import spacy
import re
from typing import List, Dict
import os
import tarfile

def load_local_spacy_model(tarball_path):
    try:
        models_dir = os.path.join(os.path.expanduser("~"), ".spacy", "models")
        os.makedirs(models_dir, exist_ok=True)
        with tarfile.open(tarball_path, 'r:gz') as tar:
            tar.extractall(path=models_dir)
# 
        model_path = os.path.join(models_dir, "en_core_sci_sm-0.5.4",
                                  "en_core_sci_sm",
                                  "en_core_sci_sm-0.5.4")
        print(f"Loading model from: {model_path}")
        return spacy.load(model_path)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise

def extract_text(image_path: str) -> str:
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text

def clean_text(text: str) -> str:
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s\.,-:/()%+]', '', text)
    return text.strip().lower()

def is_valid_header(header: str, nlp) -> bool:
    header = header.strip()
    if len(header) < 3:
        return False
    # Use spaCy to check if the header contains a drug entity
    doc = nlp(header)
    for ent in doc.ents:
        if ent.label_ == "DRUG":
            return True
    # Fallback to alphabetic check
    if not header[0].isalpha():
        return False
    alpha_count = sum(1 for c in header if c.isalpha())
    return alpha_count >= 3

def extract_medications(text: str, nlp) -> List[Dict[str, str]]:
    lines = text.split('\n')
    medications = []
    current_med = None
    med_start_pattern = r'^(?:\d+\.\s+|tab(?:let)?\s+|cap(?:sule)?\s+|inj(?:ection)?\s+)(.*)'
    dosage_pattern = r'(\d+\.?\d*)\s*(mg|mcg|ml|g|)\b'
    frequency_pattern = r'(\d+\s*-\s*\d+\s*-\s*\d+|\d+\s*-\s*\d+|\d+\s*times\s*(?:a|per)\s*day|daily|weekly)'
    duration_pattern = r'(\d+)\s*(?:days|day|weeks|week|months|month)'
    
    for line in lines:
        line = clean_text(line)
        med_start_match = re.match(med_start_pattern, line, re.IGNORECASE)
        if med_start_match:
            header_content = med_start_match.group(1).strip()
            if current_med is not None:
                if is_valid_header(header_content, nlp):
                    medications.append(current_med)
                    current_med = {'name': header_content, 'dosage': '', 'frequency': '', 'duration': '', 'instructions': ''}
                else:
                    current_med['name'] += " " + header_content
            else:
                current_med = {'name': header_content, 'dosage': '', 'frequency': '', 'duration': '', 'instructions': ''}
            # Check for dosage in the name (e.g., "625mg")
            dosage_in_name = re.search(r'\b(\d+)\s*(mg|mcg|g|ml)\b', current_med['name'], re.IGNORECASE)
            if dosage_in_name and not current_med['dosage']:
                current_med['dosage'] = f"{dosage_in_name.group(1)}{dosage_in_name.group(2)}"
        elif current_med is not None:
            # Use spaCy to extract entities from the line
            doc = nlp(line)
            for ent in doc.ents:
                if ent.label_ == "DRUG" and not current_med['dosage']:
                    current_med['dosage'] = ent.text
                elif ent.label_ == "DOSAGE" and not current_med['dosage']:
                    current_med['dosage'] = ent.text
                elif ent.label_ == "FREQUENCY" and not current_med['frequency']:
                    current_med['frequency'] = ent.text
                elif ent.label_ == "DURATION" and not current_med['duration']:
                    current_med['duration'] = ent.text
            # Fallback to regex if spaCy doesn't find entities
            dosage_match = re.search(dosage_pattern, line, re.IGNORECASE)
            if dosage_match and not current_med['dosage']:
                amount, unit = dosage_match.groups()
                current_med['dosage'] = f"{amount}{unit}".strip()
            freq_match = re.search(frequency_pattern, line, re.IGNORECASE)
            if freq_match and not current_med['frequency']:
                current_med['frequency'] = freq_match.group(1).replace(' ', '')
            duration_match = re.search(duration_pattern, line, re.IGNORECASE)
            if duration_match and not current_med['duration']:
                current_med['duration'] = f"{duration_match.group(1)} days"
            if 'instructions:' in line.lower():
                instructions = line.split(':', 1)[1].strip()
                current_med['instructions'] = instructions
    if current_med is not None and current_med['name']:
        medications.append(current_med)
    medications = [med for med in medications if med['name']]
    return medications

def main():
    nlp = load_local_spacy_model('en_core_sci_sm-0.5.4.tar.gz')
    image_paths = ["computer1.png", "computer4.png"]
    for image_path in image_paths:
        raw_text = extract_text(image_path)
        medications = extract_medications(raw_text, nlp)
        print("\nExtracted Medications:")
        for i, med in enumerate(medications, 1):
            print(f"\nMedication {i}:")
            for key, value in med.items():
                if value:
                    print(f"{key.capitalize()}: {value}")

if __name__ == "__main__":
    main()