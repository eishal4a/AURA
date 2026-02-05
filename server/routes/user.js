import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* GET LOGGED IN USER WITH POSTS */
router.get("/me", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        const posts = await Post.find({ user: req.user.id })
            .select("image caption createdAt")
            .sort({ createdAt: -1 });

        res.json({ user, posts });
    } catch (err) {
        console.log("ME ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

/* UPDATE PROFILE (bio + image) */
router.put("/update", auth, upload.single("image"), async(req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Only update bio
        user.bio = req.body.bio || user.bio;

        // Only update image if new file exists
        if (req.file && req.file.filename) {
            user.profilePicture =
                `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        await user.save();

        res.json(user);
    } catch (err) {
        console.log("UPDATE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});




export default router;