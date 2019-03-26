var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
        }
    });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username   
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW ROUTE
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err || !foundCampground) {
            console.log(err.message);
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.deleteMany({_id: {$in: campgroundRemoved.comments}}, function(err) {
                if(err) {
                    console.log(err);
                }
                res.redirect("/campgrounds");
            });
        }
    });
});

module.exports = router;