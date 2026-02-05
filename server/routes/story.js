// FILE: server/routes/story.js
import express from 'express';
import {
    createStory,
    getStories,
    getUserStories,
    viewStory,
    deleteStory
} from '../controllers/storyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createStory);
router.get('/', protect, getStories);
router.get('/user/:userId', protect, getUserStories);
router.post('/:id/view', protect, viewStory);
router.delete('/:id', protect, deleteStory);

export default router;