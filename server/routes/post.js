import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/*
  CREATE POST
*/
router.post("/", auth, upload.single("image"), async(req, res) => {
    try {
        const { caption } = req.body;

        const user = await User.findById(req.user.id);

        let imageUrl = "";
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        const post = await Post.create({
            caption: caption || "",
            image: imageUrl,
            user: user._id,

            // 🔥 snapshot data (no populate needed later)
            username: user.username,
            userProfilePicture: user.profilePicture,
        });

        res.status(201).json(post);
    } catch (err) {
        console.error("CREATE POST ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

/*
  FEED
*/
router.get("/", auth, async(req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error("GET POSTS ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;