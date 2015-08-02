var app = angular.module('redditClone',['ngRoute']);
app.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when("/register",{templateUrl: "views/register.html", controller: "authCtrl"})
		.when("/login",{templateUrl: "views/login.html", controller: "authCtrl"})
		.when("/posts",{templateUrl: "views/posts.html" ,controller: "postCtrl"})
		.when("/comments/:id",{templateUrl: "views/comments.html" ,controller: "commentCtrl"});
}]);

app.controller('mainCtrl',function(){});
