var mongoose    = require("mongoose");

var cardSchema = new mongoose.Schema({
    // articleId: String, // id of the article to which this card belongs 
    // parentId: String, // probably the id of the row element this card will sit within? Unsure if necessary
    type: {
        type: Number,
        default: 0
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
                key: 'card-title',
                text: 'Paragraph "Title"',
                tooltip: 'Click to add a title for this card'
            },
            body: {
                content: [{
                    key: "card-text",
                    text: "Write a simple sentence to describe the main point of this paragraph"
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