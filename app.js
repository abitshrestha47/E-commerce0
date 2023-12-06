import express from 'express';
import 'dotenv/config.js';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
const PORT=process.env.PORT;

const app=express();

connectDB();

//middleware
app.use(cors());
app.use(express.json());
//api hit and status of that api and execution time
app.use(morgan('dev'));

app.use('/api/v1/auth',authRoutes);

app.listen(PORT,()=>{
    console.log(`server listening on http://localhost:${PORT}`);
});