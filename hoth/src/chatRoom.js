import React, { useState, useEffect, useRef } from 'react';
import './ChatRoom.css'; // Optional: Add styling

/*
export default function ChatRoom()
{
    const [messages, setMessages] = useState([]); // Store chat messages
    const [input, setInput] = useState(''); // User input
    const [username, setUsername] = useState('User'); // Mock username
    const messagesEndRef = useRef(null); // Reference for auto-scrolling
    
    return (
        <div className="chat-container">
          <h2>Chat Room</h2>
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender === username ? 'sent' : 'received'}`}>
                <span className="sender">{message.sender}:</span> {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} /> {}
          </div>
          <form onSubmit={handleSend} className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="message-input"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      );
}
*/

