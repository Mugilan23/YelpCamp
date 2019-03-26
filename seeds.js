var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
        {
            name: "Samantha",
            image: "https://wallpapersite.com/images/pages/pic_w/12336.jpg",
            description: "Lorem ipsum dolor sit amet, id delenit appareat expetenda has. Has minimum delicatissimi ex, cu cum tacimates accusata intellegat, ridens posidonium constituam sed ea. Ei brute accusam blandit eos, ut legendos deserunt concludaturque eum. Novum error dicam cu mel, sit falli persius cu, sea ex zril eripuit. Ei vel legere nemore, iudico lobortis at nam.",
            author: {
                id : "588c2e092403d111454fff76",
                username: "Jack"
            }
        },
        {
            name: "Anupama",
            image: "https://2.bp.blogspot.com/-WR2z7IqvfcY/WyKvcboc2EI/AAAAAAAA04k/gk-haw61b2ssJzLiCCrhTnD9zbwswZE1wCLcBGAs/s640/June%2B9%252C%2B2018%2BAnupama%2BParameswaran%2Bat%2BTej%2B-%2BI%2BLove%2BYou%2BAudio%2BRelease1.jpg",
            description: "Lorem ipsum dolor sit amet, id delenit appareat expetenda has. Has minimum delicatissimi ex, cu cum tacimates accusata intellegat, ridens posidonium constituam sed ea. Ei brute accusam blandit eos, ut legendos deserunt concludaturque eum. Novum error dicam cu mel, sit falli persius cu, sea ex zril eripuit. Ei vel legere nemore, iudico lobortis at nam.",
            author: {
                id : "588c2e092403d111454fff71",
                username: "Jill"
            }
        },
        {
            name: "Rithika",
            image: "https://www.newsbugz.com/wp-content/uploads/2018/07/Ritika-Singh-Images-3.jpg",
            description: "Lorem ipsum dolor sit amet, id delenit appareat expetenda has. Has minimum delicatissimi ex, cu cum tacimates accusata intellegat, ridens posidonium constituam sed ea. Ei brute accusam blandit eos, ut legendos deserunt concludaturque eum. Novum error dicam cu mel, sit falli persius cu, sea ex zril eripuit. Ei vel legere nemore, iudico lobortis at nam.",
            author: {
                id : "588c2e092403d111454fff77",
                username: "Jane"
            }
        }
    ];
    
function seedDB() {
    
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed Campgrounds");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        Comment.create({
                            text: "I love her and I would fuck her anytime of the day.",
                            author:{
                                id : "588c2e092403d111454fff76",
                                username: "Mugi"
                            }
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                    }
                });
            });
        }
    });
    
}

module.exports = seedDB;