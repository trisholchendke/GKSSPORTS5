var mongoose = require('mongoose');

var SponsorUploadedAdvertisementSchema = new mongoose.Schema({
	advertisement_title:String,
    advertisement_path:String,
    advertisement_type:String,
    advertisement_uploaded_time:Date,
});

module.exports = mongoose.model('sponsoruploadedadvertisement', SponsorUploadedAdvertisementSchema);
