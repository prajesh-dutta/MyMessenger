# 🚀 MyMessenger - Quick Reference Guide

## Quick Commands

### First Time Setup
```bash
git clone https://github.com/prajesh-dutta/MyMessenger.git
cd MyMessenger
npm run install-all
cp .env.example .env
# Edit .env with your configuration
```

### Start Development Servers
```bash
# Option 1: Use the convenience script
./start.sh

# Option 2: Manual (two terminals)
npm run server  # Terminal 1 - Backend on port 8000
npm run client  # Terminal 2 - Frontend on port 5173
```

### Production Build
```bash
npm run build     # Builds frontend
npm start         # Starts production server
```

### Docker
```bash
docker-compose up    # Start with MongoDB
docker-compose down  # Stop services
```

---

## Essential Environment Variables

```env
MONGO_URI=mongodb://localhost:27017/mymessenger
JWT_SECRET=your-random-secret-key
ENCRYPTION_SECRET=must-be-exactly-32-characters!!
PORT=8000
FRONTEND_URL=http://localhost:5173
```

**⚠️ Important:** `ENCRYPTION_SECRET` must be exactly 32 characters!

---

## URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **MongoDB**: mongodb://localhost:27017

---

## Common Issues & Solutions

### Port Already in Use
```bash
# Linux/Mac
lsof -ti:8000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### MongoDB Not Running
```bash
# Linux
sudo systemctl start mongod

# Mac
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm run install-all
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users (requires auth)
- `POST /api/users/upload-profile` - Upload profile picture

### Messages
- `GET /api/messages/:id` - Get conversation with user
- `POST /api/messages/send/:id` - Send message to user

---

## Project Structure

```
MyMessenger/
├── backend/          # Express server
│   ├── config/       # Passport, etc.
│   ├── controllers/  # Route handlers
│   ├── middleware/   # Auth, upload
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── utils/        # Helpers
│   └── server.js     # Main server
├── frontend/         # React app
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── public/
├── uploads/          # User uploads
├── .env              # Configuration
├── .env.example      # Template
├── Dockerfile        # Production
└── docker-compose.yml # Development
```

---

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS + DaisyUI
- Socket.io Client
- Zustand (state)
- React Router

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT Auth
- Passport.js

---

## Testing the App

1. **Start servers** (both backend and frontend)
2. **Open browser**: http://localhost:5173
3. **Create account**: Click "Sign up here"
4. **Open incognito**: Create second account
5. **Test messaging**: Send messages between accounts

---

## Security Features

✅ Rate limiting (100 req/15min per IP)
✅ JWT authentication
✅ Password hashing (bcrypt)
✅ End-to-end encryption (AES-256)
✅ Input validation
✅ CORS protection

---

## Need Help?

1. Check [SETUP.md](SETUP.md) for detailed setup guide
2. Check [README.md](README.md) for full documentation
3. Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guide
4. Open an issue on GitHub

---

## Deployment

### Heroku
```bash
heroku create myapp
heroku config:set MONGO_URI=... JWT_SECRET=... ENCRYPTION_SECRET=...
git push heroku main
```

### Docker
```bash
docker build -t mymessenger .
docker run -p 8000:8000 -e MONGO_URI=... mymessenger
```

### VPS
```bash
npm run build
pm2 start backend/server.js --name mymessenger
```

---

**Happy Chatting! 💬**
