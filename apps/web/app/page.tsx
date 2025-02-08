"use client";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";



import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // For animations

export default function LandingPage() {
  const [prescription, setPrescription] = useState(null);
  const router = useRouter();

  // Navigate to the login page
  const navigateToLogin = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white"
      >
        <h1 className="text-5xl font-extrabold mb-6">AI-Driven Prescription Insights</h1>
        <p className="text-lg mb-8">Login to upload your prescription and receive personalized dosage suggestions.</p>
        <button
          onClick={() => navigateToLogin()}
          className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-full text-xl shadow-md hover:bg-blue-100 transition-all duration-300"
        >
          Login
        </button>
      </motion.header>

      {/* How it Works Section */}
      <section className="p-12 text-center bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">How It Works</h2>
        <div className="flex justify-center items-center space-x-10">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-lg shadow-xl max-w-xs transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">Step 1: Login</h3>
            <p>Login to access your profile and upload your prescription.</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="p-6 bg-white rounded-lg shadow-xl max-w-xs transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">Step 2: Get AI Insights</h3>
            <p>Our AI will analyze your prescription and suggest dosage, duration, and more.</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="p-6 bg-white rounded-lg shadow-xl max-w-xs transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">Step 3: Take Action</h3>
            <p>Follow the personalized recommendations to ensure safe and effective treatment.</p>
          </motion.div>
        </div>
      </section>

      {/* Prescription Upload Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center py-12"
      >
        <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-xl border-2 border-dashed border-gray-300">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Upload Your Prescription</h2>
          <div className="border-2 border-dashed border-gray-400 p-6 text-center rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-600 mb-4">Drag & drop your prescription here, or click to select</p>
            
            {
              //@ts-ignore
            prescription && <p className="mt-4 text-blue-600">{prescription.name}</p>}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">What Our Users Say</h2>
        <div className="flex justify-center space-x-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-72 bg-white p-6 rounded-lg shadow-xl"
          >
            <p className="text-gray-600 italic mb-4">"The AI provided valuable insights about my prescription and dosage! Very helpful!"</p>
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-gray-500">Patient</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-72 bg-white p-6 rounded-lg shadow-xl"
          >
            <p className="text-gray-600 italic mb-4">"A lifesaver! It helped me understand the details of my prescription and avoid mistakes."</p>
            <h4 className="font-semibold">Jane Smith</h4>
            <p className="text-gray-500">Patient</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 Prescription AI Insights. All rights reserved.</p>
      </footer>
    </div>
  );
}
