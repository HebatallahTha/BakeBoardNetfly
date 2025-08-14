import React, { useState, useEffect, useRef } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'model', text: 'Hello there! How can I help you with your baking today?' },
  ]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Scrolls to the bottom of the chat window when new messages are added
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const history = messages
      .filter(m => m.text)
      .map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));
    history.push({ role: 'user', parts: [{ text: input }] });

    try {
      const apiKey = "addyourgooglegemniapikey"; // Leave this as-is, the environment will provide it.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      const payload = {
        contents: history,
      };

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        setMessages(prev => [...prev, { sender: 'model', text: `Error: ${data.error.message}` }]);
        return;
      }

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I’m having trouble right now.';
      setMessages(prev => [...prev, { sender: 'model', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'model', text: 'Oops! Something went wrong.' }]);
    }
  }

  return (
    <main>
      <h2>🤖 Baking Cubit - AI Assistant</h2>

      <div className="chat-container" ref={chatBoxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            <strong>{m.sender === 'user' ? '🧁 You' : '🤖 Baking Cubit'}:</strong> {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a baking question..."
          required
        />
        <button type="submit">Ask</button>
      </form>
    </main>
  );
}
