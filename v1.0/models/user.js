var passportLocalMongoose   = require("passport-local-mongoose"),
    mongoose                = require("mongoose");

userSchema = new mongoose.Schema({
    username: String,
    password: String,
    termsAccepted: Boolean,
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);