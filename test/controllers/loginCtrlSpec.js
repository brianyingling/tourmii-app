describe('LoginCtrl', function() {
  var $scope, $rootScope, $controller, createController;

  beforeEach(inject(function($injector) {
    $rootScope  = $injector.get('$rootScope');
    $scope      = $rootScope.$new();
    $controller = $injector.get('$controller');

    createController = function() {
      return $controller('LoginCtrl', {'$scope':$scope});
    };

  }));

});