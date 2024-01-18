const express = require('express');
const router = express.Router();
const friends = require('../data/friends');

router.get("/", (req, res) => {
    res.render('index', { title: 'Home Page', friends })
    // 'index' is the name of the template or view file to be rendered
    // {} is an object (to be used by the template engine to dynamically generate the HTML) passed to the render method
});

module.exports = router;