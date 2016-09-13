(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_onsite_login', ['$scope','$http','$state',controller_onsite_login])
;
function controller_onsite_login($scope,$http,$state){
	$scope.onsite_user = {};
	$scope.login_onsite_user = function(coming_object) {
		if (coming_object.user_name != undefined && coming_object.password != undefined) {
				 $http.get("/api/onsitelogin?user_name="+coming_object.user_name+"&&password="+coming_object.password)
	             .success(function (response) {
	            	 if(response.length === 0){
	 					alert('Invalid User Name And Password');
	 					$scope.onsite_user = {};
	 				};
	 				if(response.length === 1){
	 					alert('Login Sucessfully');
	 					$scope.onsite_user = {};
	 					$state.go('onsite_dashboard');
	 				}
	 			});
             };
	};
}

})();
