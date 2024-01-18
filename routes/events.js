const express = require('express');
const router = express.Router();
const friends = require('../data/friends');
const events = require('../data/events');

// get all the memory events with one friend based on his/her id
