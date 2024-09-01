import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authroute.js'; // Adjust the path as necessary
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection
const ConnectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

function startServer() {
    app.listen(PORT, function() {
        console.log('Server running on port ' + PORT);
        ConnectToMongoDB();
    });
}

startServer();