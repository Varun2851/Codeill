const Post = require('../models/post');
module.exports.home = function(req,res){
    //return res.end('<h1>Express is up for codiel</h1>');
    //console.log(req.cookies);
    //res.cookie('user_id');

    // Post.find({},function(err,posts){


    //     return res.render('home',{
    //         title : "Impressions | Home",
    //         posts : posts
    //     });

    // });


//   Post.find({})
//   .then(posts => {
//     return res.render('home', {
//       title: "Impressions | Home",
//       posts: posts
//     });
//   })
//   .catch(err => {
//     // Handle error appropriately
//     console.error(err);
//     // Send an error response
//     return res.status(500).send('Internal Server Error');
//   });

Post.find({})
.populate('user')
.exec()
.then(posts => {
  return res.render('home', {
    title: "Impressions | Home",
    posts: posts
  });
})
.catch(err => {
  // Handle error appropriately
  console.error(err);
  // Send an error response
  return res.status(500).send('Internal Server Error');
});

 
} 
//module.export.actionName = function(req,res){}