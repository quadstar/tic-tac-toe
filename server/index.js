var express    = require('express');
var app        = express();
var port       = process.env.PORT || 8080;
var browserify = require('browserify-middleware');
var Path       = require('path');
var bodyParser = require('body-parser');
var boardCheck = require('./boardCheck.js');

app.use(bodyParser.json());

// route to check board for win condition. 
app.post('/api/board-check', function(req, res){
  boardCheck(req.body.rows, req.body.played);
  res.status(200).send('k man');
});

// convert jsx to js and bundle files
browserify.settings({ transform: ['reactify']});

app.get('/bundle.js', browserify('./client/main.js'));

// Host static files and handle wildcard routes.
var assetFolder = Path.resolve(__dirname, '../client');

app.use(express.static(assetFolder));

app.get('/*', function(req, res){
  res.sendFile(assetFolder + '/index.html');
});

// start server
app.listen(port);
console.log('Server Running on ' + port);
