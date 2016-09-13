angular
.module('routerApp')
.controller('controller_navbar',['$scope','tutorials_chapter',controller_navbar])
;
function controller_navbar($scope,tutorials_chapter) {
//	alert(JSON.stringify(tutorials_chapter.chapter));
	$scope.chapter_name = tutorials_chapter.chapter;
	
}