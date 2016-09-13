var mongoose = require('mongoose');

var SponsorLoginSchema = new mongoose.Schema({
	user_name:String,
    password:String,
    video_status:Number
});

module.exports = mongoose.model('sponsorlogin', SponsorLoginSchema);
