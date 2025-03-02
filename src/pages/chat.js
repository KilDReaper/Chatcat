import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chathistory");
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const response = await axios.post("http://localhost:5000/api/chat", { message: input });
      setMessages([{ user_message: input, bot_reply: response.data.reply }, ...messages]);
      setInput("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete("http://localhost:5000/api/chat/delete");
      setMessages([]);
    } catch (error) {
      console.error("Failed to clear history", error);
    }
  };

  const handleLogout = () => {
    // Remove user session (if using localStorage or cookies)
    localStorage.removeItem("token"); // Assuming token-based auth
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="chat-layout">
      {/* Left Panel - Settings & Clear History */}
      <div className="left-panel">
        <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>⚙️</button>
        {showSettings && (
          <div className="settings-panel">
            <h3>Settings</h3>
            <button className="clear-history-btn" onClick={clearHistory}>Clear History</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="close-btn" onClick={() => setShowSettings(false)}>Close</button>
          </div>
        )}
      </div>

      {/* Center - Chatbox */}
      <div className="chat-container">
        <h2>Chat</h2>
        <div className="chat-box">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>User:</strong> {msg.user_message}
                <br />
                <strong>Bot:</strong> {msg.bot_reply}
              </div>
            ))
          )}
        </div>

        {/* Input Field */}
        <div className="input-area">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Right Side - Chat History */}
      <div className="right-panel">
        <h2>Chat History</h2>
        <div className="chat-history">
          {messages.length === 0 ? (
            <p className="no-history">No history available</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="history-item">
                {msg.user_message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
