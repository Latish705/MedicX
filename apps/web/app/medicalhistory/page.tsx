"use client";

import axios from "axios";
import {useRouter} from "next/navigation";
import { useState } from "react";
import { BackendUrl } from "../../utils/constants";
import { getCurrentUserToken } from "../../utils/firebase";

interface FormData {
  pre_existing_conditions: string[];
  allergies: string[];
  medications: Record<string, string>;
  past_surgeries: string[];
  lifestyle: Record<string, string | boolean>;
  recent_issues: string[];
  [key: string]: any;
}

export default function UserForm() {
const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    pre_existing_conditions: ["Type 2 Diabetes", "Hypertension"],
    allergies: ["Penicillin", "Aspirin"],
    medications: { Metformin: "500mg daily", Lisinopril: "10mg daily" },
    past_surgeries: ["Appendectomy (2015)"],
    lifestyle: { smoking: false, alcohol: "Occasional", exercise: "Moderate" },
    recent_issues: ["Seasonal allergies", "Occasional acid reflux"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (key: string, index: number, value: string) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[key]];
      updatedArray[index] = value;
      return { ...prevData, [key]: updatedArray };
    });
  };

  const handleAddToArray = (key: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...(prevData[key] || []), ""],
    }));
  };

  const validateForm = () => {
    // if (!formData.username.trim()) {
    //   alert("Username is required.");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      const token = await getCurrentUserToken();
      console.log("Submitting form...",token);
      // Complete
      const response = await axios.post(`${BackendUrl}/user/fill_medical_history`, formData,{headers: {Authorization: `Bearer ${token}`},});
        console.log(response);
        if(response.data.success){
          router.push("/profile");
        }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Dynamic User Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div> */}
          {["pre_existing_conditions", "allergies", "recent_issues"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium">{field.replace(/([A-Z])/g, ' $1')}</label>
              {formData[field].map((item: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    onChange={(e) => handleArrayChange(field, index, e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddToArray(field)}
                className="mt-2 text-blue-600"
              >
                + Add {field.replace(/([A-Z])/g, ' $1')}
              </button>
            </div>
          ))}
          <div>
            <label className="block text-gray-700 font-medium">Past Surgeries</label>
            {formData.past_surgeries.map((surgery: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  onChange={(e) => handleArrayChange("past_surgeries", index, e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter surgery"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddToArray("past_surgeries")}
              className="mt-2 text-blue-600"
            >
              + Add Surgery
            </button>
          </div>
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