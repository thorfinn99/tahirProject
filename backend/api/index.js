import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../utils/db.js";
import userRoute from "../routes/user.route.js";
import companyRoute from "../routes/company.route.js";
import jobRoute from "../routes/job.route.js";
import ApplicationRoute from "../routes/application.route.js";
import serverless from "serverless-http";

dotenv.config();

const app = express();

// Test Route
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "It's coming from backend",
        success: true
    });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://jobhuntfrontend.onrender.com',
        'https://guest-house-frontend.vercel.app',
        'https://guest-house-frontend-git-main-mohammad-anas-projects-290bb13b.vercel.app'
    ],
    credentials: true,
}));

// Handle preflight requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
});



// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", ApplicationRoute);

// Connect to DB (only once during build)
connectDB();

// Wrap Express app into a serverless function
export const handler = serverless(app);
