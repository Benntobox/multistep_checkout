const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {
  useMongoClient: true
});

mongoose.Promise = require('bluebird');

let accountSchema = mongoose.Schema({
  email: String, 
  name: String,
  password: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zipcode: Number,
  phone: Number,
  cc: Number,
  expire: String,
  ccv: Number,
  billzip: Number
});

let Account = mongoose.model('Account', accountSchema)

let firstAdd = (data) => {
  const acc = new Account({
    name: data.name, 
    email: data.email,
    password: data.password
  })
  acc.save();
  return acc;
}

let add = async (data) => {
  Account.find({email: data.email})
    .then((docs) => {
      const account = new Account({
        email: data.email,
        name: data.name,
        password: data.password,
        address1: data.address1 || docs.address1 || null,
        address2: data.address2 || docs.address2 || null,
        city: data.city || docs.city || null,
        state: data.state || docs.state || null,
        zipcode: data.zipcode || docs.zipcode || null,
        phone: data.phone || docs.phone || null,
        cc: data.cc || docs.cc || null,
        expire: data.expire || docs.expire || null,
        ccv: data.ccv || docs.ccv || null,
        billzip: data.billzip || docs.billzip || null
      });
      Account.update({email: data.email}, account, { upsert: true });
      return account;
    });
}

let get = async (filter) => {
  return await Account.find(filter);
}

let clear = async (filter) => {
  return Account.deleteMany(filter);
}

module.exports.add = add;
module.exports.get = get;
module.exports.firstAdd = firstAdd;
module.exports.clear = clear;