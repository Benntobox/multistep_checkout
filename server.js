var express = require('express');
var bodyParser = require('body-parser');
const { add, get, firstAdd, firstGet, clear } = require('./database/app.js')

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/account', function (req, res) {
  console.log("Account: ", req.body);
  firstAdd({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  get({email: req.body.email}).then((rec) => console.log('rec', rec))
  res.json(req.body.email);
})

app.post('/shipping', function (req, res) {
  console.log("Shipping: ", req.body);
  add({
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    phone: req.body.phone
  })
  get({email: req.body.email}).then((doc) => { console.log('FIRST', doc); res.end() })
})

app.post('/billing', function (req, res) {
  console.log("Billing: ", req.body)
  add({
    cc: req.body.cc,
    expire: req.body.expire,
    ccv: req.body.ccv,
    billzip: req.body.billzip
  })
    .then(() => console.log('Secondget', get({email: req.body.email})))
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