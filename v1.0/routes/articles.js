var express = require("express"),
    moment  = require("moment");

var Article = require("../models/article");
    User    = require("../models/user");

var router  = express.Router();

//var isToday()

// index
router.get("/articles", isLoggedIn, function(req, res){
    User.findById(req.user.id, function(err, foundUser){
        if(err){
            console.log("articles.js line 12", err);
            res.render("error", {errorMessage: "We couldn't connect to the database! Please try again later"});
        } else {
            console.log(foundUser);
            Article.find({
                _id: {
                    $in: foundUser.articles
                }
            }, function(err, foundArticles){
                if(err){
                    console.log("articles.js line 22", err);
                    res.render("error", {errorMessage: "We couldn't connect to the database! Please try again later"});
                } else {
                    console.log(foundArticles);
                    var unupdatedArticles = foundArticles.filter(x => !x.lastUpdatedDateTime),
                        updatedArticles = foundArticles.filter(x => x.lastUpdatedDateTime);
                    foundArticles.forEach(function(article, index){
                        if(foundArticles.lastUpdatedDateTime){
                            //updatedArticles[index].lastUpdatedDateTime = 
                        }
                    });
                    res.render("articles/index", {updatedArticles: updatedArticles, unupdatedArticles: unupdatedArticles});
                }
            });
        }
    });
});

// article plan (show)
router.get("/articles/:id/", isLoggedIn, function(req, res){
    Card.find({}, function(err, cards){
        if(err){
            console.log(err);
            res.render("error", {errorMessage: "We couldn't connect to the database! Please try again later"});
        } else {
            cards.sort(function(a, b){
                if(a.row-b.row === 0){
                    return a.col-b.col
                }
                return a.row-b.row
            });
            res.render("/articles/show", {cards: cards});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;