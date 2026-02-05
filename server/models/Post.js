import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    // 🔥 Instagram trick
    username: String,
    userProfilePicture: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Post", postSchema);