(function () {	'use strict';

angular
.module('routerApp')
.service('TagcenterLogin', ['$http',TagcenterLogin])
;
function TagcenterLogin($http){
	
	return {
		get : function(coming_object) {
//		alert(JSON.stringify(coming_object));
			return $http.post('/api/tagcenter_login',coming_object);
		},
//		create : function(coming_object) {
////		alert(JSON.stringify(coming_object));
//			return $http.post('/api/tagcenter_login', coming_object);
//		},
//		delete : function(id) {
//			return $http.delete('/api/tagcenter_login/' + id);
//		}
	}
}

})();