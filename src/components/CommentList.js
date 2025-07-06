import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, articleId, onCommentSubmitted }) => {
  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          articleId={articleId}
          onCommentSubmitted={onCommentSubmitted}
          depth={0}
        />
      ))}
    </div>
  );
};

export default CommentList; 