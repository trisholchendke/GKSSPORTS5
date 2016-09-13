(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_tag_center_dashboard',['$scope','$http',controller_tag_center_dashboard])
;
function controller_tag_center_dashboard($scope,$http){
	var get_all_videos = function(){
		$http.get('/api/tagcenterdashboard')
		.success(function(response) {
			$scope.video_data = response;
//			alert(JSON.stringify(response,null,2));
		});
	}
	get_all_videos();
}

})();

