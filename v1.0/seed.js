// MODELS //
var Article = require("./models/article"),
    Card    = require("./models/card");
    User    = require("./models/user");

// dev data
var data = {}

data.components = [
    {
        // id: "paraCard-1",
        type: 0,
        row: 1,
        col: 1,
        content: {
            0: "Intro Paragraph",
            1:  "Write a simple sentence describing the concept you want to explore"
        }
    },
    {
        // id: "paraPointsCard-1",
        type: 1,
        row: 1,
        col: 2,
        content: {
            0: "Additional Points",
            1: "Add extra details for your paragraph here"
        }
    }
]

data.templates = [
    {
        // articleId: "",
        // elementId: "paraCard-1",
        type: 0,
        row: 0,
        col: 0,
        content: {
            0: "Intro Paragraph",
            1:  "Write a simple sentence describing the concept you want to explore"
        }
    },
    {
        articleId: "",
        id: "paraPointsCard-1",
        type: 1,
        row: 0,
        col: 1,
        content: {
            0: "Additional Points",
            1: "Add extra details for your paragraph here"
        }
    }
]

data.articles = [
    {
        title: "The Mechanics of Power",
        thesis: "Why is it that every system of social organisation humans have ever built has eventually become corrupt?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: 1545699857638
    },
    {
        title: "Lessons From Burning Man",
        thesis: "What can mainstream society learn from Burning Man, a self-styled 'Experiment in Temporary Community'?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80",
        lastUpdatedDateTime: 1545699884700
    },
    {
        title: "The Mechanics of Power",
        thesis: "Why is it that every system of social organisation humans have ever built has eventually become corrupt?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: 1546381052298
    },
    {
        title: "Lessons From Burning Man",
        thesis: "What can mainstream society learn from Burning Man, a self-styled 'Experiment in Temporary Community'?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80",
        lastUpdatedDateTime: 1546812870546
    },
    {
        title: "The Mechanics of Power",
        thesis: "Why is it that every system of social organisation humans have ever built has eventually become corrupt?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: 1545699857638
    },
    {
        title: "Lessons From Burning Man",
        thesis: "What can mainstream society learn from Burning Man, a self-styled 'Experiment in Temporary Community'?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80",
        lastUpdatedDateTime: 1545699884700
    },
    {
        title: "The Mechanics of Power",
        thesis: "Why is it that every system of social organisation humans have ever built has eventually become corrupt?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: 1546381052298
    },
    {
        title: "Lessons From Burning Man",
        thesis: "What can mainstream society learn from Burning Man, a self-styled 'Experiment in Temporary Community'?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80",
        lastUpdatedDateTime: 1546812870546
    },
    {
        title: "The Mechanics of Power",
        thesis: "Why is it that every system of social organisation humans have ever built has eventually become corrupt?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: undefined
    },
    {
        title: "Lessons From Burning Man",
        thesis: "What can mainstream society learn from Burning Man, a self-styled 'Experiment in Temporary Community'?",
        backgroundImageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80",
        lastUpdatedDateTime: undefined
    },
    {
        title: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum",
        thesis: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​.",
        backgroundImageUrl: "https://images.unsplash.com/photo-1510111652602-195fc654aa83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: undefined
    },
    {
        title: "Come and see the violence inherent in the system.",
        thesis: "Help! Help! I'm being repressed!",
        backgroundImageUrl: "https://images.unsplash.com/photo-1510111652602-195fc654aa83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: undefined
    },
    {
        title: "What have the Romans ever done for us?",
        thesis: "All right, but apart from the sanitation, medicine, education, wine, public order, irrigation, roads, the fresh water system and public health..",
        backgroundImageUrl: "https://images.unsplash.com/photo-1510111652602-195fc654aa83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: undefined
    },
    {
        title: "Ezekiel 23:17",
        thesis: "The path of the righteous man is beset on all sides by the iniquities of the selfish, and the tyranny of evil men.",
        backgroundImageUrl: "https://images.unsplash.com/photo-1510111652602-195fc654aa83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: undefined
    },
    {
        title: "There was only one Catch",
        thesis: "And that was Catch-22, which stated that concern for one's own safety in the presence of dangers that are real and immediate is the process of a rational mind.",
        backgroundImageUrl: "https://images.unsplash.com/photo-1510111652602-195fc654aa83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        lastUpdatedDateTime: undefined
    }
]

data.seed = function(){
    console.log("seeds file connected");
    User.deleteMany({}, function(err){
        if(err){
            console.log("Error seed.js line 71", err);
        } else {
            Article.deleteMany({}, function(err){
                if(err){
                    console.log("Error seed.js line 75. Article.remove()", err);
                } else {
                    data.articles.forEach(function(article){
                        Article.create(article, function(err, createdArticle){
                            if(err){
                                console.log("Error, seed.js line 75. Article.create()", err);
                            } else {
                                Card.create(data.templates[0], function(err, createdCard){
                                    if(err){
                                        console.log(err, "seed.js card creation within article creation callback");
                                    } else {
                                        createdArticle.cards.push(createdCard);
                                        createdArticle.save(function(err){
                                            if(err){
                                                console.log(err, 'error saving article in seed.js card creation callback');
                                            }
                                        })
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
}

module.exports = data