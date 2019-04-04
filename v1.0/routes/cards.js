var express = require("express");

var middleware = require('./middleware.js');

var Article    = require("../models/article");
var Card    = require("../models/card");

var router  = express.Router({mergeParams: true});

// index
router.get("/", middleware.isLoggedIn, function(req, res){
    console.log('cards index route connected');
    Article.findById(req.params.id, function(err, foundArticle){
        if(err){
            console.log(err);
        } else {
            Card.find({
                _id: {
                    $in: foundArticle.cards
                }
            }, function(err, foundCards){
                if(err) {
                    console.log(err);
                } else {
                    res.send({cards: foundCards});
                }
            });
        }
    });
});

// create
router.post("/", middleware.isLoggedIn, function(req, res){
    Card.create(req.body.card, function(err, createdCard){
        if(err){
            console.log(err);
        } else {
            // push createdCard._id into Article.cards for parent article and save article
            Article.findById(req.params.id, function(err, foundArticle){
                if(err){
                    console.log(err);
                } else {
                    createdCard.parentArticle = {
                        id: foundArticle._id,
                        title: foundArticle.title
                    }
                    createdCard.save(function(err){
                        if(err){
                            console.log(err);
                        }
                        console.log('createdCard: ' + createdCard);
                        foundArticle.cards.push(createdCard);
                        foundArticle.save(function(err){
                            if(err){
                                console.log(err);
                            }
                            console.log('parentArticle: ' + foundArticle);
                        });
                    });
                }
            });
            res.send(createdCard._id);
        }
    });
});

// show


// update


// destroy

module.exports = router;