# Mini Blog - Full Stack Application

A complete full-stack blogging system with Express.js backend API and vanilla HTML/CSS/JavaScript frontend.

## Project Structure

```
mini-blog-api/
├── backend/                 # Express.js API Server
│   ├── server.js           # Entry point
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   └── posts.js        # Posts CRUD routes
│   ├── controllers/        # Business logic
│   │   ├── authController.js
│   │   └── postController.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js         # JWT authentication
│   │   ├── logger.js       # Request logging
│   │   └── errorHandler.js # Error handling
│   ├── models/             # Data models (in-memory)
│   │   ├── user.js         # User model
│   │   └── post.js         # Post model
│   ├── utils/              # Utility functions
│   │   └── validation.js   # Input validation
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # Web Interface
│   └── index.html          # Complete SPA with authentication
└── README.md               # This file
```

## Features

### Backend API
- **JWT Authentication** - Secure user registration and login
- **CRUD Operations** - Full blog post management
- **Protected Routes** - Middleware-based authorization
- **Pagination & Search** - Efficient data retrieval
- **Input Validation** - Comprehensive data validation
- **Request Logging** - Detailed API access logs
- **Error Handling** - Proper HTTP status codes and error messages

### Frontend Interface
- **Modern UI** - Beautiful gradient design with responsive layout
- **Authentication Forms** - Login/Register with tab switching
- **User Dashboard** - Post creation and management interface
- **Real-time Updates** - Dynamic post creation, editing, and deletion
- **Persistent Sessions** - JWT token storage for automatic login
- **Instant Feedback** - Success/error notifications
- **Mobile Responsive** - Works on all screen sizes

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Python** (for frontend development server) or any web server

## Installation & Setup

### 1. Clone/Download the Project
```bash
# If from git
git clone <repository-url>
cd mini-blog-api

# Or if you have the files, navigate to project folder
cd mini-blog-api
```

### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env
# Edit .env with your preferred settings
```

### 3. Frontend Setup
The frontend is a single HTML file - no additional setup needed!

## Running the Application

### Option 1: Quick Start (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
python -m http.server 8080
```
Frontend runs on: `http://localhost:8080`

**Open your browser:** Visit `http://localhost:8080`

### Option 2: Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
Use any web server or simply open `frontend/index.html` in your browser.

## How to Use

### 1. First Time Setup
1. **Start both servers** (backend on 3000, frontend on 8080)
2. **Open browser** to `http://localhost:8080`
3. **Register a new account:**
   - Username: `john_doe`
   - Email: `john@example.com`
   - Password: `password123`

### 2. After Registration
- Automatically logged in
- See welcome dashboard with your info
- Ready to create posts!

### 3. Creating Posts
- Fill in title and content
- Click "Create Post"
- Post appears immediately
- All users can see all posts

### 4. Managing Your Posts
- **Edit** - Click edit button on your posts
- **Delete** - Click delete button (with confirmation)
- **Privacy** - Only you can edit/delete your own posts

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

### Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/posts/:id` | Get single post | No |
| POST | `/api/posts` | Create new post | Yes |
| PUT | `/api/posts/:id` | Update post (own only) | Yes |
| DELETE | `/api/posts/:id` | Delete post (own only) | Yes |

### Query Parameters (GET /api/posts)
- `page` - Page number (default: 1)
- `limit` - Posts per page (default: 10)
- `search` - Search in title and content

**Example:** `GET /api/posts?page=1&limit=5&search=nodejs`

## Authentication

### JWT Token Usage
Frontend automatically handles JWT tokens, but for API testing:

```bash
# Include in Authorization header
Authorization: Bearer your_jwt_token_here
```

### Token Storage
- Frontend stores JWT in `localStorage`
- Automatic login on page refresh
- Secure token validation on backend

## API Testing Examples

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

### Get All Posts
```bash
curl http://localhost:3000/api/posts
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Development

### Backend Development
```bash
cd backend
npm run dev  # Nodemon for auto-restart
```

### Frontend Development
- Edit `frontend/index.html`
- Refresh browser to see changes
- Use browser dev tools (F12) for debugging

### Adding Features
- **Backend:** Add routes in `routes/`, controllers in `controllers/`
- **Frontend:** Modify the HTML/CSS/JavaScript in `index.html`

## Troubleshooting

### Backend Issues
**Port 3000 already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or change PORT in .env file
```

**npm install fails:**
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### Frontend Issues
**CORS errors:**
- Backend already has CORS enabled
- Make sure backend is running on port 3000

**API calls failing:**
- Check browser console (F12)
- Ensure backend is running
- Verify API endpoint URLs

**Frontend won't load:**
```bash
# Try different port
python -m http.server 3001
# Or open index.html directly in browser
```

## Production Deployment

### Backend
- Set `NODE_ENV=production` in environment
- Use PM2 or similar process manager
- Set strong JWT_SECRET in production

### Frontend  
- Deploy to any static hosting (Netlify, Vercel, etc.)
- Update API_BASE_URL to your production backend URL
- Ensure CORS is configured for production domain

## Environment Variables

Create `backend/.env` file:
```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - feel free to use this project for learning and development!

---

## Quick Start Summary

```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend  
cd frontend && python -m http.server 8080

# Browser
# Visit: http://localhost:8080
# Register → Login → Create Posts → Enjoy!
```

**Happy Blogging!**