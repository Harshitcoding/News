import dotenv from 'dotenv';
dotenv.config(); // ← Sabse pehle, baki sab ke upar

import express from 'express';
import dns from 'dns';
import cors from 'cors';

import connectDB from './src/config/db.js';
import scrapeHackerNews from './src/scraper/scraper.js';
import storyRoutes from './src/routes/story.routes.js';

import scraperRoutes from './src/routes/scraper.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api', scraperRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api', storyRoutes);

connectDB();
scrapeHackerNews();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});