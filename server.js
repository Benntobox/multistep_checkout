var express = require('express');
var bodyParser = require('body-parser');
const { add, get, update, clear } = require('./database/app.js')

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/account', function (req, res) {
  add(req.body)
  res.json(req.body.email);
})

app.post('/shipping', function (req, res) {
  add(req.body)
  res.end();
})

app.post('/billing', function (req, res) {
  add(req.body)
  .then(() => get({email: req.body.email}))
  .then((docs) => { 
    if (docs.length === 0) { res.json({}); }
    else { res.json(docs[0]); }
  })
})

app.get('/clear', function (req, res) {
  clear();
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