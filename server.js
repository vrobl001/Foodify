const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

require('dotenv').config();
require('./config/database');

const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', require('./routes/api/users'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index'));
});

app.listen(port, function() {
    console.log(`Express is listening on port: ${port}`);
});
