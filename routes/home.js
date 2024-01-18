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

// event journal hub
router.get("/journalhub", (req, res) => {
    res.render('journalhub', { title: "JournalHub" , events });
})

module.exports = router;