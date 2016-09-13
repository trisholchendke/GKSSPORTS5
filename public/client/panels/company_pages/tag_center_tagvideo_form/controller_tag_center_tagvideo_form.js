(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_tag_center_tagvideo_form', ['$scope','$stateParams','$http','$state',controller_tag_center_tagvideo_form])
;
function controller_tag_center_tagvideo_form($scope,$stateParams,$http,$state){
	if($stateParams.video_object){
		$scope.video_name = $stateParams.video_object.video_name;
		$scope.video_description = $stateParams.video_object.video_description;
		$scope.video_tags = $stateParams.video_object.tags;
		$scope.video_id = $stateParams.video_object._id;
//		alert(JSON.stringify($scope.video_tags));
		
		$scope.add_another_tags = function(){
			$http.put('/api/tagcenterdashboard/' + $scope.video_id,{tags:$scope.items})
			.success(function(data) {
				$scope.items = [];
				$state.go('tag_center_dashboard');
			});
		};
		
		$scope.items = [];

		  $scope.itemsToAdd = [{
		    tags: '',
		  }];

		  $scope.add = function(itemToAdd) {

		    var index = $scope.itemsToAdd.indexOf(itemToAdd);

		    $scope.itemsToAdd.splice(index, 1);

		    $scope.items.push(angular.copy(itemToAdd))
		  }

		  $scope.addNew = function() {

		    $scope.itemsToAdd.push({
		      tags: ''
		    });
		  }
	}else{
		$state.go('tag_center_dashboard');
	}
}

})();
