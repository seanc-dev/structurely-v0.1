var mongoose    = require("mongoose");

var articleSchema = new mongoose.Schema({
    //userId: String,
    title: String,
    thesis: String,
    backgroundImageUrl: String,
    lastUpdatedDateTime: Date,
    createdDateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Article", articleSchema);