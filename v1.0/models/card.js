var mongoose    = require("mongoose");

var cardSchema = new mongoose.Schema({
    articleId: String,
    parentId: String,
    type: Number,
    row: Number,
    col: Number,
    createdDateTime: {
        type: Date,
        default: Date.now
    },
    data: {}
});

module.exports = mongoose.model("Card", cardSchema);