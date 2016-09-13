angular
.module('routerApp')
.controller("controller_my_demo", ['$scope','$http',controller_my_demo])
;
function controller_my_demo($scope,$http){
	$scope.user = {};
	var get_all_users = function(){
		$http.get('/api/users')
		.success(function(response){
			$scope.users = response;
		});
	};
	get_all_users();
	
	$scope.submit_user = function(coming_object){
		$http.post('/api/users', coming_object)
		.success(function(response){
			get_all_users();
			coming_object = {};
			$scope.user = {};
		});
	};
	
	$scope.delete_user = function(id){
		$http.delete('/api/users/' + id)
		.success(function(response){
			get_all_users();
			id = {};
		});
	};
	
	$scope.edit_user = function(id){
		$http.get('/api/users/' + id).success(function(response){
			get_all_users();
			$scope.user = response;
		});
	};
	
	$scope.update_user = function(){
		$http.put('/api/users/' + $scope.user._id, $scope.user).success(function(response){
			get_all_users();
			$scope.user = {};
		});
	}
}
