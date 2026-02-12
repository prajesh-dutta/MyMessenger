# MyMessenger - End-to-End Encrypted Chat App

A modern, secure chat application built with React, Node.js, Socket.io, and MongoDB. Features end-to-end encryption, real-time messaging, Google OAuth authentication, and profile picture uploads.

![MyMessenger](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0-green)

## 🚀 Features

- **End-to-End Encryption**: All messages are encrypted before being stored
- **Real-time Messaging**: Instant messaging using Socket.io
- **User Authentication**: 
  - Email/Password registration and login
  - Google OAuth integration
- **Profile Management**: Upload and update profile pictures
- **Modern UI**: Beautiful, responsive design with Tailwind CSS and glassmorphism effects
- **Online Status**: See who's online in real-time
- **Message History**: Persistent chat history
- **Search Users**: Find and start conversations with other users
- **Animated Gradient Background**: Dynamic color-shifting background
- **Custom Scrollbar**: Styled scrollbars for a better UX

## 🛠️ Technology Stack

**Frontend:**
- React 18
- Tailwind CSS & DaisyUI
- Socket.io Client
- React Router
- Zustand (State Management)
- Axios
- React Icons
- React Hot Toast

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
- Node.js (v16 or higher, v18 LTS recommended) - [Download Node.js](https://nodejs.org/)
- MongoDB (local or Atlas) - [Download MongoDB](https://www.mongodb.com/try/download/community)
- Git - [Download Git](https://git-scm.com/)
- Google OAuth credentials (optional) - [Get credentials](https://console.cloud.google.com/)

### Quick Start

#### Option 1: Manual Setup (Recommended for Development)

**1. Clone the Repository**
```bash
git clone https://github.com/prajesh-dutta/MyMessenger.git
cd MyMessenger
```

**2. Install All Dependencies**
```bash
npm run install-all
```
This will install both backend and frontend dependencies.

**3. Environment Configuration**

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
MONGO_URI=mongodb://localhost:27017/mymessenger
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ENCRYPTION_SECRET=change-this-32-character-key!!
PORT=8000
FRONTEND_URL=http://localhost:5173

# Google OAuth (Optional - leave empty if not using)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
SESSION_SECRET=your-session-secret-key-change-this

NODE_ENV=development
```

**⚠️ Important Notes:**
- `ENCRYPTION_SECRET` must be exactly 32 characters long
- Change all secrets before deploying to production
- For local development, MongoDB URI is `mongodb://localhost:27017/mymessenger`
- For MongoDB Atlas, use the connection string from your cluster

**4. Start MongoDB**

**Local MongoDB:**
```bash
# On Linux/Mac
sudo systemctl start mongod
# Or
mongod

# On Windows
net start MongoDB
```

**MongoDB Atlas:**
Just use your Atlas connection string in the `.env` file.

**5. Run the Application**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run server
```
Server will run on http://localhost:8000

**Terminal 2 - Frontend Development Server:**
```bash
npm run client
```
Frontend will run on http://localhost:5173

**6. Access the Application**

Open your browser and navigate to:
```
http://localhost:5173
```

#### Option 2: Docker Setup (Quick Deployment)

**1. Prerequisites**
- Docker and Docker Compose installed

**2. Create `.env` file**
```bash
cp .env.example .env
# Edit .env with your secrets
```

**3. Run with Docker Compose**
```bash
docker-compose up -d
```

This will:
- Start MongoDB container
- Build and start the application
- Expose the app on port 8000

**4. Access the Application**
```
http://localhost:8000
```

To stop:
```bash
docker-compose down
```

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
5. **Profile**: Upload and update your profile picture (Settings icon)
6. **Online Status**: See who's currently online (green dot indicator)

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
│   ├── DB/             # Database connection
│   └── server.js       # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React context
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Utility functions
│   │   └── zustand/    # State management
│   ├── public/
│   └── index.html
├── uploads/            # User uploaded files
├── .env                # Environment variables
├── .env.example        # Environment template
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose config
└── package.json        # Root package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
  - Body: `{ fullname, username, password, confirmpassword, gender }`
- `POST /api/auth/login` - User login
  - Body: `{ username, password }`
- `POST /api/auth/logout` - User logout
- `GET /api/auth/google` - Google OAuth initiation
- `GET /api/auth/google/callback` - Google OAuth callback

### Users
- `GET /api/users` - Get all users (for sidebar)
- `POST /api/users/upload-profile` - Upload profile picture
  - Requires: Multipart form data with 'profilepic' field

### Messages
- `GET /api/messages/:id` - Get conversation messages
  - Params: `id` (userId of conversation partner)
- `POST /api/messages/send/:id` - Send message
  - Params: `id` (userId of receiver)
  - Body: `{ message }`

### Real-time Events (Socket.io)
- `getOnlineUsers` - Get list of online users
- `newMessage` - Receive new message notification

## 🚀 Deployment

### Deploy to Heroku

**1. Install Heroku CLI**
```bash
npm install -g heroku
```

**2. Login to Heroku**
```bash
heroku login
```

**3. Create a new Heroku app**
```bash
heroku create mymessenger-app
```

**4. Add MongoDB Atlas**
- Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string

**5. Set Environment Variables**
```bash
heroku config:set MONGO_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set ENCRYPTION_SECRET=your-32-char-encryption-key
heroku config:set SESSION_SECRET=your-session-secret
heroku config:set GOOGLE_CLIENT_ID=your-google-client-id
heroku config:set GOOGLE_CLIENT_SECRET=your-google-client-secret
heroku config:set NODE_ENV=production
```

**6. Deploy**
```bash
git push heroku main
```

### Deploy with Docker

**1. Build the Docker image**
```bash
docker build -t mymessenger .
```

**2. Run the container**
```bash
docker run -p 8000:8000 \
  -e MONGO_URI=your-mongodb-uri \
  -e JWT_SECRET=your-jwt-secret \
  -e ENCRYPTION_SECRET=your-encryption-secret \
  -e SESSION_SECRET=your-session-secret \
  mymessenger
```

### Deploy to VPS (Ubuntu)

**1. SSH into your server**
```bash
ssh user@your-server-ip
```

**2. Install dependencies**
```bash
sudo apt update
sudo apt install nodejs npm mongodb
```

**3. Clone and setup**
```bash
git clone https://github.com/prajesh-dutta/MyMessenger.git
cd MyMessenger
npm run install-all
cp .env.example .env
# Edit .env with your settings
nano .env
```

**4. Build frontend**
```bash
cd frontend
npm run build
cd ..
```

**5. Setup PM2 for process management**
```bash
npm install -g pm2
pm2 start backend/server.js --name mymessenger
pm2 startup
pm2 save
```

**6. Setup Nginx (optional)**
```bash
sudo apt install nginx
# Configure nginx to proxy to port 8000
```

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| MONGO_URI | Yes | MongoDB connection string | `mongodb://localhost:27017/mymessenger` |
| JWT_SECRET | Yes | Secret key for JWT tokens | `your-random-secret-key` |
| ENCRYPTION_SECRET | Yes | 32-character encryption key | `your-secret-key-32-chars-long!!` |
| PORT | No | Server port (default: 8000) | `8000` |
| FRONTEND_URL | No | Frontend URL for CORS | `http://localhost:5173` |
| SESSION_SECRET | No | Express session secret | `your-session-secret` |
| GOOGLE_CLIENT_ID | No | Google OAuth client ID | `your-google-client-id` |
| GOOGLE_CLIENT_SECRET | No | Google OAuth secret | `your-google-client-secret` |
| NODE_ENV | No | Environment mode | `development` or `production` |

## 🧪 Testing

To test the application:

1. Start the backend and frontend servers
2. Open http://localhost:5173 in your browser
3. Sign up with a new account
4. Open another incognito/private window
5. Sign up with another account
6. Start messaging between the two accounts

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check your `MONGO_URI` in `.env`
- For Atlas, whitelist your IP address

### Port Already in Use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Module Not Found Errors
```bash
# Reinstall all dependencies
npm run install-all
```

### Google OAuth Not Working
- Check your Google OAuth credentials
- Ensure callback URL is correctly set in Google Console
- Add `http://localhost:8000/api/auth/google/callback` to authorized redirect URIs

## 📚 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run server` | Start backend with nodemon (development) |
| `npm start` | Start backend in production |
| `npm run dev` | Same as server (development) |
| `npm run client` | Start frontend dev server |
| `npm run build` | Build frontend for production |
| `npm run install-all` | Install all dependencies |
| `npm run setup` | Same as install-all |

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
- DaisyUI for UI components

## 📞 Support

For support, open an issue on [GitHub](https://github.com/prajesh-dutta/MyMessenger/issues).

---

Made with ❤️ by Prajesh Dutta