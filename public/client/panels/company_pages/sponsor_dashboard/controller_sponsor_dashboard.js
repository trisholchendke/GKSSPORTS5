(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_dashboard', ['$scope','$http',controller_sponsor_dashboard])
;
function controller_sponsor_dashboard($scope,$http){
//	var new_item =
//		{
//			video_name:'haha',
//			video_url:'../client/upload/20160913132030558.mp4',
//			video_description:'svs',
//			video_status:0,
//		};
//	
//	$http.post('api/sponsordashboard',new_item)
//	.success(function(response) {
////		alert(JSON.stringify(response,null,2));
//		get_all_videos();
//	});
	
	var get_all_videos = function(){
		$http.get('/api/sponsordashboard')
		.success(function(response) {
			$scope.video_data = response;
//			alert(JSON.stringify(response,null,2));
		});
	}
	get_all_videos();
	
	$scope.approve_video = function(coming_object){
		alert('Video is Approved');
//		alert(JSON.stringify(coming_object));
		coming_object['video_status'] = 1;
		$http.put('/api/sponsordashboard/' + coming_object._id,coming_object)
		.success(function(response) {
//			alert(JSON.stringify(response,null,2));
			get_all_videos();
		});
	}
	$scope.dis_approve_video = function(coming_object){
		alert('Video is Dis Approved');
//		alert(JSON.stringify(coming_object));
		coming_object['video_status'] = 2;
		$http.put('/api/sponsordashboard/' + coming_object._id,coming_object)
		.success(function(response) {
//			alert(JSON.stringify(response,null,2));
			get_all_videos();
		});
	}
}

})();
