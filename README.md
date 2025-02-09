# MedinosXAdvitiya-25 Coding Knights

Welcome to the **MedinosXAdvitiya-25 Coding Knights** repository! This project leverages cutting-edge technologies in AI, machine learning, and web development to deliver a healthcare-focused application that enhances accessibility and reliability for users.

---

## 📌 Index

- [🚀 Project Overview](#-project-overview)
- [🌟 Key Features](#-key-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [🏗️ Architecture Overview](#%EF%B8%8F-architecture-overview)
- [🔧 Installation & Setup](#-installation--setup)
- [🔑 API Endpoints](#-api-endpoints)
- [📈 Future Enhancements](#-future-enhancements)
- [📜 Documentation & Live Deployment](#-documentation--live-deployment)
- [🤝 Contributors](#-contributors)
- [📄 License](#-license)

---

## 🚀 Project Overview

MedinosXAdvitiya-25 integrates:
1. **OCR-Based Prescription Processing**: Extracts structured medical information from prescription images.
2. **AI-Powered Symptom Assessment Chatbot**: Provides personalized and medically verified guidance based on user symptoms.

---

## 🌟 Key Features

### **1️⃣ OCR-Based Prescription Processing**
- **Prescription Upload**:
  - Supports **handwritten** and **computer-generated** prescriptions.
  - Flags handwritten prescriptions for **manual review**.
- **Information Extraction**:
  - Extracts:
    - **Medicine Names**
    - **Prescribed Dosages**
    - **Additional Information** (e.g., instructions, precautions).
- **Goal**: Accelerate access to critical medical information.

### **2️⃣ Symptom Assessment Chatbot**
- **Symptom Reporting**:
  - Accepts user inputs describing symptoms.
- **AI-Driven Guidance**:
  - **Medically Verified Advice** for common conditions.
  - **Home Remedies** or **Over-the-Counter Medications** when appropriate.
  - **Professional Recommendations** for serious conditions.
- **Goal**: Provide accurate, real-time guidance while ensuring user safety.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (React-based, optimized for performance).
- **Backend**: Node.js with TypeScript.
- **Machine Learning**: Django, SciSpacy, LangChain, Groq API.
- **OCR**: Tesseract OCR.
- **Database**: PostgreSQL/SQLite (configurable).
- **Environment Management**: Docker, `.env` files for API keys.
- **Deployment**: Vercel (Frontend), Docker, AWS/DigitalOcean (Backend).

---

## 🏗️ Architecture Overview

### **Backend Components**
1. **API Gateway**: Routes requests between frontend, backend, and ML services.
2. **Django ML Server**:
   - Hosts machine learning models.
   - Handles OCR and symptom analysis.
3. **Node.js Server**:
   - Manages user data, authentication, and session handling.

### **Frontend Components**
- User-friendly interface built with Next.js.
- Responsive design for mobile and desktop users.

### **AI Models**
- **OCR**: BERT model fine-tuned for medical text extraction.
- **Chatbot**: LangChain-powered, using Groq API with Llama 3.1-8B-Instant for symptom analysis.

---

## 🔧 Installation & Setup

### **Clone the Repository**
```bash
git clone https://github.com/Latish705/MedinosXAdvitiya-25_CodingKnights.git
cd MedinosXAdvitiya-25_CodingKnights
```

### **Setup Frontend**
```bash
cd apps/web
npm install
npm run dev
```

### **Setup Backend**
```bash
cd apps/server
npm install
npm run build
```

### **Setup ML Server**
```bash
cd apps/ml_server
python -m venv venv
source venv/bin/activate  # (Use `venv\Scripts\activate` on Windows)
pip install -r requirements.txt
```

Download and place the SciBERT model from [SciSpacy](https://allenai.github.io/scispacy/) in the `ml_server` folder.

Start the Django server:
```bash
python manage.py runserver
```

---

## 🔑 API Endpoints

### **OCR Endpoint**
- **POST** `/ocr`
  - **Description**: Processes an image of a prescription and extracts medication details.
  - **Request Body**:
    ```json
    {
      "image_url": "http://example.com/image.jpg"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "processed",
      "raw_text": "Extracted text from image",
      "medications": ["Paracetamol 500mg", "Ibuprofen 200mg"]
    }
    ```

### **Symptom Assessment Endpoint**
- **POST** `/assess_symptoms`
  - **Description**: Analyzes user symptoms and provides structured medical advice.
  - **Request Body**:
    ```json
    {
      "symptoms": "Headache and dizziness"
    }
    ```
  - **Response**:
    ```json
    {
      "advice": "You may be experiencing dehydration or low blood pressure."
    }
    ```

### **Home Endpoint**
- **GET** `/`
  - **Description**: Displays a welcome message and usage instructions.
  - **Response**:
    ```json
    {
      "message": "Welcome to the Symptom Assessment API!"
    }
    ```

---

## 📈 Future Enhancements

1. **Enhanced User Authentication**: Implement role-based access control.
2. **Advanced Chatbot Features**: Add multiple language support and integration with wearable devices.
3. **Improved OCR Accuracy**: Use advanced preprocessing techniques.
4. **Scalable Deployment**: Implement auto-scaling on cloud platforms like AWS.

---

## 📜 Documentation & Live Deployment

- **Documentation**: [Google Docs](https://docs.google.com/document/d/1KsO0jbr0zupdO6jS0Glnl1vZzz4EwsOdRdfvCx7pA_U/edit?tab=t.0)
- **Live Web App**: [MedinosXAdvitiya-25 Coding Knights Web](https://medinos-x-advitiya-25-coding-knights-web-8du8.vercel.app/)

---

## 🤝 Contributors

- **Latish Adwani** 
- **Vineet Chelani** 
- **Yash Sharma** 
- **karan Bhatia** 
- **Soham Chaudhari** 
- **Team Coding Knights**

---

