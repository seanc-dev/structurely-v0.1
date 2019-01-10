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
            Article.find({
                _id: {
                    $in: foundUser.articles
                }
            }, function(err, foundArticles){
                if(err){
                    console.log("articles.js line 22", err);
                    res.render("error", {errorMessage: "We couldn't connect to the database! Please try again later"});
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

// article plan (show)
router.get("/articles/:id", isLoggedIn, function(req, res){
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

// article new
router.post("/articles/new", isLoggedIn, function(req, res){
    Article.create(req.body.article, function(err, createdArticle){
        if(err){
            console.log('Error attempting to create new article in db');
            res.render("error", {errorMessage: "We couldn't connect to the database! Please try again later"});
        } else {
            User.findById(req.user.id, function(err, foundUser){
                if(err){
                    console.log('Error finding User in /articles/new POST');
                } else {
                    foundUser.articles.push(createdArticle);
                    foundUser.save(function(err){
                        if(err){
                            console.log('Error saving User in /articles/new POST');
                            res.render("error", {errorMessage: "We couldn't connect to the database! Please try again later"});
                        } else {
                            if(req.body.redirect === "redirect"){
                                res.redirect("/articles/" + createdArticle._id);
                            } else {
                                res.redirect("/articles");
                            }
                        };

                    });
                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

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
    // console.log('End of sort title: ');
    // articlesArr.forEach(function(article){console.log(article.title)});
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