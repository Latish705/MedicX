"use client";

import axios from "axios";
import { useState } from "react";
import { BackendUrl } from "../../utils/constants";
// import { getCurrentUserToken } from "../../utils/firebase";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    age: "",
    aadhar: "",
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", phone: "", age: "", aadhar: "" };

    if (formData.name.trim() === "") {
      newErrors.name = "Username is required.";
      isValid = false;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (formData.age === "" || isNaN(Number(formData.age)) || Number(formData.age) < 18) {
      newErrors.age = "Age must be 18 or above.";
      isValid = false;
    }

    if (!/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = "Aadhar must be a 12-digit number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      
      // alert("Form submitted successfully!");

      // const token = await getCurrentUserToken();
      const token = localStorage.getItem('token');
      console.log(formData  );
      const response = await axios.post(`${BackendUrl}/user/signup`, formData,{headers: {Authorization: `Bearer ${token}`},});
      console.log(response);
      if(response.data.success){
        router.push("/medicalhistory");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

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

          {/* Aadhar Number */}
          <div>
            <label className="block text-gray-700 font-medium">Aadhar Number</label>
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your 12-digit Aadhar number"
            />
            {errors.aadhar && <p className="text-red-500 text-sm mt-1">{errors.aadhar}</p>}
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
