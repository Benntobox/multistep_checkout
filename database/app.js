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
  return await Account.find({email: data.email}, (err, docs) => {
    if (err) { return err; }
    let doc = docs.length > 0 ? docs[0] : docs;
    const account = new Account({
      email: data.email,
      name: data.name,
      password: data.password,
      address1: data.address1 || doc.address1 || null,
      address2: data.address2 || doc.address2 || null,
      city: data.city || doc.city || null,
      state: data.state || doc.state || null,
      zipcode: data.zipcode || doc.zipcode || null,
      phone: data.phone || doc.phone || null,
      cc: data.cc || doc.cc || null,
      expire: data.expire || doc.expire || null,
      ccv: data.ccv || doc.ccv || null,
      billzip: data.billzip || doc.billzip || null
    });
    if (docs.length === 0) { account.save() } 
    else { Account.updateOne({_id: doc._id}, account) }
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
module.exports.firstAdd = firstAdd;
module.exports.clear = clear;