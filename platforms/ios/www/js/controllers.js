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
        $state.go('tours');
      })
      .error(function(data) {
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
.controller('ToursCtrl', ['$scope', '$state', 'getThumbnails','toursService', function($scope, $state, getThumbnails, toursService) {
  var thumbnailUrls = [];
  $scope.tours = toursService.getTours();

  // getting the thumbnails to the tours list
  _.each(getThumbnails, function(thumbnail) {
    if (thumbnail !== undefined) {
      thumbnail.then(function(result) {
        if (result === null || result.photos === undefined) {
          thumbnailUrls.push("");
        } else {
          thumbnailUrls.push(result.photos[0].getUrl({maxWidth:50,maxHeight:50}));
        }
        $scope.thumbnailUrls = thumbnailUrls;
      });
    }
  });

  _.map($scope.tours, function(tour) {
    _.each($scope.thumbnailUrls, function(url) {
      tour.photoUrl = url;
    });
  });

  $scope.viewTour = function(id) {
    $state.go('tour-detail', {tourId:id});
  };
}])

.controller('TourDetailCtrl', ['$scope','$state','$stateParams','toursService',
  function($scope, $state, $stateParams, toursService) {
  var tourId      = $stateParams.tourId;
  $scope.tour = toursService.getTour(tourId);

  $scope.viewStep = function(stepId) {
    $state.go('step', {stepId:stepId, tourId:tourId});
  };
}])

// Shows the details of a step in a tour
.controller('StepCtrl', ['$scope', 'getDetails', function($scope, getDetails) {
  $scope.step        = getDetails;
  $scope.photoUrls   = [];

  for (var i=0;i<$scope.step.photos.length;i++) {
    var url = $scope.step.photos[i].getUrl({maxWidth:350,maxHeight:350});
    $scope.photoUrls.push(url);
  }

}])

// handles search
.controller('SearchCtrl', ['$scope','googlePlacesService', function($scope, googlePlacesService) {
  $scope.places = [];

  $scope.map = {
    center: {
      latitude: 40.859239040,
      longitude: -74.437774074
    }
  };

  $scope.submit = function() {
    var res = googlePlacesService.search($scope.query);
    res.then(function(res){
      $scope.places = res;
    });
  };

}]);
