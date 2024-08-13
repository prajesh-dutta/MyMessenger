import mongoose from 'mongoose';

const ConnectToMongoDB = async () => {
    try {
        // ...

        await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using the MONGODB_URI from the dotenv file
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default ConnectToMongoDB;

