const express = require('express');
const router = express.Router();
const friends = require('../data/friends');
const events = require('../data/events');
const comments = require('../data/comments');

router
    .route("/:id")
    .get((req, res, next) => {
        const friend = friends.find((f) => f.id == req.params.id);
        // get all the memory events with one friend based on his/her id
        const friendEvents = events.filter(event => event.friendId == req.params.id);

        if (friend) {
            // render the page with the friend bio and a list of memory events with this friend
            res.render('friendPage', {friend, friendEvents, title: `Memories with ${friend.name}`});
        } else {
            next();
        }
    })
    .delete((req, res) => {
        const friendId = req.params.id;
        const friendIndex = friends.findIndex(f => f.id == friendId);

        if (friendIndex !== -1) {
            // Remove friend from the friends array
            friends.splice(friendIndex, 1);
            // Optionally, you might also want to remove associated events
            events = events.filter(event => event.friendId !== friendId);

            res.status(204).send(); // Respond with a 204 status for successful deletion
        } else {
            res.status(404).send("Friend not found");
        }
    });

router
    .route("/:id/update")
    .get((req, res, next) => {
        const friend = friends.find((f) => f.id == req.params.id);
        if (friend) {
            // render the page with the friend bio and a list of memory events with this friend
            res.render('updateFriend', {friend, title: `Update Friend Info`});
        } else {
            next();
        }
    })
    .patch((req, res) => {
        const friendId = req.params.id;
        const updatedInfo = req.body;
    
        const friendIndex = friends.findIndex(f => f.id == friendId);
        if (friendIndex !== -1) {
            friends[friendIndex] = { ...friends[friendIndex], ...updatedInfo };
            const successMessage = 'Friend information successfully updated';
            res.json({ friend: friends[friendIndex], successMessage });
        } else {
            res.status(404).send("Friend not found");
        }
    })

router
    .route("/:id/events/:eventId")
    .get((req, res, next) => {
        const event = events.find((f) => f.id == req.params.eventId);
        if (event) {
            // render the page with the friend bio and a list of memory events with this friend
            res.render('eventPage', {event, title: `${event.event}`});
        } else {
            next();
        }
    })


module.exports = router;