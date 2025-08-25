# Mini Blog API

A RESTful API for a mini blogging system built with Express.js and JWT authentication.

## Features

- 🔐 User authentication (register/login) with JWT
- 📝 CRUD operations for blog posts
- 🔒 Protected routes with middleware
- 📄 Pagination and search functionality
- ✅ Input validation and error handling
- 📊 Request logging

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the server:
   ```bash
   npm run dev  # Development with nodemon
   npm start    # Production
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts (with pagination and search)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required, own posts only)
- `DELETE /api/posts/:id` - Delete post (auth required, own posts only)

## Authentication

Include the JWT token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

## Query Parameters

### Posts endpoint supports:
- `page` - Page number (default: 1)
- `limit` - Posts per page (default: 10)
- `search` - Search in title and content

Example: `GET /api/posts?page=1&limit=5&search=nodejs`

## Example Usage

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"My First Post","content":"This is the content of my first post."}'
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error