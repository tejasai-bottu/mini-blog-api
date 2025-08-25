let posts = [];
let nextPostId = 1;

const createPost = (postData) => {
  const post = {
    id: nextPostId++,
    title: postData.title,
    content: postData.content,
    userId: postData.userId,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  posts.push(post);
  return post;
};

const getAllPosts = ({ page = 1, limit = 10, search } = {}) => {
  let filteredPosts = [...posts];
  
  // Search functionality
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sort by creation date (newest first)
  filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Pagination
  const total = filteredPosts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  return {
    data: paginatedPosts,
    page,
    limit,
    total,
    totalPages
  };
};

const getPostById = (id) => {
  return posts.find(post => post.id === id);
};

const updatePost = (id, updateData) => {
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) return null;
  
  posts[postIndex] = {
    ...posts[postIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  return posts[postIndex];
};

const deletePost = (id) => {
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) return false;
  
  posts.splice(postIndex, 1);
  return true;
};

// Seed some sample data
const seedPosts = () => {
  if (posts.length === 0) {
    const samplePosts = [
      {
        title: 'Welcome to Our Blog',
        content: 'This is the first post on our mini blog platform. We hope you enjoy reading and sharing your thoughts!',
        userId: 1
      },
      {
        title: 'Getting Started with Node.js',
        content: 'Node.js is a powerful runtime for building server-side applications. In this post, we will explore the basics of Node.js and how to get started.',
        userId: 1
      },
      {
        title: 'Understanding REST APIs',
        content: 'REST APIs are the backbone of modern web applications. Learn about HTTP methods, status codes, and best practices for API design.',
        userId: 1
      }
    ];
    
    samplePosts.forEach(postData => createPost(postData));
  }
};

// Initialize with sample data
seedPosts();

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
