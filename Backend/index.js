import express from 'express';
import { DBConnect } from './config/db.config.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());


await DBConnect();

/*  {Auth Routes}  */
import authRoutes from './routes/auth.route.js';
app.use("/api", authRoutes);

app.listen(PORT,()=>{
    console.log("Server running on posrt : PORT");
})