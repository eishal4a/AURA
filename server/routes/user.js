import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/me", auth, async(req, res) => {
    const user = await User.findById(req.user.id)
        .populate({
            path: "posts",
            options: { sort: { createdAt: -1 } }
        });

    res.json(user);
});
router.put("/update", auth, async(req, res) => {
    const { bio, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id, { bio, profilePicture }, { new: true }
    );

    res.json(updatedUser);
});


export default router;