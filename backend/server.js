import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoute.js';
import companyRouter from './routes/companyRoute.js';
import jobRouter from './routes/jobRoute.js';
import applicationRouter from './routes/applicationRoute.js';
import morgan from 'morgan'
import path from 'path'
import {createStream} from 'rotating-file-stream'
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT;

// Database Connection
connectDB();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));
console.log(path.__dirname)


// Setup Rotating file stream to create log file daily 
const accessLogStream = createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

// setup Morgan Logger
app.use(morgan('combined', { stream: accessLogStream }))

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
app.use("/api/v1/application", applicationRouter);



// Server Running
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})