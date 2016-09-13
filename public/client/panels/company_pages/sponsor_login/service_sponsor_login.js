(function () {	'use strict';

angular
.module('routerApp')
.service('SponsorLogin', ['$http',SponsorLogin])
;
function SponsorLogin($http){
	
	return {
		get : function(coming_object) {
			return $http.post('/api/sponsor_login', coming_object);
		},
	}
}

})();