import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.databaseUrl);
        console.log(`Database connected successfully.`);
        
    } catch (err) {
        console.log(`database connection error`, err);
        process.exit(1);
    };
};

export default connectDB;