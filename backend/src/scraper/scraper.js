import axios from 'axios';
import * as cheerio from 'cheerio';
import Story from '../models/story.model.js';


const scrapeHackerNews = async () => {
  try {
    console.log('Scraping HackerNews...');

    const { data } = await axios.get('https://news.ycombinator.com');
    const $ = cheerio.load(data);

    const stories = [];

    $('.athing').slice(0, 10).each((i, el) => {
      const id = $(el).attr('id');
      const titleEl = $(el).find('.titleline > a');
      const title = titleEl.text();
      const url = titleEl.attr('href');

      const subtext = $(`#score_${id}`).closest('.subtext');
      const points = parseInt($(`#score_${id}`).text()) || 0;
      const author = subtext.find('.hnuser').text();
      const postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text();

      if (title) {
        stories.push({ title, url, points, author, postedAt });
      }
    });


    for (const story of stories) {
      await Story.findOneAndUpdate(
        { title: story.title },
        story,
        { upsert: true, returnDocument: 'after'}
      );
    }

    console.log(`✅ ${stories.length} stories scraped and saved!`);
  } catch (error) {
    console.error('Scraping failed:', error.message);
  }
};

export default scrapeHackerNews;