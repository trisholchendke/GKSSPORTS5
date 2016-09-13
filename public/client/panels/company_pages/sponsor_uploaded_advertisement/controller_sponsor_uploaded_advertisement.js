(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_uploaded_advertisement', ['$scope','$http',controller_sponsor_uploaded_advertisement])
;
function controller_sponsor_uploaded_advertisement($scope,$http){
	var get_all_advertisements = function(){
		$http.get('/api/sponsoruploadedadvertisement')
		.success(function(response) {
			$scope.uploaded_advertisement = response;
		});
	}
	get_all_advertisements();
	
	$scope.remove_logos = function(id){
		$http.delete('/api/sponsoruploadedadvertisement/' + id)
		.success(function(response) {
			get_all_advertisements();
		});
	}
	$scope.remove_pdf = function(id){
		$http.delete('/api/sponsoruploadedadvertisement/' + id)
		.success(function(response) {
			get_all_advertisements();
		});
	}
	$scope.remove_docs = function(id){
		$http.delete('/api/sponsoruploadedadvertisement/' + id)
		.success(function(response) {
			get_all_advertisements();
		});
	}
}

})();
