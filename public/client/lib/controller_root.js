angular
.module('routerApp')
.controller("controller_root", ['$scope',controller_root])
;
function controller_root($scope){
	$scope.parentobj = {};
	$scope.modal = {};
	$scope.user_collection_entry = {};
	$scope.my_cart = {};
}
