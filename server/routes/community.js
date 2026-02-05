// FILE: server/routes/community.js
import express from 'express';
import {
    createCommunity,
    getCommunities,
    getCommunity,
    joinCommunity,
    leaveCommunity,
    getCommunityPosts,
    getUserCommunities
} from '../controllers/communityController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createCommunity);
router.get('/', protect, getCommunities);
router.get('/my-communities', protect, getUserCommunities);
router.get('/:handle', protect, getCommunity);
router.post('/:id/join', protect, joinCommunity);
router.post('/:id/leave', protect, leaveCommunity);
router.get('/:handle/posts', protect, getCommunityPosts);

export default router;