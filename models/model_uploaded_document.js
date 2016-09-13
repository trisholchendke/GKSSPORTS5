var mongoose = require('mongoose');

var SponsorUploadedDocumentSchema = new mongoose.Schema({
	document_title:String,
    document_path:String,
    document_type:String,
    document_uploaded_time:Date,
});

module.exports = mongoose.model('sponsoruploadeddocument', SponsorUploadedDocumentSchema);
