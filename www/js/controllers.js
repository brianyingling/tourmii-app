angular.module('tourmii.controllers', [])

.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.user = {};

  $scope.submit = function(){
    $scope.user.email    = $scope.email;
    $scope.user.password = $scope.password;
    delete $http.defaults.headers.common["X-Requested-With"];
    $http.post("http://localhost:3000/login", $scope.user)
      .success(function(data) {
        // data is the user object with all of his/her tours
        $scope.tours = data.user.tours;
        console.log(data);
      })
      .failure(function(data) {
        debugger;
        console.log(data);
      });
  };


}])

.controller('RegisterCtrl', ['$scope', function($scope) {
}]);
