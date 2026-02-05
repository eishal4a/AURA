// FILE: server/models/Post.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
        default: '',
        maxlength: 2200
    },
    images: [{
        url: String,
        publicId: String
    }],
    type: {
        type: String,
        enum: ['photo', 'video', 'text', 'poll'],
        default: 'photo'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema],
    shares: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    saves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    location: {
        type: String,
        default: ''
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    hashtags: [{
        type: String
    }],
    audience: {
        type: String,
        enum: ['public', 'followers', 'closeFriends'],
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        default: true
    },
    showLikeCount: {
        type: Boolean,
        default: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    }
}, {
    timestamps: true
});

postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ hashtags: 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;