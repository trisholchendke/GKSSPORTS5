var restful=require('node-restful');
module.exports=function(app,route){
	var rest=restful.model(
			'sponsoruploadedadvertisement',
			app.models.model_sponsor_login).methods(['get','post','put','delete'],function(req,res,next){
				
			});
	
	
	rest.register(app,route);
	
	return function(req,res,next){
		next();
	};
};
