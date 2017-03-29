var express        = require('express');
var fbController   = require('./controllers/fbController.js');
var app            = express();
var bodyParser     = require('body-parser');
var path           = require('path');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var FB 			      = require('fb');
var fbapp             = require('./config/fb');

app.use(express.static(__dirname + '/public'));

fbController(app);

app.listen(port);

require('./app/routes')(app); // pass our application into our routes






//var mongoose       = require('mongoose');
//var db = require('./config/db');
//mongoose.connect(db.url);
