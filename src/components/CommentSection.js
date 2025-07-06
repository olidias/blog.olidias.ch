import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentSection = ({ articleId, articleSlug }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load comments on component mount
  useEffect(() => {
    loadComments();
  }, [articleId] );

  const loadComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments/get?articleId=${articleId}`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.comments);
      } else {
        setError('Failed to load comments');
      }
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmitted = () => {
    setShowForm(false);
    // Reload comments after a short delay to show the new comment
    setTimeout(() => {
      loadComments();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-text-main mb-6">Comments</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-1 mx-auto"></div>
          <p className="text-text-muted mt-2">Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-text-main">
          Comments ({comments.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-accent-1 text-text-main rounded-md hover:bg-opacity-80 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Comment'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {showForm && (
        <CommentForm
          articleId={articleId}
          onCommentSubmitted={handleCommentSubmitted}
          onCancel={() => setShowForm(false)}
        />
      )}

      {comments.length === 0 ? (
        <div className="text-center py-8 text-text-muted">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <CommentList 
          comments={comments} 
          articleId={articleId}
          onCommentSubmitted={handleCommentSubmitted}
        />
      )}
    </div>
  );
};

export default CommentSection; 