import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { socket } from "../../lib/utils";

// Connect to the server

function Messages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("getOldMessages");

    // Load old messages when connecting
    socket.on("oldMessages", (oldMessages) => {
      console.log("Old messages:", oldMessages);
      setMessages(oldMessages);
    });

    // Listen for 'receiveMessage' events from the server
    socket.on("receiveMessage", (data) => {
      console.log("Message received:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage"); // Cleanup listener
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", message); // Emit event to the server
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1 className="text-5xl mb-5">Socket.IO Chat</h1>
      <div className="flex gap-3 place-content-center vh-100 mt-6">
        <Input
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ padding: "10px", width: "300px" }}
        />
        <Button variant="outline" onClick={sendMessage}>
          Send
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Messages</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {messages.map((msg, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Messages;
