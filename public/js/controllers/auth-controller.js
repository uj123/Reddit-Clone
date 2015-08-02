app.controller('authCtrl',['$scope','$http','$routeParams','$location','AuthService' ,
	function($scope,$http,$routeParams,$location,AuthService){
    $scope.user = {};
    if(AuthService.isLoggedIn()){
      $location.path('/posts');
    }

    $scope.register = function(){
        AuthService.register($scope.user).error(function(error){
          $scope.error = error;
        }).then(function(){
          $location.path('/posts');
        });
    }

    $scope.logIn = function(){
      AuthService.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $location.path('/posts');
      });
    }
  }]);
