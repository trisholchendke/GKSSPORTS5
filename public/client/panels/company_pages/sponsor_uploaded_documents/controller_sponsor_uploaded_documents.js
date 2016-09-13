(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_uploaded_documents', ['$scope','$http',controller_sponsor_uploaded_documents])
;
function controller_sponsor_uploaded_documents($scope,$http){
	var get_all_advertisements = function(){
		$http.get('/api/sponsoruploadeddocument')
		.success(function(response) {
			$scope.uploaded_document = response;
		});
	}
	get_all_advertisements();
	
	$scope.remove_document = function(id){
		$http.delete('/api/sponsoruploadeddocument/' + id)
		.success(function(response) {
			get_all_advertisements();
		});
	}
	$scope.remove_pdf = function(id){
		$http.delete('/api/sponsoruploadeddocument/' + id)
		.success(function(response) {
			get_all_advertisements();
		});
	}
	$scope.remove_docs = function(id){
		$http.delete('/api/sponsoruploadeddocument/' + id)
		.success(function(response) {
			get_all_advertisements();
		});
	}
}

})();
