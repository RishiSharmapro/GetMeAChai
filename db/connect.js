import mongoose from "mongoose";

export const connectDB = async () => {
    
    try {
        if (mongoose.connection.readyState >= 1) return;

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw new Error("MongoDB connection failed");
    }
};
