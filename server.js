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
  .then(() => get({email: req.body.email}))
  .then((rec) => console.log('Found account', rec));
  res.json(req.body.email);
})

app.post('/shipping', function (req, res) {
  console.log("Shipping: ", req.body);
  add(req.body)
  .then(docs => console.log('Shipping returned: ', docs))
  .then(() => get({email: req.body.email}))
  .then((doc) => console.log('Found shipping', doc))
  res.end();
})

app.post('/billing', function (req, res) {
  console.log("Billing: ", req.body)
  add(req.body)
    .then(() => get({email: req.body.email}) )
    .then((docs) => console.log('Inner: ', docs))
  res.end();
})

app.post('/complete', function (req, res) {
  console.log('Retrieving info for ', req.body.email)
  get({email: req.body.email}).then((doc) => { console.log('d', doc); res.json(doc); })
})

app.get('/clear', function (req, res) {
  clear({});
  res.end();
})

// Get rid of favicon 404 error
app.get('/favicon.ico', function (req, res) { res.end(); });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});