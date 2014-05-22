var app = angular.module('tourmii', [
  'ionic',
  'tourmii.controllers',
  'tourmii.services'])
.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider','$urlRouterProvider', '$httpProvider','$locationProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: 'templates/tab-login.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('tab.register', {
      url: '/register',
      views: {
        'tab-register': {
          templateUrl: 'templates/tab-register.html',
          controller: 'RegisterCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('tours', {
      url: '/tours',
      templateUrl:'templates/tours.html',
      controller: 'ToursCtrl'
    })

    .state('tour-detail', {
      url: '/tours/:tourId/detail',
      templateUrl: 'templates/tour-detail.html',
      controller: 'TourDetailCtrl'
    })

    .state('step', {
      url: '/tours/:tourId/steps/:stepId',
      templateUrl:'templates/step.html',
      resolve: {
        getDetails: function($stateParams, googlePlacesService, toursService) {
          var tour = toursService.getTour($stateParams.tourId);
          var step = toursService.getStep(tour, $stateParams.stepId);
          debugger;
          return googlePlacesService.getPlaceDetails(step.reference, function(place) {
            debugger;
            return place;
          });
        }
      },
      controller:'StepCtrl'

    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

  // # Without server side support html5 must be disabled.
  $locationProvider.html5Mode(false);


}]);

