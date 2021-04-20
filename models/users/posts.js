const mongoose = require('mongoose');
const { Schema } = mongoose;
//const Learner = require("./learner");

const commentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner"
    },
    comment: {
        type: String
    }
},{
    timestamps: true
});

const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner"
    },
    post: {
        type: String,
    },
    likeCount: {
        type: Number,
        default: 0
    },
    usersLiked: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Learner'
    }],
    comments: [{
            type: commentSchema
    }]
},{
    timestamps: true
});

const mydbvar = mongoose.connection.useDb('ungrezi')

const Post = mydbvar.model('Post', PostSchema);

module.exports = Post;

