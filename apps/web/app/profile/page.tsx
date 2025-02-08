// // "use client";

// // export default function ProfilePage() {
// //   const user = {
// //     name: "John Doe",
// //     email: "john.doe@example.com",
// //     uid: "123456789",
// //     joined: "January 1, 2024",
// //     age: 28,
// //     phone: "+91 9876543210",
// //     aadhaar: "1234-5678-9012",
// //     photoURL: "https://api.dicebear.com/6.x/initials/svg?seed=John%20Doe",
// //   };

// //   return (
// //     <div className="h-screen flex bg-gray-100">
// //       {/* Sidebar */}
// //       <div className="w-[20%] h-full bg-slate-800 text-white p-6 fixed">
// //         <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
// //         <ul>
// //           <li className="mb-6 hover:bg-slate-100 text-center hover:rounded-xl p-3 hover:text-black">
// //             <a href="#" className="text-lg font-semibold">
// //               Profile
// //             </a>
// //           </li>
// //           <li className="mb-6 hover:bg-slate-100 text-center hover:rounded-xl p-3 hover:text-black">
// //             <a href="#" className="text-lg font-semibold">
// //               Prescriptions
// //             </a>
// //           </li>
        
// //           <li className="mb-6 hover:bg-slate-100  hover:rounded-xl p-3">
// //             <button className="text-lg font-semibold text-red-400 hover:text-red-900 w-full text-center">
// //               Log Out
// //             </button>
// //           </li>
// //         </ul>
// //       </div>

// //       {/* Main Content */}
// //       <div className="ml-[20%] w-[90%] flex flex-col items-center justify-center">
// //         <div className="max-w-4xl w-full hover:scale-105 transition-all  bg-white p-8 rounded-xl shadow-lg space-y-6">
// //           {/* Profile Section */}
// //           <div className="flex items-center gap-8 mb-6">
// //             {/* Profile Image */}
// //             <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl border-4 border-white">
// //               <img
// //                 src={user.photoURL}
// //                 alt={user.name}
// //                 className="object-cover w-full h-full"
// //               />
// //             </div>
// //             <div>
// //               <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
// //               <p className="text-lg text-gray-500">{user.email}</p>
// //             </div>
// //           </div>

// //           {/* User Details Section */}
// //           <div className="space-y-4">
// //             <h2 className="text-xl font-semibold text-gray-700">User Details</h2>
// //             <ul className="space-y-3 mt-2 text-lg text-gray-600">
// //               <li>
// //                 <span className="font-medium text-gray-800">Email: </span>
// //                 {user.email}
// //               </li>
// //               <li>
// //                 <span className="font-medium text-gray-800">Age: </span>
// //                 {user.age}
// //               </li>
// //               <li>
// //                 <span className="font-medium text-gray-800">Phone No: </span>
// //                 {user.phone}
// //               </li>
// //               <li>
// //                 <span className="font-medium text-gray-800">Aadhaar ID: </span>
// //                 {user.aadhaar}
// //               </li>
// //               <li>
// //                 <span className="font-medium text-gray-800">Joined: </span>
// //                 {user.joined}
// //               </li>
// //             </ul>
// //           </div>
// //         </div>

// //         {/* Previous Prescriptions Section */}
// //         <div className="mt-8 w-full max-w-4xl hover:scale-105 transition-all bg-white p-6 rounded-xl shadow-lg">
// //           <h1 className="text-2xl font-semibold text-gray-800">Previous Prescriptions</h1>
// //           <p className="text-gray-600 mt-2">No prescriptions available.</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// "use client";

// export default function ProfilePage() {
//   const user = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     uid: "123456789",
//     joined: "January 1, 2024",
//     age: 28,
//     phone: "+91 9876543210",
//     aadhaar: "1234-5678-9012",
//     photoURL: "https://api.dicebear.com/6.x/initials/svg?seed=John%20Doe",
//   };

