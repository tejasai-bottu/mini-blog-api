const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mini Blog API is running' });
});

// Error handling middleware (must be before 404 handler)
app.use(errorHandler);

// 404 handler (FIXED)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 API Documentation:`);
  console.log(`   POST   /api/auth/register - Register user`);
  console.log(`   POST   /api/auth/login - Login user`);
  console.log(`   GET    /api/posts - Get all posts`);
  console.log(`   POST   /api/posts - Create post (auth required)`);
  console.log(`   GET    /api/posts/:id - Get single post`);
  console.log(`   PUT    /api/posts/:id - Update post (auth required)`);
  console.log(`   DELETE /api/posts/:id - Delete post (auth required)`);
});
