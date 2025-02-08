"use client";
import { useState } from "react"; // Fixed import
import axios from "axios"; // Correct i
import { useRouter } from "next/navigation"; // Fixed import
import { getCurrentUserToken, signInWithGoogle } from "../../../utils/firebase";
import { BackendUrl } from "../../page"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"user" | "startup">("user");
  const router = useRouter(); // Fixed 'route' to 'router'
  const [loading, setLoading] = useState(false); // To handle loading state

  const checkFirstTimeLogin = async () => {
    setLoading(true);
    try {
      const token = await getCurrentUserToken();
      const res = await axios.get(`${BackendUrl}/user/first_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      if (res.data.firstTimeLogin) {
        alert("First Time Login");
        router.push("/userKyc");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error checking first-time login:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(); 
      checkFirstTimeLogin(); // Redirect after Google login
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    checkFirstTimeLogin(); // Call login check
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
            <p className="text-gray-500 text-sm">Choose your account type</p>
          </div>

          <div className="flex space-x-2 mb-6">
            <button
              className={`w-1/2 py-2 rounded-md font-medium transition ${
                activeTab === "user"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("user")}
            >
              User
            </button>
            <button
              className={`w-1/2 py-2 rounded-md font-medium transition ${
                activeTab === "startup"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("startup")}
            >
              Startup
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}> {/* Prevent form default submit */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium shadow-md hover:bg-blue-700 transition"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center bg-white border border-gray-300 py-2 rounded-md font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            <GoogleIcon className="h-5 w-5 mr-2" />
            {loading ? "Logging In..." : "Login with Google"}
          </button>
        </div>
      </div>

      {/* Right Section - Appealing Info */}
      <div className="w-full md:w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg mb-6 text-center">
          Join thousands of startups and users who are innovating and growing with us. Whether you're a user looking to explore or a startup seeking investment, our platform connects you with the best opportunities.
        </p>
        <button
          onClick={() => alert("Learn More clicked")}
          className="bg-white text-blue-600 py-2 px-6 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.24 10.28c-.66-.33-1.42-.5-2.22-.5-1.71 0-3.08.89-3.08 2.02s1.37 2.02 3.08 2.02c.8 0 1.56-.17 2.22-.5l1.02 1.02c.39.39.99.59 1.61.59 1.17 0 2.11-.8 2.11-2.11 0-.8-.46-1.5-1.28-1.84zM18.32 21.34c-1.11.01-2.02-.5-2.59-1.34-.57-.84-.86-1.94-.86-3.14 0-1.17.29-2.24.86-3.14.57-.84 1.48-1.34 2.59-1.34 1.71 0 3.08.89 3.08 2.02 0 1.13-.37 2.11-1.02 2.85-.65.74-1.48 1.2-2.42 1.34z"
      fill="currentColor"
    />
  </svg>
);

