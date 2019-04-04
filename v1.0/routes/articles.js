const   express = require("express"),
        moment  = require("moment");

const   middleware = require('./middleware.js');

const   Article = require("../models/article"),
        User    = require("../models/user"),
        Card    = require("../models/card");

const router  = express.Router({mergeParams: true});

// index
router.get("/", middleware.isLoggedIn, function(req, res){
    User.findById(req.user.id, function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            Article.find({
                _id: {
                    $in: foundUser.articles
                }
            }, function(err, foundArticles){
                if(err){
                    console.log(err)
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
            console.log(err)
        } else {
            Card.find({
                _id: {
                    $in: foundArticle.cards
                }
            }, function(err, foundCards){
                if(err){
                    console.log(err)
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
router.post("/", middleware.isLoggedIn, function(req, res){
// router.post("/", function(req, res){
    Article.create(req.body.article, function(err, createdArticle){
        if(err){
            console.log(err)
        } else {
            User.findById(req.user.id, function(err, foundUser){
                if(err){
                    console.log(err)
                } else {
                    foundUser.articles.push(createdArticle);
                    foundUser.save(function(err){
                        if(err){
                            console.log(err)
                        } else {
                            Card.create({}, function(err, createdCard){
                                if(err){
                                    console.log(err);
                                } else {
                                    createdArticle.cards.push(createdCard);
                                    console.log('createdArticle.cards.push outcome: ' + createdArticle);
                                    createdCard.save(function(err){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            if(req.body.redirect === "no-redirect"){
                                                res.redirect("/articles");
                                            } else {
                                                console.log(createdArticle);
                                                res.send(createdArticle._id);
                                            }
                                        }
                                    });
                                }
                            });
                        };

                    });
                }
            });
        }
    });
});

// this function to be used when sort behaviour is implemented on articles index ui (react-dependent)
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