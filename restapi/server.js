var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
Student = require('./api/models/student'), //created model loading here

bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors=require('cors');
var routes = require('./api/routes/routes'); //importing route
app.use(cors());

routes(app); //register the route
app.listen(port);


console.log('Student RESTful API server started on: ' + port);