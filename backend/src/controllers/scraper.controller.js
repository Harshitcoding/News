import scrapeHackerNews from '../scraper/scraper.js';

export const triggerScrape = async (req, res) => {
  try {
    await scrapeHackerNews();
    res.json({ message: '✅ Scraping completed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
};