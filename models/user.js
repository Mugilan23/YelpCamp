var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

var options = {
    errorMessages: {
        IncorrectPasswordError: 'Password is incorrect',
        IncorrectUsernameError: 'Username is incorrect'
    }
};

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", UserSchema);