import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { getPosts } from '../utils';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto' }}>
      <input
        id="search"
        placeholder="🔍 Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 18px',
          marginBottom: '24px',
          borderRadius: '20px',
          border: '1.5px solid var(--border)',
          background: 'var(--white)',
          fontFamily: 'Quicksand, sans-serif',
          fontSize: '1rem',
          fontWeight: 500,
          color: 'var(--text)',
          boxShadow: '0 4px 8px var(--shadow)'
        }}
      />

      {filteredPosts.length === 0 ? (
        <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>
          No bakes found 🥲
        </p>
      ) : (
        filteredPosts.map(post => <PostCard key={post.id} post={post} />)
      )}
    </main>
  );
}
