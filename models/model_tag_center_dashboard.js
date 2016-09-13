var mongoose = require('mongoose');

var TagcenterDashboardSchema = new mongoose.Schema({
	video_url:String,
	video_name:String,
	video_description:String,
	tags:Array,
});

module.exports = mongoose.model('tagcenterdashboard', TagcenterDashboardSchema);
