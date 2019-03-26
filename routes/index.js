var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

// REGISTER ROUTE
router.get("/register", function(req, res) {
    res.render("register", {page: 'register'});
});
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            // return res.redirect("/register");
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Successfully Signed Up! Nice to meet you " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN ROUTE
router.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});
// router.post("/login", passport.authenticate("local", {
//     successRedirect: "/campgrounds",
//     failureRedirect: "/login",
//     failureFlash: true,
//     successFlash: "Login, successful"
// }), function(req, res) {
// });
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        // if (err) {
        //     return next(err);
        // }
        if (err || !user) {
            req.flash("error", info.message);
            return res.redirect('/login'); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err);
            }
            req.flash("success", "Welcome back to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        });
    })(req, res, next);
});

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;