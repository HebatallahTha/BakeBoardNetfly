import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';
import Chat from './pages/Chat';

import './style.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container" style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
