// pages/prescriptions.tsx
"use client"
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar"; // Sidebar component
import { useRouter } from "next/navigation";
import axios from "axios";
import { BackendUrl } from "../../utils/constants";
import { getCurrentUserToken } from "../../utils/firebase";

const PrescriptionsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState<any[]>([]); // Array to store prescriptions
  const router = useRouter();

  // Function to fetch prescriptions from the backend
  const fetchPrescriptions = async () => {
    try {
      const token = await getCurrentUserToken();
      const res = await axios.get(`${BackendUrl}/prescriptions/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrescriptions(res.data); // Assuming the response is an array of prescriptions
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  useEffect(() => {
    fetchPrescriptions(); // Fetch prescriptions when the component mounts
  }, []);

  const handleAddPrescription = () => {
    router.push("/chat"); // Navigate to the page where you can add new prescriptions
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Burger Icon for small devices */}
      <div
        className="md:hidden fixed top-5 left-5 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <button className="text-white p-2 bg-blue-600 rounded-md">
          <span className="block w-6 h-0.5 bg-white mb-2"></span>
          <span className="block w-6 h-0.5 bg-white mb-2"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-[20%] md:ml-[0%] w-[80%] p-6">
        <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/40">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Prescriptions</h1>

          {/* Prescriptions List */}
          <div className="space-y-4">
            {prescriptions.length > 0 ? (
              prescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="border p-4 rounded-lg shadow-md bg-gray-100"
                >
                  <h3 className="text-xl font-semibold">{prescription.name}</h3>
                  <p>{prescription.details}</p>
                  <p className="text-sm text-gray-500">Added on: {prescription.createdAt}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No prescriptions found.</p>
            )}
          </div>
        </div>

        {/* Add Prescription Button */}
        <button
          onClick={handleAddPrescription}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
