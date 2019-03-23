var mongoose    = require("mongoose");

var cardSchema = new mongoose.Schema({
    // articleId: String, // id of the article to which this card belongs 
    // parentId: String, // probably the id of the row element this card will sit within? Unsure if necessary
    type: {
        type: String,
        default: "standard"
    },
    row: {
        type: Number,
        default: 0
    },
    col: {
        type: Number,
        default: 0
    },
    content: {
        type: Object,
        default: {
            title: {
                class: "card-title",
                text: "Card Title",
                tooltip: "Click to add a suitable title for this card"
            },
            body: {
                content: [{
                    class: "card-text",
                    text: "Add a few notes to expand on the point you want to discuss in this section"
                }],
                tooltip: "Click to edit"
            }
        }
    },
    createdDateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Card", cardSchema);