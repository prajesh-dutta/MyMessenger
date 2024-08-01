import express from 'express';
import dotenv from 'dotenv';
import authroute from './routes/authroute.js';

const app = express();

dotenv.config();
const PORT= process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello this is Prajesh, nice to meet you! The project is on the way');
});
app.use(("/api/auth"),authroute)
app.listen(5000, () => console.log(`Server running on port ${PORT}`)); 
