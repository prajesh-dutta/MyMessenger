# MyMessenger - End-to-End Encrypted Chat App

A modern, secure chat application built with React, Node.js, Socket.io, and MongoDB. Features end-to-end encryption, real-time messaging, Google OAuth authentication, and profile picture uploads.

## 🚀 Features

- **End-to-End Encryption**: All messages are encrypted before being stored
- **Real-time Messaging**: Instant messaging using Socket.io
- **User Authentication**: 
  - Email/Password registration and login
  - Google OAuth integration
- **Profile Management**: Upload and update profile pictures
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Online Status**: See who's online in real-time
- **Message History**: Persistent chat history
- **Search Users**: Find and start conversations with other users

## 🛠️ Technology Stack

**Frontend:**
- React 18
- Tailwind CSS & DaisyUI
- Socket.io Client
- React Router
- Zustand (State Management)
- Axios

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- Socket.io
- JWT Authentication
- Passport.js (Google OAuth)
- bcryptjs (Password Hashing)
- Multer (File Uploads)
- Crypto (End-to-End Encryption)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google OAuth credentials (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/prajesh-dutta/MyMessenger.git
cd MyMessenger
```

### 2. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/mymessenger
JWT_SECRET=your-super-secret-jwt-key-here
ENCRYPTION_SECRET=your-secret-key-32-chars-long!!
PORT=8000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-session-secret-key
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud database
```

### 5. Run the Application

**Start Backend Server:**
```bash
npm run server
```

**Start Frontend Development Server:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## 🔐 Security Features

### End-to-End Encryption
- Messages are encrypted using AES-256 encryption
- Each message has a unique initialization vector (IV)
- Encryption keys are server-side managed

### Authentication
- Passwords are hashed using bcryptjs
- JWT tokens for session management
- Google OAuth integration for secure login

### Data Protection
- User passwords are never stored in plain text
- Profile pictures are validated and size-limited
- Input sanitization and validation

## 📱 Usage

1. **Sign Up**: Create an account with email/password or Google OAuth
2. **Login**: Sign in to access your chat dashboard
3. **Find Users**: Search for other users to start conversations
4. **Chat**: Send encrypted messages in real-time
5. **Profile**: Upload and update your profile picture
6. **Online Status**: See who's currently online

## 🏗️ Project Structure

```
MyMessenger/
├── backend/
│   ├── config/         # Passport configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── server.js       # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React context
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Utility functions
│   │   └── zustand/    # State management
│   └── public/
└── uploads/            # User uploaded files
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/google` - Google OAuth initiation
- `GET /api/auth/google/callback` - Google OAuth callback

### Users
- `GET /api/users` - Get all users (for sidebar)
- `POST /api/users/upload-profile` - Upload profile picture

### Messages
- `GET /api/messages/:id` - Get conversation messages
- `POST /api/messages/send/:id` - Send message

### Real-time Events
- `getOnlineUsers` - Get list of online users
- `newMessage` - Receive new message

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Prajesh Dutta** - [GitHub](https://github.com/prajesh-dutta)

## 🙏 Acknowledgments

- Socket.io for real-time communication
- MongoDB for database management
- Tailwind CSS for beautiful styling
- React team for the amazing framework