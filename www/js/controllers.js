angular.module('tourmii.controllers', [])

.controller('LoginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
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
        $state.go('tours');
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
  var self = this;

  $scope.submit = function() {
    if (self.validate()) {
      $http.post("http://localhost:3000/users", {user:$scope.user})
        .success(function(data) {
          $scope.user = data;
          localStorage.setItem('tourmii_session_id', data.user.id);
          $location.path('/tours');
        })
        .error(function(data) {
          errors = [];
          for(var name in data.error.messages) {
            error = name + ' ' + data.error.messages[name];
            errors.push(error);
          }
          $scope.errors = errors;
        });
    } else {
      $scope.errors = [];
      $scope.errors.push('Password and confirm password do not match');
    }
  };

  this.validate = function() {
    return $scope.user.password === $scope.user.password_confirmation;
  };
}])

// TODO - handle list of user's tours
.controller('ToursCtrl', ['$scope', function($scope) {

}]);
