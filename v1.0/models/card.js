const   mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    parentArticle: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article"
        },
        title: String
    },
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