const Comment = require('../models/comment');
const Post = require('../models/post');

// module.exports.create = function(req,res){
//     Post.findById(req.body.post,function(err,post){

//        if(Post){
//             Comment.create({
//                 content : req.body.content,
//                 post : req.body.post,
//                 user : req.user._id
//             },function(err,comment){
//                 //handle error

//                 post.comment.push(comment);
//                 post.save();

//                 res.redirect('/');
//             })
//        }
//     })
// }

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(function (post) {
            if (post) {
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                    .then(function (comment) {
                        post.comments.push(comment);
                        return post.save();
                    })
                    .then(function () {
                        res.redirect('/');
                    })
                    .catch(function (err) {
                        // Handle comment creation or saving error
                        console.error(err);
                        // You can send an error response to the client if desired
                        res.status(500).send('An error occurred');
                    });
            } else {
                // Handle post not found error
                console.error('Post not found');
                // You can send an error response to the client if desired
                res.status(404).send('Post not found');
            }
        })
        .catch(function (err) {
            // Handle Post.findById error
            console.error(err);
            // You can send an error response to the client if desired
            res.status(500).send('An error occurred');
        });
};
