var mongoose = require('mongoose');

var SponsorDashboardSchema = new mongoose.Schema({
	video_url:String,
	video_name:String,
    video_description:String,
    video_status:Number,
});

module.exports = mongoose.model('sponsordashboard', SponsorDashboardSchema);
