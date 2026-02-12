import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authroute.js';
import messageRoutes from './routes/messageroute.js';
import userRoutes from './routes/userroute.js';
import passport from './config/passport.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));

// Session middleware for passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    const frontendDistPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(frontendDistPath));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'));
    });
}

// Socket.io for real-time messaging
const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // Store references in app for controllers to access
    app.set('io', io);
    app.set('userSocketMap', userSocketMap);

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// MongoDB connection
const ConnectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

function startServer() {
    server.listen(PORT, function() {
        console.log('Server running on port ' + PORT);
        ConnectToMongoDB();
    });
}

startServer();

export { app, io, server };