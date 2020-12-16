var express = require('express');
var bodyParser = require('body-parser');
const { add, get, update, clear } = require('./database/app.js')

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/account', function (req, res) {
  console.log("Account: ", req.body);
  add(req.body)
  .then((docs) => console.log('Account returned: ', docs))
  res.json(req.body.email);
})

app.post('/shipping', function (req, res) {
  console.log("Shipping: ", req.body);
  add(req.body)
  .then(docs => console.log('Shipping returned: ', docs))
  res.end();
})

app.post('/billing', function (req, res) {
  console.log("Billing: ", req.body)
  add(req.body)
  .then(() => get({email: req.body.email}))
  .then((docs) => { 
    console.log('Final post: ', docs);
    res.json(docs);
  })
})

app.get('/clear', function (req, res) {
  clear({});
  res.end();
})

app.get('/showall', function (req, res) {
  get()
  .then(docs => res.json(docs))
})

// Get rid of favicon 404 error
app.get('/favicon.ico', function (req, res) { res.end(); });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});