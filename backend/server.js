import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoute.js';
import companyRouter from './routes/companyRoute.js';
import jobRouter from './routes/jobRoute.js';

const app = express();
const PORT = process.env.PORT;

// Database Connection
connectDB();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));


// API Request
app.get('/home', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server  is Connected !!"
    })
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);



// Server Running
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})