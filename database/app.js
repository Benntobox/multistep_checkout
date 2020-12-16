const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {
  useMongoClient: true
});

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
      Account.update({email: data.email}, account, (err, docs) => {
        if (err) { return err; }
        return docs;
      });
    });
  return data;
}

let get = async (filter) => {
  return Account.find(filter);
}

module.exports.add = add;
module.exports.get = get;