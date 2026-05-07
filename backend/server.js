import express from 'express';
import dotenv from 'dotenv';
import dns from 'dns';
import cors from 'cors';
import connectDB from './src/config/db.js';
import scrapeHackerNews from './src/scraper/scraper.js';


dns.setServers(["8.8.8.8", "1.1.1.1"]) 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

scrapeHackerNews();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));