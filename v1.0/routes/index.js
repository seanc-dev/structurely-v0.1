var passport    = require("passport"),
    express     = require("express");

var Article     = require("../models/article");

var data    = require("../seed.js"),
    router  = express.Router();
    

// root
router.get("/", function(req, res){
    res.render("index")
});

// AUTH ROUTES
// display signup form
router.get("/signup", function(req, res){
    res.render("signup");
});

// signup logic
router.post("/signup", function(req, res){
    termsAccepted = false;
    if(req.body.termsAccepted){
        termsAccepted = true;
    };
    var newUser = new User({username: req.body.username, termsAccepted: termsAccepted});
    User.register(newUser, req.body.password, function(err, registeredUser){
        if(err){
            console.log(err);
            res.redirect("/signup");
        } else {
            passport.authenticate("local")(req, res, function(){
                // this code seeds the articles defined in seed.js/data.articles to each newly created user
                Article.find({}, function(err, foundArticles){
                    if(err){
                        console.log("Error, find article in /signup POST route");
                    } else {
                        foundArticles.forEach(function(article){
                            registeredUser.articles.push(article);
                        });
                        registeredUser.save(function(err){
                            if(err){
                                console.log("Error saving registered User with pushed article IDs in /signup POST");
                            }
                            res.redirect("/articles");
                        });
                    }
                });
            });
        }
    });
});

// display login form
router.get("/login", function(req, res){
    res.render("login");
})

// login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/articles",
        failureRedirect: "/login"
    }),function(req, res){

});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// error page
router.get("/error", function(req, res){
    res.render("error-page");
})

// all other routes
// router.get("*", function(req, res){
//     res.render("error-page", {errorMessage: "404 - page not found"});
// })

module.exports = router;