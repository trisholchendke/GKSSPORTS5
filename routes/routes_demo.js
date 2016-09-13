(function () {	'use strict';
var mongoose = require('mongoose');

module.exports = function(app){
	app.post("/user_post",user_post);
	function user_post(req,res){
//		console.log(req.body);
		var Cat = mongoose.model('Cat1', { user_name: String ,password:String});

//		var kitty = new Cat(req.body);
		Cat.find({"_id":"57d7d53e44ccd15c0fefbd7d"},function (err,data) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log(data[0).user_name
		  }
		});
	}
}
})();