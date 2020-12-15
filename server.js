var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.end();
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});