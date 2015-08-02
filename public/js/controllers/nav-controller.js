app.controller('NavCtrl', ['$scope','AuthService',
  function($scope, AuthService){
    $scope.isLoggedIn = AuthService.isLoggedIn;
    $scope.currentUser = AuthService.currentUser;
    $scope.logOut = AuthService.logOut;
  }]);
