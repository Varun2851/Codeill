const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);
//installed connect-mongo , because every time the server
//restart, session cookie gets reset,so by using this we can store the session cookie of authenticated user in our data base.



app.use(express.urlencoded());

app.use(cookieParser()); 

app.use(express.static('./assets'));


app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name : 'codeil',
    // Todo chnage the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie :{
        maxAge : (10000*60*100),
    },
   store : new MongoStore(
    {
        mongooseConnection:db,
        autoRemove:'disabled'
    }
   ) 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});

