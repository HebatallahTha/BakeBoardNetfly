import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header>
      <h1>BakeBoard 🧁</h1>
      <nav>
        <Link to="/" className="btn">Home 🧁</Link>{' '}
        <Link to="/create" className="btn">Create Post ✍️</Link>{' '}
        <Link to="/chat" className="btn">Chat 🤖</Link>
      </nav>
    </header>
  );
}
