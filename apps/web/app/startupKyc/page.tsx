"use client";

import { useState } from "react";

export default function StartupForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [yearStarted, setYearStarted] = useState("");
  const [numEmployees, setNumEmployees] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, address, yearStarted, numEmployees });
    alert("Startup details submitted successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Startup Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Startup Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Startup Name</label>
            <input
              type="text"
              placeholder="Enter your startup name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Startup Address</label>
            <input
              type="text"
              placeholder="Enter startup address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Year Started (with Calendar Picker) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Year Started</label>
            <input
              type="date"
              value={yearStarted}
              onChange={(e) => setYearStarted(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Number of Employees */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Employees</label>
            <input
              type="number"
              placeholder="Enter number of employees"
              value={numEmployees}
              onChange={(e) => setNumEmployees(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
          >
            Submit Startup Details
          </button>
        </form>
      </div>
    </div>
  );
}