//   return (
//     <div className="h-screen flex bg-gradient-to-br from-gray-100 to-gray-300">
//       {/* Sidebar */}
//       <div className="w-[20%] h-full bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6 fixed">
//         <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">Dashboard</h2>
//         <ul>
//           <li className="mb-6 p-3   hover:bg-white/20 hover:rounded-xl text-center transition-all">
//             <a href="#" className="text-lg font-semibold">Profile</a>
//           </li>
//           <li className="mb-6 p-3   hover:bg-white/20 hover:rounded-xl text-center transition-all">
//             <a href="#" className="text-lg font-semibold">Prescriptions</a>
//           </li>
//           <li className="mt-8">
//             <button className="w-full text-lg font-bold hover:scale-105  text-red-400 hover:text-red-600 transition-all">
//               Log Out
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="ml-[20%] w-[80%] flex flex-col items-center justify-center p-6">
//         {/* Profile Card */}
//         <div className="max-w-4xl w-full bg-white/60 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/40 hover:scale-105 transition-all">
//           {/* Profile Header */}
//           <div className="flex items-center gap-6 mb-6">
//             <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
//               <img src={user.photoURL} alt={user.name} className="object-cover w-full h-full" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
//               <p className="text-lg text-gray-500">{user.email}</p>
//             </div>
//           </div>

//           {/* User Details Section */}
//           <div className="grid grid-cols-2 gap-6 text-lg text-gray-700">
//             <p><span className="font-semibold text-gray-900">Email:</span> {user.email}</p>
//             <p><span className="font-semibold text-gray-900">Age:</span> {user.age}</p>
//             <p><span className="font-semibold text-gray-900">Phone No:</span> {user.phone}</p>
//             <p><span className="font-semibold text-gray-900">Aadhaar ID:</span> {user.aadhaar}</p>
//             <p><span className="font-semibold text-gray-900">Joined:</span> {user.joined}</p>
//           </div>
//         </div>

//         {/* Previous Prescriptions Section */}
//         <div className="mt-8 w-full max-w-4xl bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition-all">
//           <h1 className="text-2xl font-semibold text-gray-800">Previous Prescriptions</h1>
//           <p className="text-gray-600 mt-2">No prescriptions available.</p>
//         </div>
//       </div>
//     </div>
//   );
// }



// Ensure you have the default export
"use client";

import { useState } from "react";

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    uid: "123456789",
    joined: "January 1, 2024",
    age: 28,
    phone: "+91 9876543210",
    aadhaar: "1234-5678-9012",
    photoURL: "https://api.dicebear.com/6.x/initials/svg?seed=John%20Doe",
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Sidebar - Visible only when sidebarOpen is true */}
      <div
        className={`fixed md:relative w-[20%] h-full bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6 transition-all transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block md:bg-gradient-to-b from-gray-900 to-gray-700`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">Dashboard</h2>
        <ul>
          <li className="mb-6 p-3 hover:bg-white/20 hover:rounded-xl text-center transition-all">
            <a href="#" className="text-lg font-semibold">Profile</a>
          </li>
          <li className="mb-6 p-3 hover:bg-white/20 hover:rounded-xl text-center transition-all">
            <a href="#" className="text-lg font-semibold">Prescriptions</a>
          </li>
          <li className="mt-8">
            <button className="w-full text-lg font-bold hover:scale-105 text-red-400 hover:text-red-600 transition-all">
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Burger Icon for small devices */}
      <div
        className="md:hidden fixed top-5 left-5 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <button className="text-white p-2 bg-gray-800 rounded-md">
          <span className="block w-6 h-0.5 bg-white mb-2"></span>
          <span className="block w-6 h-0.5 bg-white mb-2"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-[20%] md:ml-[0%] w-[80%] flex flex-col items-center justify-center p-6">
        {/* Profile Card */}
        <div className="max-w-4xl w-full bg-white/60 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/40 hover:scale-105 transition-all">
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
