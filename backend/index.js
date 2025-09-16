// index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
<<<<<<< Updated upstream
import dotenv from 'dotenv';
=======
import searchRouter from './routes/search.js';
>>>>>>> Stashed changes

//  init app FIRST 
const app = express();

<<<<<<< Updated upstream
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
}).catch((error)=>console.log(error));
=======
//  config 
const PORT = Number(process.env.PORT || 7001);
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const MONGO = process.env.MONGO_URL || process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'handy_filters_demo';

if (!MONGO) {
  console.error('Missing MONGO_URL (or MONGODB_URI) in .env');
  process.exit(1);
}

app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));

//  health 
app.get('/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

//  routes 
app.use('/api/handymen', searchRouter); // POST /api/handymen/search


try {
  await mongoose.connect(MONGO, { dbName: DB_NAME });
  console.log('Connected to Database successfully!!');
  app.listen(PORT, () => console.log('Server is running on port', PORT));
} catch (err) {
  console.error('DB Connection Error:', err);
  process.exit(1);
}
>>>>>>> Stashed changes
