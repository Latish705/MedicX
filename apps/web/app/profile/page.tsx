// "use client";

// import { useState, useEffect } from "react";
// import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation.js";
// // import { signInWithGoogle, getCurrentUserToken } from "../../utils/firebase";

// export default function ProfilePage() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const auth = getAuth();

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//         setLoading(false);
//       } else {
//         setUser(null);
//         setLoading(false);
//         router.push("/login"); // Redirect to login if not authenticated
//       }
//     });
//   }, [auth, router]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push("/login");
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6">
//         <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
//         <ul>
//           <li className="mb-6">
//             <a href="#" className="text-lg font-semibold hover:text-gray-200">
//               Profile
//             </a>
//           </li>
//           <li className="mb-6">
//             <a href="#" className="text-lg font-semibold hover:text-gray-200">
//               Settings
//             </a>
//           </li>
//           <li className="mb-6">
//             <button
//               onClick={handleLogout}
//               className="text-lg font-semibold text-red-400 hover:text-red-500 w-full text-left"
//             >
//               Log Out
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 bg-gray-100 p-8 overflow-y-auto">
//         {loading ? (
//           <div className="text-center text-xl font-medium text-gray-600">Loading...</div>
//         ) : user ? (
//           <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
//             <div className="flex items-center gap-8 mb-6">
//               {/* Profile Image */}
//               <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl border-4 border-white">
//                 {/* <img
//                   src={user.photoURL || "https://via.placeholder.com/150"}
//                   alt={user.displayName || "User"}
//                   className="object-cover w-full h-full"
//                 /> */}
//               </div>
//               <div>
//                 <h1 className="text-3xl font-semibold text-gray-800">{user.displayName}</h1>
//                 <p className="text-lg text-gray-500">{user.email}</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-700">User Details</h2>
//                 <ul className="space-y-3 mt-2 text-lg text-gray-600">
//                   <li>
//                     <span className="font-medium text-gray-800">Email: </span>
//                     {user.email}
//                   </li>
//                   <li>
//                     <span className="font-medium text-gray-800">UID: </span>
//                     {user.uid}
//                   </li>
//                   <li>
//                     <span className="font-medium text-gray-800">Joined: </span>
//                     {new Date(user.metadata.creationTime).toLocaleDateString()}
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center text-xl font-medium text-gray-600">No user found. Please log in.</div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    uid: "123456789",
    joined: "January 1, 2024",
    photoURL: "https://api.dicebear.com/6.x/initials/svg?seed=John%20Doe",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <ul>
          <li className="mb-6">
            <a href="#" className="text-lg font-semibold hover:text-gray-200">
              Profile
            </a>
          </li>
          <li className="mb-6 hover:">
            <a href="#" className="text-lg font-semibold hover:text-gray-200">
              Prescriptions
            </a>
          </li>
          <li className="mb-6">
            <a href="#" className="text-lg font-semibold hover:text-gray-200">
              Settings
            </a>
          </li>
          <li className="mb-6">
            <button
              className="text-lg font-semibold text-red-400 hover:text-red-500 w-full text-left"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-gray-100 p-8 flex justify-center items-center">
        <div className="max-w-4xl bg-white p-8 rounded-xl shadow-lg space-y-6 w-full">
          <div className="flex items-center gap-8 mb-6">
            {/* Profile Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl border-4 border-white">
              <img
                src={user.photoURL}
                alt={user.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
              <p className="text-lg text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">User Details</h2>
              <ul className="space-y-3 mt-2 text-lg text-gray-600">
                <li>
                  <span className="font-medium text-gray-800">Email: </span>
                  {user.email}
                </li>
                <li>
                  <span className="font-medium text-gray-800">UID: </span>
                  {user.uid}
                </li>
                <li>
                  <span className="font-medium text-gray-800">Joined: </span>
                  {user.joined}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
