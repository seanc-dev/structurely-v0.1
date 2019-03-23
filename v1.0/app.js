// PACKAGES //
var expressSession      = require("express-session"),
    LocalStrategy       = require("passport-local"),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    express             = require("express");

// MODELS //
var Article     = require("./models/article"),
    Card        = require("./models/card"),
    User        = require("./models/user");

// LOAD DATA //
var data        = require("./seed.js")
// data.seed();

// SERVER VARIABLES //
var app         = express();
    port        = 3000

// APP CONFIG //
mongoose.connect("mongodb://localhost:27017/structurely", {useNewUrlParser: true});
// app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public/'));
app.set("view engine", "ejs");

// AUTH CONFIG //
app.use(expressSession({
    secret: "And yet, everybody rushes around in a great panic as if it were necessary to achieve something beyond themselves.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(User.serializeUser());

// CONFIGURE MIDDLEWARE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// ROUTES //
app.use('/articles', require("./routes/articles"));
app.use('/articles/:id/cards', require("./routes/cards"));
// index must be defined last as it contains the * route
app.use(require("./routes/index"));

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(port, () => console.log("The engine's running, baby!"));