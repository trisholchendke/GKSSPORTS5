(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_tag_center_login', ['$scope','$http','$state',controller_tag_center_login])
;
function controller_tag_center_login($scope,$http,$state){
	$scope.tag_center_login = {};
	$scope.login_tagcenter = function(coming_object) {
		if (coming_object.user_name != undefined && coming_object.password != undefined) {
			$http.get("/api/tagcenterlogin?user_name="+coming_object.user_name+"&&password="+coming_object.password)
				.success(function(response) {
					alert(JSON.stringify(response));
					if(response.length === 1){
						$scope.user_logged_sucessfully_message = true;
						$scope.tag_center_login = {};
						$state.go('tag_center_dashboard');
						coming_object = {}; 
					}else
					{
						$scope.tag_center_login = {};
						$scope.user_enter_wrong_username_and_password = true;
					}
			});
		}
	};

}

})();
