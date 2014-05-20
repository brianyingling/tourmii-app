angular.module('tourmii.controllers', [])

.controller('LoginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {};
  $scope.errors = [];

  $scope.submit = function(){
    $scope.errors = [];
    $scope.user.email    = $scope.email;
    $scope.user.password = $scope.password;
    $http.post("http://localhost:3000/login", $scope.user)
      .success(function(data) {
        console.log(data);
        localStorage['tourmii_session_id'] = data.user.id;
        $scope.tours = data.user.tours;
      })
      .error(function(data) {
        console.log(data);
        $scope.errors.push(data.error.message);
      });
  };
}])

.controller('RegisterCtrl', ['$scope', function($scope) {
}]);
