(function () {	'use strict';

angular
.module('routerApp')
.config(routs_company_pages)
;
routs_company_pages.$inject = ['$stateProvider', '$urlRouterProvider','tutorials_chapterProvider'];
function routs_company_pages($stateProvider, $urlRouterProvider,tutorials_chapterProvider) {
	var chapters = 
		[
		 	{chapter_name : 'my_demo',display_name:'Demo'},
		 	{chapter_name : 'sponsor_dashboard'},
			{chapter_name : 'tag_center_login'},
			{chapter_name : 'tag_center_dashboard'},
			{chapter_name : 'sponsor_login'},
			{chapter_name : 'sponsor_videos'},
			{chapter_name : 'sponsor_upload_logo'},
			{chapter_name : 'sponsor_upload_advertisement'},
			{chapter_name : 'sponsor_upload_document'},
			{chapter_name : 'sponsor_uploaded_logo'},
			{chapter_name : 'sponsor_uploaded_advertisement'},
			{chapter_name : 'sponsor_uploaded_documents'},
			{chapter_name : 'session_demo'},
			{chapter_name : 'onsite_login'},
			{chapter_name : 'onsite_dashboard'},
			{chapter_name : 'onsite_upload_video'},
			{chapter_name : 'onsite_uploaded_video'},
        ];
	tutorials_chapterProvider.setType(chapters);
	
	var common_path = 'client/panels/company_pages/';
	$stateProvider.state('tag_center_tagvideo_form',{
	      url: "/tag_center_tagvideo_form",
	      params: { 
				video_object : null 
			},
	      templateUrl: 'client/panels/company_pages/tag_center_tagvideo_form/tag_center_tagvideo_form.ng.html',
	      controller:'controller_tag_center_tagvideo_form',
	})
	
	angular.forEach(chapters, function(key, value){
        var chap_name = key.chapter_name;
        var state =
        	[
		        {
				      url: "/" + chap_name,
				      templateUrl: common_path + chap_name + "/" + chap_name + ".ng.html",
				},
		     ];
        	$stateProvider.state(chap_name,state[0])
    });
	  $urlRouterProvider.otherwise("/sponsor_login");
}

})();