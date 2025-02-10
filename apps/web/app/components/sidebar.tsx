// components/Sidebar.tsx
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "../../utils/firebase";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
    const router = useRouter();

    const handleLogout = async () => {
        // Handle the logout logic
        await logout();
        router.push("/signin"); // Redirect to login page after logout
    };

    return (
        <div
            className={`fixed md:relative w-[20%] h-full bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6 transition-all transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:block md:bg-gradient-to-b from-blue-600 to-blue-500`}
        >
            <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">Dashboard</h2>
            <ul>
                <li className="mb-6 p-3 hover:bg-white hover:text-blue-400 hover:rounded-xl text-center transition-all">
                    <Link href={'/profile'} className="text-lg font-semibold">Profile</Link>
                </li>
                <li className="mb-6 p-3 hover:bg-white hover:text-blue-400 hover:rounded-xl text-center transition-all">
                    <Link href={'/chat'} className="text-lg font-semibold">Upload prescription</Link>
                </li>
                <li className="mb-6 p-3 hover:bg-white hover:text-blue-400 hover:rounded-xl text-center transition-all">
                    <Link href={'/prescription'} className="text-lg font-semibold">Prescriptions</Link>
                </li>
                <li className="mb-6 p-3 hover:bg-white hover:text-blue-400 hover:rounded-xl text-center transition-all">
                    <Link href={'/chatBot'} className="text-lg font-semibold">Chat Bot</Link>
                </li>
                <li className="mt-8 hover:bg-white hover:rounded-xl p-2">
                    <button onClick={handleLogout} className="w-full text-lg font-bold hover:scale-105 text-red-400 hover:text-red-600 transition-all">
                        Log Out
                    </button>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;
