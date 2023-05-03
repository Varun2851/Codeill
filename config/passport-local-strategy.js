const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//we need to tell passport to use local strategy that we have created

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        //find the user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding User--->Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deseralzing user from the key in the cookie 
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding User--->Passport');
            return done(err);
        }
        return done(null,user);
    });
});

module.exports = passport;

