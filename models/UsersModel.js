var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  user_name: {type: String},
  password: { type: String },
});

module.exports = mongoose.model('users', UsersSchema);