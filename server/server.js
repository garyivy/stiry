const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./api.js'); 
const app = express(); 

const dbName = 'stiryDB';
const connectionString = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(connectionString);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', api); 

const fileDirectory = __dirname.replace('server','build');

app.listen(3001, () => console.log('server listening on 3001'));


app.get('/', function ( request, response ) {
    response.sendFile(fileDirectory + '/index.html');
});
app.get('/app.js', function ( request, response ) {
    response.sendFile(fileDirectory + '/app.js');
});
app.get('/app.css', function ( request, response ) {
    response.sendFile(fileDirectory + '/app.css');
});

