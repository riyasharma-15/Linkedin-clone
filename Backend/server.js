import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(postRoutes);
app.use(userRoutes);




const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        // MongoDB connection established
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
};

// ✅ THIS IS REQUIRED
connectDB();

app.listen(9080, () => {
    console.log("Server is listening on port 9080");
});
