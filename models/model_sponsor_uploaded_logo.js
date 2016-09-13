var mongoose = require('mongoose');

var SponsorUploadedLogoSchema = new mongoose.Schema({
	logo_title:String,
    logo_path:String,
    logo_upladed_time:Date,
});

module.exports = mongoose.model('sponsoruploadedlogo', SponsorUploadedLogoSchema);
