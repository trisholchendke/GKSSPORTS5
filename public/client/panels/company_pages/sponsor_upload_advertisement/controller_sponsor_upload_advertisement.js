(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_upload_advertisement', ['$scope','$window','$http','$state',controller_sponsor_upload_advertisement])
;
function controller_sponsor_upload_advertisement($scope,$window,$http,$state){
	var get_all_advertisement = function(){
		$http.get('/api/upload_advertisement')
		.success(function(response) {
			$scope.video_data = response;
		});
	}
	get_all_advertisement();
	
		$scope.onAddNewVideo=function(){
			$scope.user.advertisement_uploaded_time = new Date().toGMTString().slice(0, -4);
			
			var	str = $scope.user.advertisement_path;
			var text = str.replace("public/","");
			$scope.user['advertisement_path'] = text;
			
			$http.post('/api/sponsoruploadedadvertisement',$scope.user)
			.success(function(response){
				get_all_advertisement();
			});
			$state.go("sponsor_uploaded_advertisement");
		};
		
		 var SelectedFile;
         var lFileSize;
		$scope.onVideoFileChosen=function() {
			SelectedFile= event.target.files[0];
			console.log(SelectedFile.type);
			$scope.user.advertisement_type = SelectedFile.type;
//			alert(JSelectedFile);
			lFileSize=event.target.files[0].size
//			console.log("NwFile : "+event.target.files[0].size);

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
//			console.log(data['Percent']);
			var Place = data['Place'] * 524288; //The Next Blocks Starting Position
			var NewFile; //The Variable that will hold the new Block of Data
			if(SelectedFile.webkitSlice) 
				NewFile = SelectedFile.webkitSlice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
			else
				NewFile = SelectedFile.slice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
//			console.log("NwFile : "+SelectedFile.size);
			FReader.readAsBinaryString(NewFile);
		});
		
		function UpdateBar(percent){
			document.getElementById('pro').setAttribute('value',(Math.round(percent*100)/100));
		}
		
		var Path = "http://localhost:8080/";
		
		   socket.on('Done', function (data){
			   $scope.user.advertisement_path = data['Image'];
			   $scope.onAddNewVideo();
		});
}
function customOnChange(){
	return{
		restrict:'A',
		link:function(scope,element,attrs){
			var changefun=scope.$eval(attrs.customOnChange);
			element.bind('change',changefun);
		}
	};
}

})();
