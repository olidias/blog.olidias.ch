import React, { useState } from 'react';

const CommentForm = ({ articleId, parentCommentId = null, onCommentSubmitted, onCancel }) => {
  const [formData, setFormData] = useState({
    content: '',
    authorName: '',
    authorEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.content.trim() || !formData.authorName.trim() || !formData.authorEmail.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.content.length > 1000) {
      setError('Comment is too long (max 1000 characters)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Submit comment
      const response = await fetch('/api/comments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          articleId,
          parentCommentId
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ content: '', authorName: '', authorEmail: '' });
        setTimeout(() => {
          onCommentSubmitted();
        }, 2000);
      } else {
        setError(data.error || 'Failed to submit comment');
      }
    } catch (err) {
      setError('Failed to submit comment. Please try again.');
      console.error('Error submitting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
        <p>Comment submitted successfully! It will appear after moderation.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <h4 className="text-lg font-semibold text-text-main mb-4">
        {parentCommentId ? 'Reply to Comment' : 'Add a Comment'}
      </h4>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-text-main mb-2">
            Comment *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={4}
            maxLength={1000}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-transparent"
            placeholder="Share your thoughts..."
            required
          />
          <div className="text-sm text-text-muted mt-1">
            {formData.content.length}/1000 characters
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-text-main mb-2">
              Name *
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-transparent"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-text-main mb-2">
              Email *
            </label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              value={formData.authorEmail}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-text-muted">
            <p>Your comment will be reviewed before appearing.</p>
            <p>Rate limiting applies to prevent spam.</p>
          </div>
          
          <div className="flex gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-text-muted border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-accent-1 text-text-main rounded-md hover:bg-opacity-80 transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Comment'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm; 