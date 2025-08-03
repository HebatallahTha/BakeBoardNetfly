import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, savePosts, generateId } from '../utils';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const newPost = {
      id: generateId(),
      title,
      content,
      image,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: [],
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    const posts = getPosts();
    posts.unshift(newPost);
    savePosts(posts);

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'var(--white)', padding: '30px', borderRadius: '18px', boxShadow: '0 6px 16px var(--shadow)', maxWidth: 700, margin: 'auto' }}>
      <h2 style={{ fontFamily: 'Fredoka', fontSize: '1.6rem', marginBottom: '20px' }}>📝 Create a New Baking Post</h2>
      
      <input
        placeholder="Post Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      
      <textarea
        placeholder="Describe your bake..."
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      
      <input
        placeholder="Tags (e.g. cake,cookies)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      
      <button type="submit" style={{ marginTop: '12px' }}>Post</button>
    </form>
  );
}
