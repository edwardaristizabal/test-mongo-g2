const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});

app.get('/', function (req, res) {
    res.sendFile('index.html', { root : __dirname});
});

// Parses the text as url encoded data 
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json 
app.use(bodyParser.json());

app.use('/api', api);
