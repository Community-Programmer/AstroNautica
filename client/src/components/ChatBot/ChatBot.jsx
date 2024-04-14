import React, { useState } from 'react';
import './ChatBot.scss'; 
import axios from 'axios';
import API_BASE_URL from '../../config/config';

const ChatBot = () => {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState(''); 
 
  const sendMessage = async () => {
    if (input.trim() !== '') { 
      setMessages([...messages, { text: input, fromUser: true }]);
      const response = await axios.post(`${API_BASE_URL}/chat`,{
        userInput:input
      })
      console.log(response.data);
      setMessages([...messages, { text: response.data.text, fromUser: false}]);
      setInput(''); 
    }
  };

  return (
    <div className="chatbot-container">
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={message.fromUser ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
     
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
