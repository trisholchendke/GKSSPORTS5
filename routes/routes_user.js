var restful=require('node-restful');
module.exports=function(app,route){
	var rest =
		
	restful.model(
		'users',
		app.models.UsersModel).methods(['get','post','put','delete'],function(req,res,next){
			console.log(req.url);
	});
	
	
	rest.register(app,route);
	
	return function(req,res,next){
		next();
		console.log(req.url);
	};
};
