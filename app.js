var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan   = require('morgan');
var restful = require('node-restful');
var mongoose = restful.mongoose;

var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application.
 var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs')
, exec = require('child_process').exec
, util = require('util')
,express = require('express')
, Files = {};
 
 app.listen(8989);

 var app = express().use(express.static(__dirname + '/public'));
app.use('/img',express.static(__dirname +'public/view'));

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); 


// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/GSKDB');
mongoose.connection.once('open', function() {
  app.models = require('./models/index');
  
  var routes = require('./routes/routes');
  _.each(routes, function(routes, route) {
    app.use(route, routes(app, route));
  });

  console.log('Listening on port 8080...');
  app.listen(8080);

});

function handler (req, res) {
	  fs.readFile(__dirname + '../public/index.html',
	  function (err, data) {
	    if (err) {
	      res.writeHead(500);
	      return res.end('Error loading index.html');
	    }
	    res.writeHead(200);
	    res.end(data);
	  });
}
io.sockets.on('connection', function (socket) {
  	socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
			var Name = data['Name'];
			Files[Name] = {  //Create a new Entry in The Files Variable
				FileSize : data['Size'],
				Data	 : "",
				Downloaded : 0
			}
			var Place = 0;
			try{
				var Stat = fs.statSync('Temp/' +  Name);
				if(Stat.isFile())
				{
					Files[Name]['Downloaded'] = Stat.size;
					Place = Stat.size / 524288;
				}
			}
	  		catch(er){} //It's a New File
			fs.open("Temp/" + Name, 'a', 0755, function(err, fd){
				if(err)
				{
					console.log(err);
				}
				else
				{
					Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
					socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
				}
			});
	});
	
	socket.on('Upload', function (data){
			var Name = data['Name'];
			Files[Name]['Downloaded'] += data['Data'].length;
			Files[Name]['Data'] += data['Data'];
			if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
			{
				fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
					var inp = fs.createReadStream("Temp/" + Name);
                    var path=(new Date()).toISOString().replace(/[^0-9]/g, "").concat('.',Name.split('.').pop());
					var out = fs.createWriteStream("public/client/upload/" +path);
					util.pump(inp, out, function(){
						fs.unlink("Temp/" + Name, function () { //This Deletes The Temporary File
							exec("ffmpeg -i public/client/upload/" + path  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg public/client/upload/" + path, function(err){
								socket.emit('Done', {'Image' : 'public/client/upload/' + path});
							});
						});
					});
				});
			}
			else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
				fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
					Files[Name]['Data'] = ""; //Reset The Buffer
					var Place = Files[Name]['Downloaded'] / 524288;
					var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
					socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
				});
			}
			else
			{
				var Place = Files[Name]['Downloaded'] / 524288;
				var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
				socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
			}
		});
});
//require('../GSKSportProject/routes/routes_demo.js')(app);
console.log('hi');








