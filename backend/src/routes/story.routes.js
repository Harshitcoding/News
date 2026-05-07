import express from 'express';
import {
  getAllStories,
  getStoryById,
  toggleBookmark,
  getBookmarks,
} from '../controllers/story.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllStories);
router.get('/bookmarks', protect, getBookmarks);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', protect, toggleBookmark);

export default router;