var express = require("express");

var middleware = require('./middleware.js');

var Article    = require("../models/article");
var Card    = require("../models/card");

var router  = express.Router({mergeParams: true});

// create
router.post("/", function(req, res){
    // handle post request
    console.log(req.body);
    Card.create(req.body.card, function(err, createdCard){
        if(err){
            console.log('Error, failed to create new card in database: ', err);
            res.render("error-page", {errorMessage: "We couldn't connect to the database! Please try again later"});
        } else {
            console.log('createdCard: ', createdCard);
            // push createdCard._id into Article.cards for parent article and save article
            Article.findById(req.params.id, function(err, foundArticle){
                if(err){
                    console.log('Error: Cannot find Article in db (error in POST to /articles/:id/cards): ', err);
                } else {
                    foundArticle.cards.push(createdCard);
                    foundArticle.save(function(err){
                        if(err){
                            console.log('Error: Cannot save Article in db (error in POST to /articles/:id/cards): ', err);
                        }
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