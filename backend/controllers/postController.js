const { 
  getAllPosts: getPostsFromModel, 
  getPostById: getPostByIdFromModel,
  createPost: createPostInModel,
  updatePost: updatePostInModel,
  deletePost: deletePostInModel
} = require('../models/post');

const getAllPosts = (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ error: 'Page and limit must be positive numbers' });
    }

    const posts = getPostsFromModel({ page: pageNum, limit: limitNum, search });
    
    res.json({
      posts: posts.data,
      pagination: {
        current_page: posts.page,
        total_pages: posts.totalPages,
        total_posts: posts.total,
        limit: posts.limit
      }
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = (req, res, next) => {
  try {
    const { id } = req.params;
    const post = getPostByIdFromModel(parseInt(id));
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

const createPost = (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    
    // Validation
    if (!title || !content) {
      return res.status(400).json({ 
        error: 'Title and content are required' 
      });
    }
    
    if (title.trim().length === 0) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    
    if (content.trim().length === 0) {
      return res.status(400).json({ error: 'Content cannot be empty' });
    }
    
    const newPost = createPostInModel({
      title: title.trim(),
      content: content.trim(),
      userId
    });
    
    res.status(201).json({
      message: 'Post created successfully',
      post: newPost
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;
    
    const post = getPostByIdFromModel(parseInt(id));
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Check ownership
    if (post.userId !== userId) {
      return res.status(403).json({ 
        error: 'You can only update your own posts' 
      });
    }
    
    // Validation
    if (title !== undefined && title.trim().length === 0) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    
    if (content !== undefined && content.trim().length === 0) {
      return res.status(400).json({ error: 'Content cannot be empty' });
    }
    
    const updatedPost = updatePostInModel(parseInt(id), {
      title: title?.trim(),
      content: content?.trim()
    });
    
    res.json({
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const post = getPostByIdFromModel(parseInt(id));
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Check ownership
    if (post.userId !== userId) {
      return res.status(403).json({ 
        error: 'You can only delete your own posts' 
      });
    }
    
    deletePostInModel(parseInt(id));
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};