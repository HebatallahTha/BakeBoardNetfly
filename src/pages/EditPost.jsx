import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, updatePostById, deletePostById } from '../utils';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  // New state to manage the delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const post = getPostById(id);
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
      setTags((post.tags || []).join(', '));
    }
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    const updatedPost = {
      title,
      content,
      image,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    updatePostById(id, updatedPost);
    navigate(`/post/${id}`);
  };

  // New function to handle the deletion logic
  const handleDelete = () => {
    deletePostById(id);
    navigate('/'); // Navigate to the home page after deletion
  };

  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-header)',
        padding: '18px 28px',
        borderRadius: '18px',
        marginBottom: '24px',
        boxShadow: '0 6px 12px var(--shadow)'
      }}>
        <h1 style={{
          fontFamily: 'Fredoka',
          fontSize: '1.6rem',
          color: 'var(--text)',
          margin: 0
        }}>
          ✏️ Edit Your Bake
        </h1>
        <Link to={`/post/${id}`} className="btn">← Back to Post</Link>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--white)',
          padding: '30px',
          borderRadius: '18px',
          boxShadow: '0 6px 16px var(--shadow)',
          maxWidth: '700px',
          margin: 'auto'
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        <input
          placeholder="Tags (e.g. bread,banana)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
          <button type="submit">
            🍰 Save Changes
          </button>
          {/* New delete button */}
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            style={{ backgroundColor: 'var(--red)', color: 'pink' }}
          >
            🗑️ Delete Post
          </button>
        </div>
      </form>

      {/* A simple confirmation modal. You will need to style this. */}
      {showDeleteConfirm && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
            <p>Are you sure you want to delete this post?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
