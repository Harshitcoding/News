import dotenv from 'dotenv';
dotenv.config(); // ← Sabse pehle, baki sab ke upar

import express from 'express';
import dns from 'dns';
import cors from 'cors';

import connectDB from './src/config/db.js';
import scrapeHackerNews from './src/scraper/scraper.js';

import scraperRoutes from './src/routes/scraper.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', scraperRoutes);
app.use('/api/auth', authRoutes);

connectDB();
scrapeHackerNews();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});