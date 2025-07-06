import { SiteClient } from 'datocms-client';

// Initialize DatoCMS client
const client = new SiteClient(process.env.DATOCMS_READONLY_APIKEY);

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    
    const { articleId } = req.query;
    console.log("getting comments for article", articleId);
    
    if (!articleId) {
      return res.status(400).json({ error: 'Article ID is required' });
    }
    
    // Fetch all comments and filter client-side for now
    const allComments = await client.items.all();
    
    // Filter comments for this article and approved status
    const comments = allComments.filter(comment => 
      comment.itemType === 'comment' && 
      comment.article === articleId && 
      comment.isApproved === true
    );
    
    // Build hierarchical structure
    const commentMap = new Map();
    const rootComments = [];
    
    // First pass: create a map of all comments
    comments.forEach(comment => {
      commentMap.set(comment.id, {
        ...comment,
        replies: []
      });
    });
    
    // Second pass: build the hierarchy
    comments.forEach(comment => {
      if (comment.parentComment) {
        const parent = commentMap.get(comment.parentComment);
        if (parent) {
          parent.replies.push(commentMap.get(comment.id));
        }
      } else {
        rootComments.push(commentMap.get(comment.id));
      }
    });
    
    // Sort root comments by creation date (newest first)
    rootComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Sort replies by creation date (oldest first for better readability)
    const sortReplies = (comments) => {
      comments.forEach(comment => {
        if (comment.replies.length > 0) {
          comment.replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          sortReplies(comment.replies);
        }
      });
    };
    
    sortReplies(rootComments);
    
    return res.status(200).json({
      success: true,
      comments: rootComments,
      totalCount: comments.length
    });
    
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
} 