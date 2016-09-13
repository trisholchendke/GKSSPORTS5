(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_login', ['$scope','$http','$state',controller_sponsor_login])
;
function controller_sponsor_login($scope,$http,$state){
	$scope.login_sponsor = {};
	$scope.login_sponsors = function(coming_object) {
		if (coming_object.user_name != undefined && coming_object.password != undefined) {
				 $http.get("/api/sponsorlogin?user_name="+coming_object.user_name+"&&password="+coming_object.password)
	             .success(function (response) {
	            	 if(response.length === 0){
	 					alert('Invalid User Name And Password');
	 					$scope.login_sponsor = {};
	 				};
	 				if(response.length === 1){
	 					alert('Login Sucessfully');
	 					$scope.login_sponsor = {};
	 					$state.go('sponsor_dashboard', { 'login_object': response});
	 				}
	 			});
             };
	};
}
})();

