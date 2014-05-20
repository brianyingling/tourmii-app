describe('RegisterCtrl', function() {

  var $rootScope, $httpBackend, $scope, $controller, registerCtrl;
  var url = 'http://localhost:3000/users';
  var resp = {
        user: {
          id: 1,
          firstName: 'Bob',
          lastName:  'Bob',
          tours: []
        },
      };
  var data = {
        error: {
          messages: {
            email: "has already been taken"
          }
        }
      };


  beforeEach(module('tourmii.controllers'));

  beforeEach(inject(function($injector) {
    $rootScope   = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope       = $rootScope.$new();
    $controller  = $injector.get('$controller');
    registerCtrl = $controller('RegisterCtrl', {'$scope':$scope});
  }));

  describe('submit', function() {
    it('receives a user obj on successful signup', function() {
      $httpBackend.expectPOST(url)
        .respond(resp);
      $scope.submit();
      $httpBackend.flush();
    });

    it('receives error messages when signup fails', function() {
      $httpBackend.expectPOST(url).respond(data);
        $scope.submit();
        $httpBackend.flush();
        expect($scope.errors).toBeDefined();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

});