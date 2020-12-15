var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/account', function (req, res) {
  console.log("data", req.body);
  //checkdatabase for email
  //if not found, add user to user database
  //
  res.end();
})

// Get rid of favicon 404 error
app.get('/favicon.ico', function (req, res) { res.end(); });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});