describe('RegisterCtrl', function() {

  var $rootScope, $httpBackend, $scope, $controller, registerCtrl;

  beforeEach(module('tourmii.controllers'));

  beforeEach(inject(function($injector) {
    $rootScope   = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope       = $rootScope.$new();
    $controller  = $injector.get('$controller');
    registerCtrl = $controller('RegisterCtrl', {'$scope':$scope});
  }));

  describe('submit', function() {
    var resp;
    beforeEach(function() {
      resp = {
        user: {
          id: 1,
          firstName: 'Bob',
          lastName:  'Bob',
          tours: []
        },
      };
    });

    it('receives a user obj on successful signup', function() {

      $httpBackend.expectPOST('http://localhost:3000/users')
        .respond(resp);
      $scope.submit();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

    });


  });

});