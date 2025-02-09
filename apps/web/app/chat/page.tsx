"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BackendUrl } from "../../utils/constants";
import { getCurrentUserToken } from "../../utils/firebase";

export default function HomePage() {
  const [prescription, setPrescription] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  // Dummy prescription data
  const medicalDetails = {
    medicationName: "Amoxicillin 500mg",
    dosage: "Take 1 tablet 3 times a day",
    instructions: "Finish the course of medication completely, even if you feel better.",
  };

  // Navigate to the profile page
  const navigateToProfile = () => {
    router.push("/profile");
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setPrescription(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Handle the "Send" button click
  const handleSend = async () => {
    if (!prescription) {
      alert("Please upload a prescription first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("prescription", prescription);

      const token = await getCurrentUserToken();  
      const response = await axios.post(`${BackendUrl}/user/ocr`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      alert(`Prescription "${prescription.name}" sent successfully!`);
    } catch (error) {
      console.error("Error uploading prescription:", error);
      alert("Failed to upload prescription. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header with Profile Icon */}
      <header className="bg-white text-gray-800 p-6 text-center font-semibold text-3xl shadow-lg flex justify-between items-center">
        <span>Prescription Upload & Details</span>
        <div
          onClick={navigateToProfile}
          className="cursor-pointer text-gray-600 hover:text-blue-600 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 2a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4zM5 10a5 5 0 015-5 5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5zm0 7a3 3 0 013-3h4a3 3 0 013 3v2H5v-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 w-[80%] mx-auto p-8 gap-12">
        {/* Left Section - Prescription Upload */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Your Prescription</h2>
          <div className="border-2 border-dashed h-[80%] border-gray-300 p-8 text-center rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-500">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <p className="text-gray-600">Drag & drop your prescription here, or click to select</p>
            </label>
            {previewUrl && (
              <div className="mt-4">
                <img src={previewUrl} alt="Prescription Preview" className="w-32 h-32 object-cover rounded-md" />
                <p className="mt-2 text-blue-600">{prescription?.name}</p>
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Send
          </button>
        </div>

        {/* Right Section - Prescription Details */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Prescription Details</h2>
          <div className="p-6 bg-gray-50 border-2 border-gray-300 rounded-lg">
            <p className="text-lg font-semibold text-gray-700">Medication: {medicalDetails.medicationName}</p>
            <p className="mt-2 text-gray-600">Dosage: {medicalDetails.dosage}</p>
            <p className="mt-2 text-gray-600">Instructions: {medicalDetails.instructions}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-600 p-6 text-center shadow-md">
        <p>&copy; 2025 Prescription Upload & Details. All rights reserved.</p>
      </footer>
    </div>
  );
}
