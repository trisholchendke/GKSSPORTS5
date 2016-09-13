(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_videos', ['$scope',controller_sponsor_videos])
;
function controller_sponsor_videos($scope){
	$scope.onAddNewVideo=function(){
		
		$scope.user.onsite_user=$window.sessionStorage.token;
		$scope.user.onsite_datetime=new Date().toGMTString().slice(0, -4);
		$scope.user.onsite_document="";
		console.log($scope.user);

		APIServices.addUser("/api/onsite/",$scope.user).success(function (response) {
      		
	    	   var obj=response._id;
	       	 if(obj.length>0){
	       		
	       		   $location.path('/user');
	       		
	               }else{
	             	  $scope.error ="Sorry,Please try again !!!";
	               }
	      	 

	       }).error(function(){
	    	   
	    	   $scope.error='Sorry,Please try again !!!';

		});

		 
	};
	
	
	
	 var SelectedFile;
     var lFileSize;
	$scope.onVideoFileChosen=function() {

		SelectedFile= event.target.files[0];
		lFileSize=event.target.files[0].size
		console.log("NwFile : "+event.target.files[0].size);

    };

	 var socket = io.connect('http://localhost:8989');
	var FReader;
	var Name;
	$scope.StartUpload=function (){
		if(SelectedFile != "")
		{
			FReader = new FileReader();
			Name = SelectedFile.name;
			//var ds = (new Date()).toISOString().replace(/[^0-9]/g, "");
			FReader.onload = function(evnt){
				socket.emit('Upload', { 'Name' : Name, Data : evnt.target.result });
			}
			socket.emit('Start', { 'Name' : Name, 'Size' : SelectedFile.size });
		}
		else
		{
			alert("Please Select A File");
		}
	}
	
	socket.on('MoreData', function (data){
		UpdateBar(data['Percent']);
		var Place = data['Place'] * 524288; //The Next Blocks Starting Position
		var NewFile; //The Variable that will hold the new Block of Data
		if(SelectedFile.webkitSlice) 
			NewFile = SelectedFile.webkitSlice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
		else
			NewFile = SelectedFile.slice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
		console.log("NwFile : "+SelectedFile.size);
		FReader.readAsBinaryString(NewFile);
	});
	function UpdateBar(percent){
		document.getElementById('pro').setAttribute('value',  (Math.round(percent*100)/100));
	}
	
	var Path = "http://localhost:8080/";
	
	   socket.on('Done', function (data){
		   $scope.user.onsite_video=data['Image'].replace("public", "..");
		   $scope.onAddNewVideo();
		
	});
}

})();
