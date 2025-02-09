"use client";

import { useState } from "react";

export default function UserDetailsForm() {
  const [formData, setFormData] = useState({
    age: "",
    preExistingConditions: "",
    allergies: "",
    medications: "",
    pastSurgeries: "",
    lifestyle: {
      smoking: "",
      alcohol: "",
      exercise: "",
    },
    recentIssues: "",
  });

  const [errors, setErrors] = useState({
    age: "",
    preExistingConditions: "",
    allergies: "",
    medications: "",
    pastSurgeries: "",
    lifestyle: {
      smoking: "",
      alcohol: "",
      exercise: "",
    },
    recentIssues: "",
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      age: "",
      preExistingConditions: "",
      allergies: "",
      medications: "",
      pastSurgeries: "",
      lifestyle: {
        smoking: "",
        alcohol: "",
        exercise: "",
      },
      recentIssues: "",
    };

    if (formData.age === "" || isNaN(Number(formData.age)) || Number(formData.age) < 18) {
      newErrors.age = "Age must be 18 or above.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name in formData.lifestyle) {
      setFormData({
        ...formData,
        lifestyle: {
          ...formData.lifestyle,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Health Details Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Pre-Existing Conditions */}
          <div>
            <label className="block text-gray-700 font-medium">Pre-Existing Conditions</label>
            <input
              type="text"
              name="preExistingConditions"
              value={formData.preExistingConditions}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Diabetes, Hypertension"
            />
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-gray-700 font-medium">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Penicillin, Aspirin"
            />
          </div>

          {/* Medications */}
          <div>
            <label className="block text-gray-700 font-medium">Medications</label>
            <input
              type="text"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Metformin: 500mg daily"
            />
          </div>

          {/* Past Surgeries */}
          <div>
            <label className="block text-gray-700 font-medium">Past Surgeries</label>
            <input
              type="text"
              name="pastSurgeries"
              value={formData.pastSurgeries}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Appendectomy (2015)"
            />
          </div>

          {/* Lifestyle */}
          <div>
            <label className="block text-gray-700 font-medium">Lifestyle</label>
            <div className="space-y-2">
              <input
                type="text"
                name="smoking"
                value={formData.lifestyle.smoking}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Smoking: Yes/No"
              />
              <input
                type="text"
                name="alcohol"
                value={formData.lifestyle.alcohol}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Alcohol: None/Occasional/Frequent"
              />
              <input
                type="text"
                name="exercise"
                value={formData.lifestyle.exercise}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Exercise: None/Moderate/Regular"
              />
            </div>
          </div>

          {/* Recent Issues */}
          <div>
            <label className="block text-gray-700 font-medium">Recent Issues</label>
            <input
              type="text"
              name="recentIssues"
              value={formData.recentIssues}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Seasonal allergies, Acid reflux"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}