import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatWindow = ({ name, complaintId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/messages/${complaintId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [complaintId]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const newMessage = {
        name,
        message: input,
        complaintId,
      };

      const res = await axios.post("http://localhost:8000/messages", newMessage);
      setMessages((prev) => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#fffdd0", // Cream
        color: "#5c4033", // Rich brown
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 className="text-center mb-4" style={{ color: "#5c4033" }}>
        Message Box
      </h1>

      <div
        className="message-window"
        ref={messageRef}
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "#fdf6e3", // Light beige
          border: "1px solid #e6d9b3",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg) => (
          <div
            className="message"
            key={msg._id}
            style={{
              backgroundColor: "#fffaf0",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              boxShadow: "inset 0 0 3px #ddd",
            }}
          >
            <p>
              <strong>{msg.name}:</strong> {msg.message}
            </p>
            <p style={{ fontSize: "10px", marginTop: "-10px" }}>
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })},{" "}
              {new Date(msg.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div
        className="input-container d-flex"
        style={{ gap: "10px", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #c8b98d",
            backgroundColor: "#fffaf0",
            color: "#5c4033",
          }}
        />
        <button
          onClick={sendMessage}
          className="btn"
          style={{
            backgroundColor: "#d2b48c", // Tan
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
