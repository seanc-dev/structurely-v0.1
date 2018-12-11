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
components = [{
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
    }]

templates = [{
    articleId: "",
    elementId: "paraCard-1",
    type: 0,
    row: 1,
    col: 1,
    data: {
        0: "Paragraph or Concept",
        1:  "Write a simple sentence describing the concept you want to explore"
    }
},
{
    articleId: "",
    id: "paraPointsCard-1",
    type: 1,
    row: 1,
    col: 2,
    data: {
        0: "Additional Points",
        1: "Add extra details for your paragraph here"
    }
}]

// MONGOOSE MODEL CONFIG

var articleSchema = new mongoose.Schema({
    userId: String,
    title: String,
    thesis: String,
    createdDateTime: {
        type: Date,
        default: Date.now
    }
});
var Article = mongoose.model("Article", articleSchema);

var componentSchema = new mongoose.Schema({
    articleId: String,
    elementId: String,
    type: Number,
    row: Number,
    col: Number,
    createdDateTime: {
        type: Date,
        default: Date.now
    },
    data: {}
});
var Component = mongoose.model("Component", componentSchema);

// ROUTES

app.get("/", function(req, res){
    Component.find({}, function(err, components){
        if(err){
            console.log(err);
        } else {
            components.sort(function(a, b){
                if(a.row-b.row === 0){
                    return a.col-b.col
                }
                return a.row-b.row
            });
            res.render("index", {components: components});
        }
    })
});

app.listen(port, () => console.log(`Structurely app listening on port ${port}!`))