import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Taskrouter from './routes/Task.route.js';

dotenv.config(); // Load .env variables

const app = express();

// Load environment variables safely
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file.");
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Routes
app.use('/api/task', Taskrouter);

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Database connected successfully.');
}).catch(err => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
});
