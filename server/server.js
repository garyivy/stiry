const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./api.js'); 
const app = express(); 

// Setup REST API
const dbName = 'stiryDB';
const connectionString = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(connectionString);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', api); 

// Setup serving static app 
const fileDirectory = __dirname.replace('server','build');
app.get(['/', 'signin', 'reset'], function ( request, response ) {
    response.sendFile(fileDirectory + '/index.html');
});
app.get('/app.js', function ( request, response ) {
    response.sendFile(fileDirectory + '/app.js');
});
app.get('/app.css', function ( request, response ) {
    response.sendFile(fileDirectory + '/app.css');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.listen(3001, () => console.log('server listening on 3001'));
