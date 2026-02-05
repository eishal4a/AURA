// FILE: server/models/Community.js
import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    handle: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    coverPhoto: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    moderators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    type: {
        type: String,
        enum: ['public', 'private', 'inviteOnly'],
        default: 'public'
    },
    category: {
        type: String,
        default: 'General'
    },
    rules: [{
        type: String
    }],
    tags: [{
        type: String
    }]
}, {
    timestamps: true
});

communitySchema.index({ handle: 1 });
communitySchema.index({ members: 1 });

const Community = mongoose.model('Community', communitySchema);

export default Community;