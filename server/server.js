const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./api.js');

var app = express();
var https = require('https')
var fs = require('fs');
var hskey = fs.readFileSync('server/key.pem');
var hscert = fs.readFileSync('server/cert.pem');
const confidential = require('./common/confidential.js');
var expressOptions = {
    key: hskey,
    cert: hscert,
    passphrase: confidential.SSL_PASSPHRASE
};


// Setup REST API
const dbName = 'stiryDB';
var options = {
    server: {
        socketOptions: {
            socketTimeoutMS: 30000,
            connectTimeoutMS: 30000
        }
    }
};
const connectionString = 'mongodb://localhost:27017/' + dbName;
var connectWithRetry = function () {
    return mongoose.connect(connectionString, options, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};
connectWithRetry();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', api);

// Setup serving static app 
const fileDirectory = __dirname.replace('server', 'build');
app.get(['/', '/signin', '/reset', '/wait', '/guest', '/guest', '/scrambled', '/start', '/join'], function (request, response) {
    response.sendFile(fileDirectory + '/index.html');
});
app.get('/app.js', function (request, response) {
    response.sendFile(fileDirectory + '/app.js');
});
app.get('/app.css', function (request, response) {
    response.sendFile(fileDirectory + '/app.css');
});
app.get('/fontawesome*', function (request, response) {
    try {
        response.sendFile(fileDirectory + request.originalUrl);
    }
    catch (error) {
        response.sendStatus(404);
    }
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

https.createServer(expressOptions, app).listen(443, () => {
  console.log('Express server listening on port 443');
});