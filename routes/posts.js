const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected routes
router.post('/', authenticateToken, createPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

module.exports = router;
