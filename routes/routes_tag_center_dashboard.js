var restful=require('node-restful');
var fs = require('fs');
module.exports=function(app,route){
	var rest=restful.model(
			'tagcenterdashboard',
			app.models.model_sponsor_login).methods(['get','post','put','delete'],function(req,res,next){
				console.log(req.body);
			});
	
	
	rest.register(app,route);
//	console.log('hi');
//	
	return function(req,res,next){
		next();
	};
};
