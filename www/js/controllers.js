angular.module('tourmii.controllers', [])

.controller('LoginCtrl', function($scope) {
})

.controller('RegisterCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
});
