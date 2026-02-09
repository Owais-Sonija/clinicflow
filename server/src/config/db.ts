// server/config/db.ts

import mongoose from 'mongoose';
import { DB_NAME } from './constants';


// Function to connect to MongoDB
export const connectDB = async (): Promise<void> => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    }

    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};
export default connectDB;
        