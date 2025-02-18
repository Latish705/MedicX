# MedinosXAdvitiya-25 Coding Knights

Welcome to the MedinosXAdvitiya-25 Coding Knights repository. This project leverages AI, machine learning, and modern web development to build a healthcare-focused application. Our goal is to deliver fast, accurate, and user-friendly solutions for healthcare challenges.

---

## 📌 Index

1. [🚀 Project Overview](#-project-overview)  
2. [🌟 Key Features](#-key-features)  
3. [🛠️ Tech Stack](#-tech-stack)  
4. [🏗️ Architecture Overview](#-architecture-overview)  
5. [🔧 Installation & Setup](#-installation--setup)  
6. [🔑 API Endpoints](#-api-endpoints)  
7. [📈 Future Enhancements](#-future-enhancements)  
8. [📜 Documentation & Live Deployment](#-documentation--live-deployment)  
9. [🤝 Contributors](#-contributors)

---

## 🚀 Project Overview

MedinosXAdvitiya-25 integrates:

1. **OCR-Based Prescription Processing**  
   Extracts structured medical information from prescription images, reducing manual data entry and expediting patient care.

2. **AI-Powered Symptom Assessment Chatbot**  
   Provides personalized, medically verified guidance based on user symptoms, supporting both emergency screening and routine advice.

Additional benefits include improved data accuracy and faster diagnosis support.

---

## 🌟 Key Features

### **1️⃣ OCR-Based Prescription Processing**
- **Prescription Upload**  
  - Supports both **handwritten** and **computer-generated** prescriptions.
  - Handwritten versions are flagged for **manual review**.

- **Information Extraction**  
  - Extracts key elements such as:
    - **Medicine Names**
    - **Prescribed Dosages**
    - **Additional Information** (e.g., instructions, precautions)

- **Goal**: Accelerate access to critical medical insights and streamline processing.

### **2️⃣ Symptom Assessment Chatbot**
- **Symptom Reporting**  
  - Accepts user inputs describing symptoms via an intuitive interface.

- **AI-Driven Guidance**  
  - Provides **medically verified advice** for common conditions.
  - Recommends **home remedies** or **over-the-counter medications** when appropriate.
  - Offers **professional recommendations** for serious conditions.

- **Goal**: Deliver accurate, real-time guidance while ensuring user safety.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (React-based and performance-optimized)
- **Backend**: Node.js with TypeScript
- **Machine Learning**: Django, SciSpacy, LangChain, Groq API
- **OCR**: Tesseract OCR
- **Database**: PostgreSQL/SQLite (configurable)
- **Environment Management**: Docker and `.env` files for API keys
- **Deployment**: Vercel for the frontend, Docker/AWS/DigitalOcean for the backend

Additional tools and libraries are chosen to maximize performance and scalability.

---

## 🏗️ Architecture Overview

### **Backend Components**
1. **API Gateway**: Routes requests among the frontend, backend, and ML services.
2. **Django ML Server**:
   - Hosts machine learning models.
   - Processes OCR and symptom analysis.
3. **Node.js Server**:
   - Handles user data, authentication, and session management.

### **Frontend Components**
- Built with Next.js for a modern, responsive experience.
- Optimized for both mobile and desktop users.

### **AI Models**
- **OCR**: Utilizes a fine-tuned BERT model for accurate medical text extraction.
- **Chatbot**: Powered by LangChain and Groq API with llama-3.3-70b-versatile to ensure reliable symptom analysis.

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
Download and place the SciBERT model from [SciSpacy](https://allenai.github.io/scispacy/) in the `ml_server` folder, then start the Django server:
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

1. **Enhanced User Authentication**: Implement role-based access control for added security.
2. **Advanced Chatbot Features**: Enable multiple language support and integration with wearable devices.
3. **Improved OCR Accuracy**: Utilize advanced preprocessing techniques to optimize output.
4. **Scalable Deployment**: Implement auto-scaling on cloud platforms like AWS to handle increased traffic.

---

## 📜 Documentation & Live Deployment

- **Documentation**: [Google Docs](https://docs.google.com/document/d/1KsO0jbr0zupdO6jS0Glnl1vZzz4EwsOdRdfvCx7pA_U/edit?tab=t.0)
- **Live Web App**: [MedinosXAdvitiya-25 Coding Knights Web](https://medinos-x-advitiya-25-coding-knights-web-8du8.vercel.app/)

---

## 🤝 Contributors

# **Team CodingKnights**
- **Latish Adwani**
- **Vineet Chelani**
- **Yash Sharma**
- **karan Bhatia**
- **Soham Chaudhari**

---
