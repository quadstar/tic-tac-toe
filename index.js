var express    = require('express');
var app        = express();
var port       = process.env.PORT || 8080;
var browserify = require('browserify-middleware');
var Path       = require('path');

browserify.settings({ transform: ['reactify']});

app.get('/bundle.js', browserify('./client/main.js'));

var assetFolder = Path.resolve(__dirname, './client');

app.use(express.static(assetFolder));

app.get('/*', function(req, res){
  res.sendFile(assetFolder + '/index.html');
});

app.listen(port);
console.log('Server Running on ' + port);
