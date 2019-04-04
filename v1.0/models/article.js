const   mongoose = require("mongoose");

const   Card = require("./card.js");

const   articleSchema = new mongoose.Schema({
    //userId: String,
    title: {
        type: String,
        default: "Untitled article"
    },
    thesis: {
        type: String,
        default: "Enter your thesis statement or the central question you're going to explore here"
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

articleSchema.pre('remove', async function(){
    await Card.remove({
        _id: {
            $in: this.cards
        }
    });
});

module.exports = mongoose.model("Article", articleSchema);