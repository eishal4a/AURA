import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE POST
router.post("/", auth, async(req, res) => {
    try {
        const { caption } = req.body;

        const newPost = new Post({
            caption,
            image: req.body.image || "",
            user: req.user.id,
        });

        await newPost.save();

        // Link post to user profile
        await User.findByIdAndUpdate(req.user.id, {
            $push: { posts: newPost._id },
        });

        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ALL POSTS (feed)
router.get("/", auth, async(req, res) => {
    const posts = await Post.find()
        .populate("user", "username profilePicture")
        .sort({ createdAt: -1 });

    res.json(posts);
});

export default router;