import mongoose from 'mongoose';

const ConnectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB}
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
export default ConnectToMongoDB;
