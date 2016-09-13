(function () {	'use strict';

angular
.module('routerApp')
.service('TagcenterDashboard', ['$http',TagcenterDashboard])
;
function TagcenterDashboard($http){
	
	return {
		get : function() {
			return $http.get('/api/tagcenter_dashboard');
		},
		create : function(coming_object) {
			return $http.post('/api/tagcenter_dashboard', coming_object);
		},
	}
}

})();