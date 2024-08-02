import mongoose from 'mongoose';
const ConnectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
export default ConnectToMongoDB;