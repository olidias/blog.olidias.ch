import React, { useState } from 'react';
import moment from 'moment';
import CommentForm from './CommentForm';

const CommentItem = ({ comment, articleId, onCommentSubmitted, depth = 0 }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmitted = () => {
    setShowReplyForm(false);
    onCommentSubmitted();
  };

  // Don't allow replies beyond 3 levels deep
  const canReply = depth < 3;

  return (
    <div className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-text-main">{comment.authorName}</span>
            <span className="text-sm text-text-muted">
              {moment(comment.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>
        
        <div className="text-text-main mb-3">
          <p className="whitespace-pre-wrap">{comment.content}</p>
        </div>
        
        {canReply && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-sm text-accent-1 hover:text-opacity-80 transition-colors"
          >
            {showReplyForm ? 'Cancel Reply' : 'Reply'}
          </button>
        )}
      </div>

      {showReplyForm && canReply && (
        <div className="mt-4">
          <CommentForm
            articleId={articleId}
            parentCommentId={comment.id}
            onCommentSubmitted={handleReplySubmitted}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              articleId={articleId}
              onCommentSubmitted={onCommentSubmitted}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem; 