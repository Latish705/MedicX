"use client";

import { useState } from "react";

export default function InvestmentForm() {
  const [aadhar, setAadhar] = useState("");
  const [bank, setBank] = useState("");
  const [pan, setPan] = useState("");
  const [video, setVideo] = useState<File | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ aadhar, bank, pan, video });
    alert("Investment details submitted successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Startup Investment Form
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Aadhar Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX"
              maxLength={12}
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Bank Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
            <input
              type="text"
              placeholder="Enter your bank account number"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* PAN Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">PAN Number</label>
            <input
              type="text"
              placeholder="XXXXX1234X"
              maxLength={10}
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md uppercase focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Verification Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md file:bg-blue-600 file:text-white file:px-4 file:py-2 file:border-none file:rounded-md file:cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium shadow-md hover:bg-blue-700 transition"
          >
            Submit Investment Details
          </button>
        </form>
      </div>
    </div>
  );
}
