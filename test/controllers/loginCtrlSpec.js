describe('LoginCtrl', function() {
  var $scope, $rootScope, $controller, createController;
  var loginCtrl;
  // beforeEach(inject(function($injector) {
  //   $rootScope  = $injector.get('$rootScope');
  //   $scope      = $rootScope.$new();
  //   $controller = $injector.get('$controller');

  //   createController = function() {
  //     return $controller('LoginCtrl', {'$scope':$scope});
  //   };
  // }));

  beforeEach(module('tourmii.controllers'));
  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $controller = $injector.get("$controller");
    loginCtrl = $controller("LoginCtrl", {'$scope':$scope});

  }));

  it('has a LoginCtrl controller', function() {
      // var scope = $rootScope.$new();
      // var ctrl  = $controller('LoginCtrl', {$scope: scope});
      expect(loginCtrl).toBeDefined();

  });

  // it('submits a email as a username', function() {
  //   $scope.user.email === "bob";
  // });

});