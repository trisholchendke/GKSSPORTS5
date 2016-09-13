var mongoose = require('mongoose');

var OnsiteLoginSchema = new mongoose.Schema({
	user_name:String,
    password:String,
});

module.exports = mongoose.model('onsitelogin', OnsiteLoginSchema);
