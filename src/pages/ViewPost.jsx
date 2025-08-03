import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, updatePostById } from '../utils';

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const found = getPostById(id);
    if (found) setPost(found);
  }, [id]);

  if (!post) return <p>Post not found 😢</p>;

  const handleUpvote = () => {
    const updated = { ...post, upvotes: (post.upvotes || 0) + 1 };
    updatePostById(post.id, updated);
    setPost(updated);
  };

  const handleCommentSubmit = e => {
    e.preventDefault();
    if (!comment.trim()) return;
    const updatedComments = [...(post.comments || []), comment.trim()];
    const updated = { ...post, comments: updatedComments };
    updatePostById(post.id, updated);
    setPost(updated);
    setComment('');
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>← Back to Feed</button>
      
      <div style={{ margin: '20px 0', padding: 15, background: '#fffaf0', borderRadius: 10, border: '1px solid #ffd1dc' }}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="bake" style={{ maxWidth: '100%', borderRadius: 8, marginTop: 10 }} />}
        <p>🗓️ {new Date(post.createdAt).toLocaleString()}</p>
        <button onClick={handleUpvote}>❤️ Upvote ({post.upvotes || 0})</button>
        {/* Move the edit link inside here so it's visible */}
        <Link to={`/edit/${post.id}`} className="btn" style={{ marginLeft: '10px' }}>
  ✏️ Edit Post
</Link>


      </div>

      <section>
        <h3>💬 Comments</h3>
        <ul>
          {(post.comments || []).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit}>
          <input
            placeholder="Write a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
          <button type="submit">Add Comment</button>
        </form>
      </section>
    </div>
  );
}
