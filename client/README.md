# AURA - Next-Generation Social Media Platform

A visually stunning, AI-powered social media platform built with the MERN stack. AURA features dynamic profiles, intelligent feeds, cinematic stories, and living communities.

## 🚀 Features

- **Dynamic Profiles**: Customizable themes and AI-generated insights
- **Intelligent Feed**: AI-powered content curation
- **Cinematic Stories**: Full-screen immersive story experience  
- **Real-time Messaging**: Socket.IO powered chat
- **Communities**: Dedicated spaces for group interactions
- **Creator Dashboard**: Analytics and monetization tools
- **Glassmorphism Design**: Beautiful, modern UI with depth and motion

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Cloudinary account (for media storage)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd aura
```

### 2. Server Setup

```bash
cd server
npm install
```

Create `.env` file in server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aura
JWT_SECRET=your_super_secret_jwt_key_here_change_this
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Client Setup

```bash
cd ../client
npm install
```

Create `.env` file in client directory:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 5. Run the Application

**Terminal 1 - Start Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Client:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
aura/
├── server/
│   ├── config/          # Database and service configs
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── sockets/         # Socket.IO handlers
│   └── index.js         # Server entry point
│
└── client/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── context/     # React context providers
    │   ├── routes/      # Route configuration
    │   └── App.jsx      # App entry point
    └── public/          # Static assets
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/:id/follow` - Follow user
- `DELETE /api/users/:id/follow` - Unfollow user
- `GET /api/users/search` - Search users
- `GET /api/users/suggested` - Get suggested users

### Posts
- `POST /api/posts` - Create post
- `GET /api/posts/feed` - Get feed posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Comment on post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/save` - Save/unsave post

### Stories
- `POST /api/stories` - Create story
- `GET /api/stories` - Get stories
- `POST /api/stories/:id/view` - View story
- `DELETE /api/stories/:id` - Delete story

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:conversationId` - Get messages
- `POST /api/messages` - Send message

### Communities
- `POST /api/communities` - Create community
- `GET /api/communities` - Get communities
- `GET /api/communities/:handle` - Get community
- `POST /api/communities/:id/join` - Join community
- `POST /api/communities/:id/leave` - Leave community

## 🎨 Design System

### Colors
- Primary: Purple gradient (#667eea to #764ba2)
- Background: Gradient from purple-50 to blue-50
- Glassmorphic surfaces with backdrop blur

### Typography
- Font Family: Inter (primary), Space Grotesk (display)
- Fluid typography using clamp()
- Scale: xs (12-14px) to 4xl (40-56px)

### Animations
- Page transitions: 300ms ease
- Micro-interactions: 150-200ms
- Glassmorphic effects with backdrop-filter
- Framer Motion for complex animations

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- CORS configuration

## 📱 Socket.IO Events

### Client → Server
- `user_connected` - User comes online
- `typing` - User is typing
- `stop_typing` - User stopped typing
- `join_conversation` - Join conversation room
- `leave_conversation` - Leave conversation room

### Server → Client
- `user_online` - User came online
- `user_offline` - User went offline
- `new_message` - New message received
- `notification` - New notification
- `user_typing` - Someone is typing
- `user_stop_typing` - Someone stopped typing

## 🚀 Deployment

### Server Deployment (Heroku/Railway/Render)

1. Set environment variables
2. Build command: `npm install`
3. Start command: `npm start`

### Client Deployment (Vercel/Netlify)

1. Build command: `npm run build`
2. Output directory: `dist`
3. Set environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

AURA Development Team

## 🙏 Acknowledgments

- Design inspiration from modern web platforms
- Glassmorphism UI trend
- MERN stack community
- Socket.IO for real-time features
- Cloudinary for media management

## 📞 Support

For support, email support@aura.app or join our community.

---

Built with ❤️ using the MERN Stack