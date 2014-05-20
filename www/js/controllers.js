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
        $location.path("/tab/register");
      })
      .error(function(data) {
        console.log(data);
        $scope.errors.push(data.error.message);
      });
  };
}])

.controller('RegisterCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
  $scope.user   = {};
  $scope.errors = [];

  $scope.submit = function() {
    $http.post("http://localhost:3000/users", {user:$scope.user})
      .success(function(data) {
        $scope.user = data;
        console.log("id",data.user.id);
        localStorage.setItem('tourmii_session_id', data.user.id);
        $location.path('/tours');
        console.log(data);
      })
      .error(function(data) {
        errors = [];
        for(var name in data.error.messages) {
          error = name + ' ' + data.error.messages[name];
          errors.push(error);
        }
        $scope.errors = errors;
        console.log(data);
      });
  };


}]);
