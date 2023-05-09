const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//we need to tell passport to use local strategy that we have created

//authentication using passport
// passport.use(new LocalStrategy({
//         usernameField: 'email'
//     },
//     function(email,password,done){
//         //find the user and establish the identity
//         User.findOne({email:email})
//             .then((user) =>{
//                 if (!user || user.password != password) {
//                     console.log('Invalid Username/Password');
//                     return Promise.reject(null, false);
//                 }
//                 return Promise.reject(null,false);
//             })
//             .catch((err) => {
//                 console.log('Error in finding the User--->Passport');
//                 return Promise.reject(err);
//             });

//             // if(err){
//             //     console.log('Error in finding User--->Passport');
//             //     return done(err);
//             // }
//             // if(!user || user.password != password){
//             //     console.log('Invalid Username/Password');
//             //     return done(null,false);
//             // }
//             // console.log('kasganj');
//             // return done(null,user);
        
//     }
// ));

//authentication uisng passport 
passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  function(email, password, done) {
    User.findOne({ email: email })
      .then((user) => {
        if (!user || user.password != password) {
          console.log('Invalid Username/Password');
          return done(null, false);
        }
        console.log("mohan");
        return done(null, user);
      })
      .catch((err) => {
        console.log('Error in finding the User--->Passport');
        return done(err);
      });
    }
));


//serializing the user to decide which key is to be kept in the cookie
// passport.serializeUser(function(user,done){
//     console.log('patiyali');
//     done(null,user.id);
// });

// passport.serializeUser((user) => {
//     console.log("Patiyai");
//     return Promise.resolve(user.id);
// });

passport.serializeUser(function(user,done){
    console.log("patiyali");
    done(null,user.id);
});


//deseralzing user from the key in the cookie 
// passport.deserializeUser(function(id,done){
//     User.findById(id,function(err,user){
//         if(err){
//             console.log('Error in finding User--->Passport');
//             return done(err);
//         }
//         console.log("gdgdg");
//         return done(null,user);
//     });
// });

// passport.deserializeUser((id,done) => {
//     console.log('deserializeUser', id);
//     return User.findById(id)
//       .then((user) => {
//         console.log('Agra');
//         return Promise.resolve(user);
//       })
//       .catch((err) => {
//         console.log('Error in finding User--->Passport');
//         return Promise.reject(err);
//     });
// });

// passport.deserializeUser((id) => {
//     console.log(id);
//     console.log("etah");
//     return User.findById(id)
//       .then((user) => {
//         return user;
//       })
//       .catch((err) => {
//         console.log('Error in finding user --> Passport');
//         return Promise.reject(err);
//     });
// });


passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        console.log('Error in finding user --> Passport');
        done(err, null);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
  //if the user is signed in pass the user to next
  if(req.isAuthenticated()){
    console.log('ram');
    return next();
  }
  console.log('syam');
  return res.redirect('/users/sign-in'); 
} 

passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;

