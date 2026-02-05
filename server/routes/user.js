import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* GET LOGGED IN USER WITH POSTS */
router.get("/me", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "posts",
            select: "image caption createdAt",
            options: { sort: { createdAt: -1 } },
        });

        res.json(user);
    } catch (err) {
        console.log("ME ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

/* UPDATE PROFILE (bio + image) */
router.put("/update", auth, upload.single("image"), async(req, res) => {
    try {
        const updateData = {
            bio: req.body.bio,
        };

        if (req.file) {
            updateData.profilePicture =
                `http://localhost:5000/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData, { new: true }
        ).populate("posts");

        res.json(user);
    } catch (err) {
        console.log("UPDATE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;