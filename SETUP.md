# MyMessenger Setup Guide

This guide will help you set up MyMessenger on your local machine step by step.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Common Issues](#common-issues)

## Prerequisites

Before you begin, make sure you have the following installed:

### 1. Node.js and npm
- **Windows**: Download from [nodejs.org](https://nodejs.org/)
- **Mac**: 
  ```bash
  brew install node
  ```
- **Linux**: 
  ```bash
  sudo apt update
  sudo apt install nodejs npm
  ```

Verify installation:
```bash
node --version  # Should be v16 or higher (v18 LTS recommended)
npm --version
```

### 2. MongoDB

**Option A: Local MongoDB (Recommended for Development)**

- **Windows**: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- **Mac**: 
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community
  ```
- **Linux**: 
  ```bash
  wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
  sudo apt update
  sudo apt install -y mongodb-org
  sudo systemctl start mongod
  ```

Verify MongoDB is running:
```bash
mongosh  # or mongo for older versions
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Whitelist your IP address

### 3. Git
- Download from [git-scm.com](https://git-scm.com/)

## Installation Steps

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/prajesh-dutta/MyMessenger.git
cd MyMessenger
```

### Step 2: Install Dependencies

Run the following command to install both backend and frontend dependencies:

```bash
npm run install-all
```

This will:
1. Install backend dependencies
2. Navigate to the frontend folder
3. Install frontend dependencies
4. Return to the root directory

**Alternative (Manual Installation):**

If the above doesn't work, install manually:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 3: Environment Configuration

#### Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

**On Windows (Command Prompt):**
```cmd
copy .env.example .env
```

#### Edit the .env File

Open the `.env` file in your favorite text editor and configure:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/mymessenger
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/mymessenger

# JWT Secret (Change this to a random string)
JWT_SECRET=my-super-secret-jwt-key-12345

# Encryption Secret (MUST be exactly 32 characters)
ENCRYPTION_SECRET=my-secret-encryption-key-32ch

# Server Port
PORT=8000

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Session Secret (Change this to a random string)
SESSION_SECRET=my-session-secret-key-12345

# Google OAuth (Optional - leave empty if not using)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Environment
NODE_ENV=development
```

**Important Notes:**
- `ENCRYPTION_SECRET` must be **exactly 32 characters**
- Change all secrets before deploying to production
- If using MongoDB Atlas, update `MONGO_URI` with your connection string

#### Generate Secure Secrets

For production, generate secure random strings:

**On Linux/Mac:**
```bash
# Generate random secret
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
# Generate random secret
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Online:**
Use [Random.org](https://www.random.org/strings/) to generate random strings

## Running the Application

### Option 1: Run Manually (Two Terminals)

**Terminal 1 - Backend Server:**
```bash
npm run server
```

You should see:
```
Server running on port 8000
MongoDB connected
```

**Terminal 2 - Frontend Server:**
```bash
npm run client
```

You should see:
```
VITE v5.x.x  ready in xxx ms
Local:   http://localhost:5173/
```

### Option 2: Run with Docker

If you have Docker installed:

```bash
docker-compose up
```

This will start both MongoDB and the application.

### Step 4: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the MyMessenger login page!

## Testing the Application

1. Click "Sign up here" to create an account
2. Fill in the registration form:
   - Full Name: John Doe
   - Username: johndoe
   - Password: password123
   - Confirm Password: password123
   - Gender: Male
3. Click "Create Account"
4. You should be redirected to the chat interface

### Test Real-time Messaging

To test real-time features:

1. Open the app in a normal browser window and create one account
2. Open the app in an incognito/private window and create another account
3. In one window, select the other user from the sidebar
4. Send messages between the two accounts
5. You should see messages appear instantly in both windows

## Common Issues

### Issue 1: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::8000`

**Solution:**

**On Linux/Mac:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**On Windows:**
```cmd
# Find process on port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue 2: MongoDB Connection Failed

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**

1. Make sure MongoDB is running:

**On Linux:**
```bash
sudo systemctl status mongod
sudo systemctl start mongod
```

**On Mac:**
```bash
brew services start mongodb-community
```

**On Windows:**
- Open Services
- Find "MongoDB Server"
- Click "Start"

2. Verify MongoDB URI in `.env` file is correct

### Issue 3: Module Not Found

**Error:** `Cannot find module 'express'` or similar

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Issue 4: ENCRYPTION_SECRET Length Error

**Error:** `Invalid key length` or encryption errors

**Solution:**

Make sure `ENCRYPTION_SECRET` in your `.env` file is exactly 32 characters:

```env
ENCRYPTION_SECRET=my-secret-encryption-key-32ch
```

Count the characters - it must be exactly 32!

### Issue 5: Frontend Not Loading

**Solution:**

1. Clear browser cache
2. Check browser console for errors (F12)
3. Make sure backend server is running
4. Check `FRONTEND_URL` in `.env` matches your frontend URL

### Issue 6: Google OAuth Not Working

**Solution:**

1. Make sure you have set up Google OAuth credentials
2. Add authorized redirect URI in Google Console:
   ```
   http://localhost:8000/api/auth/google/callback
   ```
3. Update `.env` with your credentials:
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Socket.io Documentation](https://socket.io/docs/)

## Getting Help

If you encounter any issues:

1. Check the [Common Issues](#common-issues) section above
2. Search for the error message online
3. Open an issue on [GitHub](https://github.com/prajesh-dutta/MyMessenger/issues)
4. Check the server and browser console for error messages

## Next Steps

After successful setup:

1. **Customize the app**: Modify colors, add features
2. **Deploy**: Follow the deployment guide in README.md
3. **Secure**: Change all default secrets for production
4. **Test**: Thoroughly test all features

Happy Messaging! 🎉
