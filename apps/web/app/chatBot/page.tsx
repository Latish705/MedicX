"use client"
import { useState } from "react";
import Sidebar from "../components/sidebar"; // Import Sidebar component
// import { getCurrentUserToken } from "../../utils/firebase";
import axios from "axios";
import { BackendUrl } from "../../utils/constants";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [messages, setMessages] = useState<
    { sender: string; text: string; isHTML?: boolean }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Fix: Add sidebar state

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { sender: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      setLoading(true);

      try {
        // const token = await getCurrentUserToken();
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${BackendUrl}/user/symptoms`,
          { symptoms: input },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (
          response.data &&
          response.data.data &&
          response.data.data.advice
        ) {
          const botMessage = {
            sender: "bot",
            text: response.data.data.advice,
            isHTML: true,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: "Sorry, something went wrong. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4">Chatbot</h2>

        <div className="flex-1 overflow-y-auto bg-white p-4 shadow-md rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {message.isHTML ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-2">
              <div className="p-3 rounded-lg max-w-xs bg-gray-300 text-black">
                ...Loading
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="ml-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
