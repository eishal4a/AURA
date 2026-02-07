import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


const router = express.Router();
/*
  FEED - GET ALL POSTS
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
router.put("/update", auth, upload.single("image"), async(req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Save bio (even if empty)
        if (req.body.bio !== undefined) {
            user.bio = req.body.bio;
        }

        // Upload profile picture using buffer (same method as posts)
        if (req.file) {
            const streamUpload = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({ folder: "profile_pictures" },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            const result = await streamUpload();
            user.profilePicture = result.secure_url;
        }

        await user.save();

        // Return fresh user
        const updatedUser = await User.findById(req.user.id);
        res.json(updatedUser);

    } catch (err) {
        console.error("PROFILE UPDATE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});
// LIKE / UNLIKE POST
router.put("/like/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user.id;

        // If already liked → remove like
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});
// ADD COMMENT
router.post("/comment/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const user = await User.findById(req.user.id);

        const newComment = {
            user: user._id,
            username: user.fullName, // or user.username if that's your field
            userProfilePicture: user.profilePicture,
            text: req.body.text,
        };

        post.comments.push(newComment);
        await post.save();

        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});
// DELETE COMMENT
router.delete("/comment/:postId/:commentId", auth, async(req, res) => {
    try {
        const { postId, commentId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Remove the comment
        post.comments = post.comments.filter(
            (c) => c._id.toString() !== commentId
        );

        await post.save();
        res.json(post);

    } catch (err) {
        console.error("DELETE COMMENT ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

/*
  CREATE POST
*/
router.post("/", auth, upload.single("image"), async(req, res) => {
    try {
        const { caption } = req.body;
        const user = await User.findById(req.user.id);

        let imageUrl = "";

        if (req.file) {
            const streamUpload = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({ folder: "posts" },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            const result = await streamUpload();
            imageUrl = result.secure_url;
        }

        const post = await Post.create({
            caption: caption || "",
            image: imageUrl,
            user: user._id,
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
// GET POSTS OF ONE USER (for profile page)
router.get("/user/:id", auth, async(req, res) => {
    try {
        const posts = await Post.find({ user: req.params.id })
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});
/*
  DELETE POST
*/
router.delete("/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Only owner can delete
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();

        res.json({ message: "Post deleted" });

    } catch (err) {
        console.error("DELETE POST ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});


export default router;