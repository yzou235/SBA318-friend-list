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
    .patch((req, res, next) => {
        const updatedEvent = req.body;

        // Find the index
        const eventIndex = events.findIndex((e) => e.id == req.params.id);

        if (eventIndex !== -1) {
            // Update the event at the found index
            events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
            res.json({ message: "Event updated successfully", updatedEvent });
        } else {
            next();
        }
    })
    .delete((req, res, next) => {
        const updatedEvents = events.filter((e) => e.id != req.params.id);

        if (updatedEvents.length < events.length) {
            // Event was found and deleted
            res.json({ message: "Event deleted successfully" });
        } else {
            // Event was not found
            next();
        }
    })
    .post((req, res) => {
        const newEvent = req.body;
    
        // Assign the new ID to the event
        newEvent.id = events.length + 1;
    
        // Add the new event to the events array
        events.push(newEvent);
    
        res.json({ message: "Event created successfully", newEvent });
    });

    
module.exports = router;

