const express = require('express');
const router = express.Router();
const friends = require('../data/friends');
const events = require('../data/events');
const comments = require('../data/comments');

// get event page
router
    .route("/:id")
    .get((req, res, next) => {
        const event = events.find((e) => e.id == req.params.id);
        const eventComments = comments.filter(comment => comment.eventId == req.params.id);

        if (event) {
            // Render your page with the post data
            res.render('eventPage', { event, eventComments, title: "Memory Event" });
        } else {
            next();
        }
    })


    
module.exports = router;

