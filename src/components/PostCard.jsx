import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>🗓️ {new Date(post.createdAt).toLocaleString()} • ❤️ {post.upvotes} upvotes</p>
      {post.image && <img src={post.image} alt="bake" />}
      <div>
        {(post.tags || []).map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>
      <button onClick={() => navigate(`/post/${post.id}`)}>
        View Post
      </button>
    </div>
  );
}
