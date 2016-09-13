var mongoose = require('mongoose');

var UserModelSchema = new mongoose.Schema({
	user_name:String,
    password:String,
});
module.exports = mongoose.model('user_model', UserModelSchema);
