angular.module('tourmii.controllers', [])

.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.user = {};

  $scope.submit = function(){
    $scope.user.email    = $scope.email;
    $scope.user.password = $scope.password;
    $http.post("http://localhost:3000/login", $scope.user)
      .success(function(data) {
        // data is the user object with all of his/her tours
        // debugger;
        localStorage['tourmii_session_id'] = data.user.id;

        $scope.tours = data.user.tours;
        console.log(data);
      })
      .error(function(data) {
        // debugger;
        console.log(data);
      });
  };


}])

.controller('RegisterCtrl', ['$scope', function($scope) {
}]);
