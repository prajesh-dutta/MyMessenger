import express from 'express';
import dotenv from 'dotenv';
import authroute from './routes/authroute.js';
import ConnectToMongoDB from './DB/ConnectToMongoDB.js';

const app = express();
const PORT= process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use(("/api/auth"),authroute)
/*app.get('/', (req, res) => {
    res.send('Hello this is Prajesh, nice to meet you! The project is on the way');
});*/

app.listen(PORT, () => {
    ConnectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
