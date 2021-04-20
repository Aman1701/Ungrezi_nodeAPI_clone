const express = require('express');
const Post = require("../models/users/posts");
const router = express.Router();

/********************************ADD A NEW POST ******************************/

router.post('/newPost/:id', (req,res,next) => {

    const userId = req.params.id;
    
    let newPost = new Post({
        userId: req.params.id,
        post: req.body.post
    })
    newPost.save()
    .then(post => {
        console.log(post);
        res.json(post);
    })
    .catch(err => res.json(err))
    
})

/***************************** ADD OR REMOVE LIKE ***********************************/

router.post('/:id/like/:postId', (req,res,next) => {
    const userId = req.params.id;
    Post.findById(req.params.postId)
    .then(post => {
        if(post.usersLiked.includes(userId)){
            post.likeCount = post.likeCount - 1;
            const index = post.usersLiked.indexOf(userId)
            post.usersLiked.splice(index, 1);
        }else{
            post.likeCount = post.likeCount + 1;
            post.usersLiked.push(userId);
            
        }
        post.save()
        .then(updated => {
            console.log(updated);
            res.json(updated);
        }).catch(err => res.json(err))
    }).catch(err => res.json(err))
})

/******************************** ADD A NEW COMMENT **************************/

router.post('/newComment/:id/:postId', (req,res,next) => {
    const userId = req.params.id;
    Post.findById(req.params.postId)
    .then(post => {
        const newComment = {
            userId: userId,
            comment: req.body.comment
        }
        post.comments.unshift(newComment);
        post.save()
        .then(updated => {
            console.log(updated);
            res.json(updated);
        }).catch(err => res.json(err))
    }).catch(err => res.json(err))
})

/************************************* GET ALL POSTS ******************************************/

router.get('/post', (req,res,next) => {
    Post.find(req.params.postId)
    .then((posts) => {
        console.log(posts);
        res.json(posts);
    }).catch(err => res.json(err))
})

router.get('/post/:postId', (req,res,next) => {
    Post.findById(req.params.postId)
    .then(post => {
        res.json(post);
    }).catch(err => res.json(err))
})

module.exports = router;