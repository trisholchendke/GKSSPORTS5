
(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_uploaded_logo',['$scope','$window','$http','$state',controller_sponsor_uploaded_logo]);
function controller_sponsor_uploaded_logo($scope,$window,$http,$state){
	var get_all_logos = function(){
		$http.get('/api/sponsoruploadedlogo')
		.success(function(response) {
			$scope.uploaded_logos = response;
		});
	}
	get_all_logos();
	
	$scope.remove_image = function(id){
		$http.delete('/api/sponsoruploadedlogo/' + id)
		.success(function(response) {
			get_all_logos();
//			alert(response);
		});
	};
	
}

})();