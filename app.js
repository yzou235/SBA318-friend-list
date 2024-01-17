const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

const friends = require("./routes/friends");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

const error = require("./utilities/error");

// Body-parser middleware //
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

// Static Files //
app.use(express.static('public'));

// Route Prefix
// app.use("", require("./routes/routes"));
// app.use("/api/friends", friends);
// app.use("/api/posts", posts);
// app.use("/api/comments", comments);

// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
});

// Error-handling middleware.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});