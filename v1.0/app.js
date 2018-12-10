var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();
    port = 3000

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/structurely", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public")); 
app.set("view engine", "ejs");

// dev data
cards = {
        templates: [{
            id: "paraCard-1",
            type: 0,
            row: 1,
            col: 1,
            content: {
                0: "Paragraph or Concept",
                1:  "Write a simple sentence describing the concept you want to explore"
            }
        },
        {
            id: "paraPointsCard-1",
            type: 1,
            row: 1,
            col: 2,
            content: {
                0: "Additional Points",
                1: "Add extra details for your paragraph here"
            }
        }],
        dict: [
            {
                id: "paraCard-1",
                type: 0,
                row: 1,
                col: 1,
                content: {
                    0: "Paragraph or Concept",
                    1:  "Write a simple sentence describing the concept you want to explore"
                }
            },
            {
                id: "paraPointsCard-1",
                type: 1,
                row: 1,
                col: 2,
                content: {
                    0: "Additional Points",
                    1: "Add extra details for your paragraph here"
                }
            }
        ]
    }

// MONGOOSE MODEL CONFIG
var cardSchema = new mongoose.Schema({
    id: String,
    type: Number,
    row: Number,
    col: Number,
    content: {
        0: String,
        1: String
    }
});
var Card = mongoose.model("Card", cardSchema);

// cards.templates.forEach(function(card){
//     Template.create({
//         id: card.id,
//         type: card.type,
//         row: card.row,
//         col: card.col,
//         content: {
//             0: card.content[0],
//             1: card.content[1]
//         }
//     })
// });

app.get("/", function(req, res){
    Card.find({}, function(err, cards){
        if(err){
            console.log(err);
        } else {
            cards.sort(function(a, b){
                if(a.row-b.row === 0){
                    return a.col-b.col
                }
                return a.row-b.row
            });
            res.render("index", {cards: cards});
        }
    })
});

app.listen(port, () => console.log(`Structurely app listening on port ${port}!`))