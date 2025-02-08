"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import next router for navigation

export default function HomePage() {
  const [prescription, setPrescription] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const router = useRouter(); // Initialize router for navigation

  // Navigate to the profile page
  const navigateToProfile = () => {
    router.push("/profile");
  };

  // Handle file drop
  // const onDrop = (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   setPrescription(file);
  // };

  // Chatbot response (just a simple mock for now)
  // const handleChatSubmit = () => {
  //   if (userMessage.trim()) {
  //     setChatMessages((prevMessages) => [
  //       ...prevMessages,
  //       { sender: "user", message: userMessage },
  //     ]);

  //     // Mock bot response
  //     setTimeout(() => {
  //       setChatMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: "bot", message: "Thank you for your message. We'll get back to you soon!" },
  //       ]);
  //     }, 1000);
  //   }
  //   setUserMessage("");
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: ".pdf,.jpg,.jpeg,.png", // Accept only specific file types
  // });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header with Profile Icon */}
      <header className="bg-white text-gray-800 p-6 text-center font-semibold text-3xl shadow-lg flex justify-between items-center">
        <span>Prescription Upload & Chatbot</span>
        {/* Profile Icon */}
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
          <div
            // {...getRootProps()}  // Uncomment when functionality is added
            className="border-2 border-dashed h-[80%] border-gray-300 p-8 text-center rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-500"
          >
            {/* <input {...getInputProps()} /> */}
            <p className="text-gray-600">Drag & drop your prescription here, or click to select</p>
            {prescription && <p className="mt-4 text-blue-600">{prescription.name}</p>}
          </div>
        </div>

        {/* Right Section - Chatbot (Ask about Prescription) */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Ask about Prescription</h2>
          <div className="flex flex-col h-[400px] border-2 border-gray-300 p-6 overflow-y-auto rounded-lg mb-6 bg-gray-50">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 mb-4 rounded-md ${
                  msg.sender === "user" ? "bg-blue-100 text-gray-800" : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500"
              placeholder="Type your message..."
            />
            <button
              // onClick={handleChatSubmit} // Uncomment when functionality is added
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-600 p-6 text-center shadow-md">
        <p>&copy; 2025 Prescription Upload & Chatbot. All rights reserved.</p>
      </footer>
    </div>
  );
}
