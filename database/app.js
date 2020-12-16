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
      let update = {$set: data};
      Account.collection.findOneAndUpdate({_id: doc._id}, update);
      return doc;
    } else {
      const account = new Account(data);
      account.save();
      return account;
    }
  })
}

let update = async (data) => {
  return Account.findOne({email: data.email})
  .then(docs => {
    Account.update({email: data.email}, {
      $set: {
        address1: data.address1 || docs.address1 || null,
        address2: data.address2 || docs.address2 || null,
        city: data.city || docs.city || null,
        state: data.state || docs.state || null,
        zipcode: data.zipcode || docs.zipcode || null,
        phone: data.phone || docs.phone || null
      }
    })
    return docs;
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
module.exports.update = update;


// const account = new Account({
    //   email: data.email,
    //   name: data.name,
    //   password: data.password,
    //   address1: data.address1 || doc.address1 || null,
    //   address2: data.address2 || doc.address2 || null,
    //   city: data.city || doc.city || null,
    //   state: data.state || doc.state || null,
    //   zipcode: data.zipcode || doc.zipcode || null,
    //   phone: data.phone || doc.phone || null,
    //   cc: data.cc || doc.cc || null,
    //   expire: data.expire || doc.expire || null,
    //   ccv: data.ccv || doc.ccv || null,
    //   billzip: data.billzip || doc.billzip || null
    // });