import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCog } from "react-icons/fa";
import "../styles/ChatHistory.css";

const ChatHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/history/${userId}`);
        setHistory(response.data.history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchHistory();
  }, [userId]);

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5000/api/chat/delete/${messageId}`);
      setHistory(history.filter(chat => chat.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="chat-history-container">
      <div className="chat-header">
        <h2>Chat History</h2>
        <FaCog className="settings-icon" onClick={() => setSettingsOpen(!settingsOpen)} />
      </div>
      {settingsOpen && (
        <div className="settings-menu">
          <button onClick={() => console.log("Logout")}>Logout</button>
          <button onClick={() => setHistory([])}>Clear Chat History</button>
          <button onClick={() => document.body.classList.toggle("dark-mode")}>Toggle Theme</button>
        </div>
      )}
      <div className="chat-list">
        {history.length > 0 ? (
          history.map((chat) => (
            <div key={chat.id} className="chat-item">
              <p className="user-message">{chat.message}</p>
              <p className="ai-response">{chat.response}</p>
              <p className="timestamp">{new Date(chat.created_at).toLocaleString()}</p>
              <FaTrash className="delete-icon" onClick={() => deleteMessage(chat.id)} />
            </div>
          ))
        ) : (
          <p>No chat history available.</p>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
