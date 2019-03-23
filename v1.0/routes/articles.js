var express = require("express"),
    moment  = require("moment");

var middleware = require('./middleware.js');

var Article = require("../models/article");
    User    = require("../models/user");
    Card    = require("../models/card");

var router  = express.Router({mergeParams: true});

// index
router.get("/", middleware.isLoggedIn, function(req, res){
    User.findById(req.user.id, function(err, foundUser){
        if(err){
            console.log("articles.js line 12", err);
            res.render("error-page", {errorMessage: "We couldn't connect to the database! Please try again later"});
        } else {
            Article.find({
                _id: {
                    $in: foundUser.articles
                }
            }, function(err, foundArticles){
                if(err){
                    console.log("articles.js line 22", err);
                    res.render("error-page", {errorMessage: "We couldn't connect to the database! Please try again later"});
                } else {
                    // console.log('article titles: ');
                    // foundArticles.forEach(function(article){console.log(article.title)});
                    var unupdatedArticles = formatArticles(foundArticles.filter(x => !x.lastUpdatedDateTime), 50, 0);
                    var updatedArticles = formatArticles(foundArticles.filter(x => x.lastUpdatedDateTime), 23, 0);
                    res.render("articles/index", {updatedArticles: updatedArticles, unupdatedArticles: unupdatedArticles, moment: moment});
                }
            });
        }
    });
});

// show (plan/write)
router.get("/:id", middleware.isLoggedIn, function(req, res){
// router.get("/articles/:id", function(req, res){
    Article.findById(req.params.id, function(err, foundArticle){
        if(err){
            console.log(err, "Couldn't find article in database");
            res.render("error-page", {errorMessage: "We couldn't connect to the database! Please try again later"});
        } else {
            Card.find({
                _id: {
                    $in: foundArticle.cards
                }
            }, function(err, foundCards){
                if(err){
                    console.log(err, "Error finding cards");
                    res.render("error-page", {errorMessage: "We couldn't connect to the database! Please try again later"});
                } else {
                    foundCards.sort(function(a, b){
                        if(a.row-b.row === 0){
                            return a.col-b.col
                        }
                        return a.row-b.row
                    });
                    res.render("articles/show", {cards: foundCards, article: foundArticle});
                }
            });
        }
    });
});

// create
// router.post("/", middleware.isLoggedIn, function(req, res){
router.post("/", function(req, res){
    Article.create(req.body.article, function(err, createdArticle){
        if(err){
            console.log('Error attempting to create new article in db');
            res.render("error-page", {errorMessage: "We couldn't connect to the database! Please try again later"});
        } else {
            User.findById(req.user.id, function(err, foundUser){
                if(err){
                    console.log('Error finding User in /articles/new POST');
                } else {
                    foundUser.articles.push(createdArticle);
                    foundUser.save(function(err){
                        if(err){
                            console.log('Error saving User in /articles/new POST');
                            res.render("error-page", {errorMessage: "We couldn't connect to the database! Please try again later"});
                        } else {
                            if(req.body.redirect === "no-redirect"){
                                res.redirect("/articles");
                            } else {
                                res.redirect("/articles/" + createdArticle._id);
                            }
                        };

                    });
                }
            });
        }
    });
});

function sortArticles(sortType, articlesArr){
    articlesArr.sort(function(a,b){
        if(sortType === 0){ // This denotes sorting by date desc
            return Number(a.lastUpdatedDateTime)-Number(b.lastUpdatedDateTime)
        } else if(sortType = 1){ // This denotes sorting alphabetically ascending
            if(a.title < b.title){return -1}
            if(a.title = b.title){return 0}
            if(a.title > b.title){return 1}
        } else if(sortType = 2){ // This denotes sorting alphabetically descending
            if(a.title > b.title){return -1}
            if(a.title = b.title){return 0}
            if(a.title < b.title){return 1}
        }
    });
    return articlesArr;
}

function formatArticles(articlesArr, titleChars, sortType) {
    sortType = sortType || 0
    // formattedArticles = articlesArr
    articlesArr.forEach(function(article, index){
        var funcTitleChars = titleChars
        // if title is too long, trim it
        if(article.title.length > funcTitleChars){
            // if trimmed title will end in a space, extend by one char
            if(article.title.substring(funcTitleChars-2, funcTitleChars-3) === " "){
                funcTitleChars += 1
            }
            var trimmedTitle = article.title.substring(0, funcTitleChars-2)
            // append elipse and attach to new array
            article.title = trimmedTitle + "...";
        }
    });
    return sortArticles(sortType, articlesArr);
}

module.exports = router;