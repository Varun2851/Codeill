// module.exports.posts = function(req, res)
// {
//     return res.render('posts',
//     {
//         title: 'Posts'
//     });
// }

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
        .then((post) => {
          return res.redirect('back');
        })
        .catch((err) => {
          console.log('error in creating a post', err);
        });
      
}

// module.exports.destroy = function(req,res){
//   Post.findById(req.params.id,function(err,post){
//     //.id means converting the object id into string
//     if(post.user == req.user.id){
//       post.remove();
//       Comment.deleteMany({post : req.params.id},function(err){
//         return res.redirect('back');
//       });
       
  
//     }else{
//       return res.redirect('back');
//     }
//   });
// }


// module.exports.destroy = function(req, res) {
//   Post.findById(req.params.id)
//     .then(function(post) {
//       if (post.user == req.user.id) {
//         return post.remove()
//         .then(function() {
//           return Comment.deleteMany({ post: req.params.id });
//         });
//       } else {
//         throw new Error('Unauthorized');
//       }
//     })
//     .then(function() {
//       return res.redirect('back');
//     })
//     .catch(function(err) {
//       console.error(err);
//       return res.redirect('back');
//     });
// };


module.exports.destroy = function(req, res) {
  Post.findById(req.params.id)
    .then(function(post) {
      if (post.user == req.user.id) {
        return post.deleteOne().then(function() {
          return Comment.deleteMany({ post: req.params.id });
        });
      } else {
        throw new Error('Unauthorized');
      }
    })
    .then(function() {
      return res.redirect('back');
    })
    .catch(function(err) {
      console.error(err);
      return res.redirect('back');
    });
};


