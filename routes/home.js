const express = require('express');
const router = express.Router();
const friends = require('../data/friends');
const events = require('../data/events');

// Home page to get a list of friend info
router.get("/", (req, res) => {
    res.render('index', { title: 'Home Page', friends })
    // 'index' is the name of the template or view file to be rendered
    // {} is an object (to be used by the template engine to dynamically generate the HTML) passed to the render method
});

// add friend page
router
    .route("/add")
    .get((req, res) => {
        res.render('add_friend', { title: "Add Friend" });
    })
    .post((req, res, next) => {
        const { name, email, phone } = req.body;

        if(name && email && phone) {
            const newFriend = {
                id: friends[friends.length - 1].id +1,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            };
            friends.push(newFriend);
            res.json(newFriend);
        } else {
            next();
        }
    });

// event event hub
router.get("/eventhub", (req, res) => {
    let filteredEvents = events;

    console.log(req.query);
    
    if (req.query.friendFilter) {
        filteredEvents = events.filter(event => event.friendId == req.query.friendFilter);
    }
    res.render('eventhub', { title: "EventHub" , events: filteredEvents, friends: friends });
})

// router.get("/journalhub", (req, res) => {
//     const friendFilter = req.query.friendFilter;
//     console.log(friendFilter);
//     // Pass friendFilter to the view for rendering
//     res.render('journalhub', { title: "JournalHub", events, friendFilter });
// });

// router.get("/journalhub", (req, res) => {
//     const friendId = req.query.friendFilter;
//     console.log(friendId);
//     console.log(req.query);
//     // Pass friendFilter to the view for rendering
//     res.render('journalhub', { title: "JournalHub", events, friendId });
// });

// router.get("/friendEvents/:?friendId", (req, res) => {
//     const friendId = req.params.friendId;
//     // Filter events based on the specific friendId
//     const events = events.filter(event => event.friendId == friendId);
//     // Render the friendEvents.ejs template with the filtered events
//     res.render('journalhub', { title: "Friend's Events", events });
// });

module.exports = router;