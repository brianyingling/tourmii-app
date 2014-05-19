describe('LoginCtrl', function() {
  var $scope, $rootScope, createController;
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
  beforeEach(inject(function($controller){
    loginCtrl = $controller("LoginCtrl");

  }));

  it('has a LoginCtrl controller', function() {
      var scope = $rootScope.$new();
      var ctrl  = $controller('LoginCtrl', {$scope: scope});
      expect(createController()).toBeDefined();

  });

  // it('submits a email as a username', function() {
  //   $scope.user.email === "bob";
  // });

});