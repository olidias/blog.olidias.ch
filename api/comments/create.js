import { SiteClient } from 'datocms-client';

// Debug environment variable loading
console.log('DATOCMS_FULLACCESS_APIKEY loaded:', !!process.env.DATOCMS_FULLACCESS_APIKEY);
console.log('DATOCMS_FULLACCESS_APIKEY length:', process.env.DATOCMS_FULLACCESS_APIKEY?.length);

// Initialize DatoCMS client with error handling


// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map();

// Rate limiting function
function checkRateLimit(ip) {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requests = rateLimitStore.get(ip);
  const recentRequests = requests.filter(time => time > hourAgo);

  if (recentRequests.length >= 5) {
    return false;
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

// Input validation and sanitization
function validateAndSanitizeInput(data) {
  const { content, authorName, authorEmail, articleId, parentCommentId } = data;

  // Check required fields
  if (!content || !authorName || !authorEmail || !articleId) {
    return { valid: false, error: 'Missing required fields' };
  }

  // Validate content length
  if (content.length > 1000) {
    return { valid: false, error: 'Comment too long (max 1000 characters)' };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(authorEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Check for suspicious patterns (basic spam detection)
  const suspiciousPatterns = [
    /\b(buy|cheap|discount|free|money|cash|loan|credit|viagra|casino|poker)\b/i,
    /\b(click here|visit now|limited time|act now|urgent)\b/i,
    /https?:\/\//, // URLs in comments
    /\b[A-Z]{5,}\b/, // ALL CAPS words
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      return { valid: false, error: 'Comment contains suspicious content' };
    }
  }

  // Sanitize content (remove HTML tags and dangerous characters)
  const sanitizedContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove remaining < and >
    .trim();

  if (sanitizedContent.length === 0) {
    return { valid: false, error: 'Comment content cannot be empty' };
  }

  // Sanitize author name
  const sanitizedName = authorName
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 100); // Limit name length

  if (sanitizedName.length === 0) {
    return { valid: false, error: 'Author name cannot be empty' };
  }

  return {
    valid: true,
    sanitizedData: {
      content: sanitizedContent,
      authorName: sanitizedName,
      authorEmail: authorEmail.toLowerCase().trim(),
      articleId,
      parentCommentId: parentCommentId || null
    }
  };
}

// Check reply depth
async function checkReplyDepth(parentCommentId) {
  if (!parentCommentId) return { valid: true, depth: 0 };

  try {
    let depth = 0;
    let currentParentId = parentCommentId;

    while (currentParentId && depth < 3) {
      const parentComment = await client.items.find(currentParentId);
      if (!parentComment) break;

      depth++;
      currentParentId = parentComment.parentComment || null;
    }

    return { valid: depth < 3, depth };
  } catch (error) {
    console.error('Error checking reply depth:', error);
    return { valid: false, depth: 0 };
  }
}

export default async function handler(req, res) {



  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let client;
  try {
    if (!process.env.DATOCMS_FULLACCESS_APIKEY) {
      throw new Error('DATOCMS_FULLACCESS_APIKEY environment variable is not set');
    }
    console.log("DATOCMS_FULLACCESS_APIKEY", process.env.DATOCMS_FULLACCESS_APIKEY);
    client = new SiteClient(process.env.DATOCMS_FULLACCESS_APIKEY);
    console.log('DatoCMS client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize DatoCMS client:', error);
    client = null;
  }
  // Check if client is initialized
  if (!client) {
    console.error('DatoCMS client not initialized');
    return res.status(500).json({
      error: 'Server configuration error. Please try again later.'
    });
  }

  try {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        error: 'Too many comments. Please wait before posting another comment.'
      });
    }

    const { content, authorName, authorEmail, articleId, parentCommentId } = req.body;

    // Validate and sanitize input
    const validation = validateAndSanitizeInput({
      content,
      authorName,
      authorEmail,
      articleId,
      parentCommentId
    });

    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Check reply depth
    const depthCheck = await checkReplyDepth(parentCommentId);
    if (!depthCheck.valid) {
      return res.status(400).json({
        error: 'Reply depth too deep (max 3 levels)'
      });
    }

    console.log('Attempting to create comment with data:', {
      itemType: 'comment',
      content: validation.sanitizedData.content,
      authorName: validation.sanitizedData.authorName,
      authorEmail: validation.sanitizedData.authorEmail,
      article: validation.sanitizedData.articleId,
      parentComment: validation.sanitizedData.parentCommentId,
      ipAddress: clientIP,
      userAgent: req.headers['user-agent'] || '',
    });

    // Create comment in DatoCMS using the correct API structure
    const comment = await client.items.create({
      itemType: 'comment',
      content: validation.sanitizedData.content,
      authorName: validation.sanitizedData.authorName,
      authorEmail: validation.sanitizedData.authorEmail,
      article: validation.sanitizedData.articleId,
      parentComment: validation.sanitizedData.parentCommentId,
      isApproved: false,
      ipAddress: clientIP,
      userAgent: req.headers['user-agent'] || '',
    });

    console.log('Comment created successfully:', comment.id);

    return res.status(201).json({
      success: true,
      message: 'Comment submitted successfully and awaiting moderation',
      commentId: comment.id
    });

  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
} 