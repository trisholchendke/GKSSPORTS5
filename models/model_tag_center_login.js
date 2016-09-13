var mongoose = require('mongoose');

var TagcenterLoginSchema = new mongoose.Schema({
	user_name:String,
	password:String,
});

module.exports = mongoose.model('tagcenterlogin', TagcenterLoginSchema);
