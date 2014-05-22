angular.module('tourmii.controllers', [])

.controller('LoginCtrl', ['$scope', '$http', '$state', 'toursService',
  function($scope, $http, $state, toursService) {
  $scope.user = {};
  $scope.errors = [];

  $scope.submit = function(){
    $scope.errors = [];
    $scope.user.email    = $scope.email;
    $scope.user.password = $scope.password;
    $http.post("http://localhost:3000/login", $scope.user)
      .success(function(data) {
        localStorage['tourmii_session_id'] = data.id;
        toursService.setTours(data.tours);
        console.log(toursService);
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
          var errors = [];
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
.controller('ToursCtrl', ['$scope', '$state', 'toursService', function($scope, $state, toursService) {
  $scope.tours    = toursService.getTours();
  $scope.viewTour = function(id) {
    $state.go('tour-detail', {tourId:id});
  }
}])

.controller('TourDetailCtrl', ['$scope','$state','$stateParams','toursService',
  function($scope, $state, $stateParams, toursService) {
  var tourId      = $stateParams.tourId;
  $scope.tour = toursService.getTour(tourId);

  $scope.viewStep = function(stepId) {
    $state.go('step', {stepId:stepId, tourId:tourId})
  }
}])

// Shows the details of a step in a tour
.controller('StepCtrl', ['$scope', '$stateParams', 'getDetails','toursService','googlePlacesService',
  function($scope, $stateParams, getDetails, toursService, googlePlacesService) {
  var tourId, stepId, tour, step, details;
  var place = getDetails;
  debugger;

  $scope.stepDetails = place;
  $scope.reviews = place.reviews;
  // tourId = $stateParams.tourId;
  // stepId = $stateParams.stepId;

  // tour = toursService.getTour(tourId);
  // step = toursService.getStep(tour, stepId);

  // $scope.step = step;

  // googlePlacesService.getPlaceDetails(step.reference, function(place) {
  //   $scope.stepDetails = place;
  //   $scope.reviews = place.reviews;
  // });


}]);
