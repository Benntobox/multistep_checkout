var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/account', function (req, res) {
  console.log("Account: ", req.body);
  res.end();
})

app.post('/shipping', function (req, res) {
  console.log("Shipping: ", req.body);
  res.end();
})

app.post('/billing', function (req, res) {
  console.log("Billing: ", req.body)
  res.end();
})

// Get rid of favicon 404 error
app.get('/favicon.ico', function (req, res) { res.end(); });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});