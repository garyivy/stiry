const express = require('express');
var app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const api = require('./api.js');
const confidential = require('./common/confidential.js'); // Note: This file is not in GitHub, rename example.js.

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
    return mongoose.connect(connectionString, options, function (error) {
        if (error) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', error);
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
app.get(['/', '/signin', '/signout', '/reset', '/forgot', '/wait', '/guest', '/scrambled', '/start', '/join', '/force', '/questionnaire'], function (request, response) {
    response.sendFile(fileDirectory + '/index.html');
});
app.get('/app.js', function (request, response) {
    response.sendFile(fileDirectory + '/app.js');
});
app.get('/app.css', function (request, response) {
    response.sendFile(fileDirectory + '/app.css');
});
app.get('/google6ec541a5847cb144.html', function (request, response) {
    response.sendFile(fileDirectory + '/google6ec541a5847cb144.html');
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
});

/*
// Serve Locally
app.listen(3001, ()=>{
    console.log('Express server listening on port 3001')
});
*/

// Server over HTTPS
var https = require('https')
var fs = require('fs');
var hskey = fs.readFileSync('server/key.pem');
var hscert = fs.readFileSync('server/cert.pem');
var ca =  fs.readFileSync('server/ca.pem');
var expressOptions = {
    key: hskey,
    cert: hscert,
    ca: ca
};
https.createServer(expressOptions, app).listen(443, () => {
  console.log('Express server listening on port 443');
});


