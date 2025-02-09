// // pages/profile.tsx
// "use client"
// import { useEffect, useState } from "react";
// import { getCurrentUserToken } from "../../utils/firebase";
// import { BackendUrl } from "../../utils/constants";
// import axios from "axios";
// import Sidebar from "../components/sidebar"; // Import the Sidebar component

// const ProfilePage = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//     const user = {
//         name: "John Doe",
//         email: "john.doe@example.com",
//         uid: "123456789",
//         joined: "January 1, 2024",
//         age: 28,
//         phone: "+91 9876543210",
//         aadhaar: "1234-5678-9012",
//         photoURL: "https://api.dicebear.com/6.x/initials/svg?seed=John%20Doe",
//     };

//     const getUserDetails = async () => {
//         try {
//             const token = await getCurrentUserToken();
//             const res = await axios.get(`${BackendUrl}/user/getDetails`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log("res", res);
//         } catch (error) {
//             console.error("Error fetching user token:", error);
//         }
//     };

//     useEffect(() => {
//         getUserDetails();
//     }, []);

//     return (
//         <div className="h-screen flex">
//             {/* Sidebar Component */}
//             <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//             {/* Burger Icon for small devices */}
//             <div
//                 className="md:hidden fixed top-5 left-5 z-50"
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//                 <button className="text-white p-2 bg-blue-600 rounded-md">
//                     <span className="block w-6 h-0.5 bg-white mb-2"></span>
//                     <span className="block w-6 h-0.5 bg-white mb-2"></span>
//                     <span className="block w-6 h-0.5 bg-white"></span>
//                 </button>
//             </div>

//             {/* Main Content */}
//             <div className="ml-[20%] md:ml-[0%] w-[80%] flex flex-col items-center justify-center p-6">
//                 {/* Profile Card */}
//                 <div className="max-w-4xl w-full bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/40 hover:scale-105 transition-all">
//                     {/* Profile Header */}
//                     <div className="flex items-center gap-6 mb-6">
//                         <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
//                             <img src={user.photoURL} alt={user.name} className="object-cover w-full h-full" />
//                         </div>
//                         <div>
//                             <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
//                             <p className="text-lg text-gray-500">{user.email}</p>
//                         </div>
//                     </div>

//                     {/* User Details Section */}
//                     <div className="grid grid-cols-2 gap-6 text-lg text-gray-700">
//                         <p><span className="font-semibold text-gray-900">Email:</span> {user.email}</p>
//                         <p><span className="font-semibold text-gray-900">Age:</span> {user.age}</p>
//                         <p><span className="font-semibold text-gray-900">Phone No:</span> {user.phone}</p>
//                         <p><span className="font-semibold text-gray-900">Aadhaar ID:</span> {user.aadhaar}</p>
//                         <p><span className="font-semibold text-gray-900">Joined:</span> {user.joined}</p>
//                     </div>
//                 </div>

//                 {/* Previous Prescriptions Section */}
//                 <div className="mt-8 w-full max-w-4xl bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition-all">
//                     <h1 className="text-2xl font-semibold text-gray-800">Previous Prescriptions</h1>
//                     <p className="text-gray-600 mt-2">No prescriptions available.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;



// pages/profile.tsx
"use client";
import { useEffect, useState } from "react";
import { getCurrentUserToken } from "../../utils/firebase";
import { BackendUrl } from "../../utils/constants";
import axios from "axios";
import Sidebar from "../components/sidebar"; // Import the Sidebar component

const ProfilePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null); // State to store user details
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState<string | null>(null); // State for error message

    const getUserDetails = async () => {
        try {
            const token = await getCurrentUserToken();
            const res = await axios.get(`${BackendUrl}/user/getDetails`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data); // Assuming the API response contains user details
            setError(null);
        } catch (err) {
            console.error("Error fetching user details:", err);
            setError("Failed to fetch user details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }

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
            <div className="ml-[20%] md:ml-[0%] w-[80%] flex flex-col items-center justify-center p-6">
                {/* Profile Card */}
                <div className="max-w-4xl w-full bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/40 hover:scale-105 transition-all">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
                            <img src={user.photoURL} alt={user.name} className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
                            <p className="text-lg text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    {/* User Details Section */}
                    <div className="grid grid-cols-2 gap-6 text-lg text-gray-700">
                        <p><span className="font-semibold text-gray-900">Email:</span> {user.email}</p>
                        <p><span className="font-semibold text-gray-900">Age:</span> {user.age}</p>
                        <p><span className="font-semibold text-gray-900">Phone No:</span> {user.phone}</p>
                        <p><span className="font-semibold text-gray-900">Aadhaar ID:</span> {user.aadhaar}</p>
                        <p><span className="font-semibold text-gray-900">Joined:</span> {user.joined}</p>
                    </div>
                </div>

                {/* Previous Prescriptions Section */}
                <div className="mt-8 w-full max-w-4xl bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition-all">
                    <h1 className="text-2xl font-semibold text-gray-800">Previous Prescriptions</h1>
                    <p className="text-gray-600 mt-2">No prescriptions available.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
