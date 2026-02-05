// server/routes/post.js
import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/*
  CREATE POST (caption + image)
*/
router.post("/", auth, upload.single("image"), async(req, res) => {
    try {
        const { caption } = req.body;

        // ✅ Build real image URL if file uploaded
        let imageUrl = "";
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        // ✅ Create post
        const post = await Post.create({
            caption: caption || "",
            image: imageUrl,
            user: req.user.id,
        });

        // ✅ Attach post to user
        await User.findByIdAndUpdate(req.user.id, {
            $push: { posts: post._id },
        });

        // ✅ Return populated post
        const populated = await Post.findById(post._id)
            .populate("user", "username profilePicture");

        res.status(201).json(populated);

    } catch (err) {
        console.error("CREATE POST ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

/*
  GET ALL POSTS (FEED)
*/
router.get("/", auth, async(req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username profilePicture")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (err) {
        console.error("GET POSTS ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;