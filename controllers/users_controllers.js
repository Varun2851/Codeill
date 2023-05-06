const User = require('../models/user');

// module.exports.profile = function(req,res){
    
//     if(req.cookies.user_id){
        
//         User.findById(req.cookies.user_id)
//         .then(user => {
//             if(user){
//                 return res.render('profile',{
//                     title : "User Profile",
//                     user : user
//                 });
//             }
//             //console.log("OK")
//             return res.redirect('/users/sign-in');
//         })
//         .catch(err => {
//             // Handle the error here
//             console.log('error',err);
//             return res.redirect('back');
            
//         });

//     }
//     else{
//         return res.redirect('/users/sign-in');
//     }
// }
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}
//render the Sign Up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:'Codeil | Sign Up'
    });
}
//render the Sign In page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:'Codeil | Sign In'
    })
}

//get sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                console.log("Ram");
                return res.status(400).json({message: 'User already exists'});
            }
            console.log("shiv");
            return User.create(req.body);
        })
        .then(user => {
            console.log("Varun");
            return res.redirect('/users/sign-in');
        })
        .catch(err => {
            console.log('error in creating or finding user:', err);
            console.log("arun");
            return res.redirect('/users/sign-in');
        });

};
//sign in and crete a session 
// module.exports.createSession = function(req, res){

//     // steps to authenticate
//     // find the user
//     User.findOne({email: req.body.email}).exec()
//         //if(err){console.log('error in finding user in signing in'); return}
//         // handle user found
//         .then(function(user){
//             if (user){

//             // handle password which doesn't match
//                 if (user.password != req.body.password){
//                 //console.log("Shivi");
//                 return res.redirect('/users/sign-up');
//                 }

//             // handle session creation
//                 res.cookie('user_id', user.id);
//                 return res.redirect('/users/profile');

//             }   
//             else{
//             // handle user not found
//             return res.redirect('back');
//             }
//         })
//         .catch(function(err){
//             console.log('error in finding user in signing in',err);
//             return res.redirect('back');
//         })
            
// };

//sign in and crete a session through passport.js
module.exports.createSession = function(req,res){
    return res.redirect('/');
}
