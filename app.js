const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: ["http://localhost:3000"] }))

// Routes
const projectRoute = require('./routes/projectRoute.js');
const issueRoute = require('./routes/issueRoute.js');
const userRoute = require('./routes/userRoute.js');

app.use('/projects', projectRoute);
app.use('/issues', issueRoute);
app.use('/users', userRoute);

module.exports = app;
