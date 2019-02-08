var mongoose    = require("mongoose");

var articleSchema = new mongoose.Schema({
    //userId: String,
    title: {
        type: String,
        default: "Untitled article"
    },
    thesis: {
        type: String,
        default: "Here is where you can enter your thesis statement or the central question you're going to explore"
    },
    backgroundImageUrl: String,
    lastUpdatedDateTime: Date,
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card"
        }
    ],
    createdDateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Article", articleSchema);