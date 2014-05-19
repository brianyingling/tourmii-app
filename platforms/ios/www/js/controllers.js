angular.module('tourmii.controllers', [])

.controller('LoginCtrl', ['$scope', function($scope) {
  debugger;
  $scope.user = {};
  $scope.user.email = "bob";
}])

.controller('RegisterCtrl', ['$scope', function($scope) {
}]);
