const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {
  useMongoClient: true
});

mongoose.Promise = require('bluebird');

let accountSchema = mongoose.Schema({
  email: {type: String, unique: true, required: true},
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

let add = async (data) => {
  return Account.collection.findOne({email: data.email})
  .then(doc => {
    if (doc) { 
      Account.collection.findOneAndUpdate({_id: doc._id}, {$set: data});
      return doc;
    } else {
      const account = new Account(data);
      account.save();
      return account;
    }
  })
}

let get = async (filter) => {
  return await Account.find(filter);
}

let clear = async (filter) => {
  return Account.deleteMany(filter);
}

module.exports.add = add;
module.exports.get = get;
module.exports.clear = clear;