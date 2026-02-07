import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    image: String,
    caption: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    username: String,
    userProfilePicture: String,

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: String,
        userProfilePicture: String,
        text: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],


}, { timestamps: true });


export default mongoose.model("Post", postSchema);