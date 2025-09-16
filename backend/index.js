import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";   //connecting backend with the frontend 
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;

app.use(
  cors({
    origin: process.env.CLIENT_URL, //i.e. frontend url (http://localhost:3000)
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Database successfully!!")
    app.listen(PORT, ()=>{
        console.log('Server is running on port', PORT)
    });
}).catch((err) => console.error("DB Connection Error:", err));
