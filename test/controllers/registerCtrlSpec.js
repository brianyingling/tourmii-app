describe('RegisterCtrl', function() {

  var $rootScope, $httpBackend, $scope, $controller, registerCtrl;
  var url   = 'http://localhost:3000/users';
  var store = {};
  var resp = {
        user: {
          id: 1,
          firstName: 'Bob',
          lastName:  'Bob',
          tours: []
        },
      };
  var data = {
        status: "ERROR!",
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

    spyOn(localStorage, 'setItem').andCallFake(function(key, value) {
      return store[key] = value;
    });

  }));

  describe('submit', function() {
    it('receives a user obj on successful signup', function() {
      $httpBackend.expectPOST(url).respond(resp);
      $scope.submit();
      $httpBackend.flush();
    });

    it('receives error messages when signup fails', function() {
      $httpBackend.expectPOST(url).respond(401, data);
        $scope.submit();
        $httpBackend.flush();
        expect($scope.errors).toBeDefined();
    });

    it('assigns the session id as a localStorage parameter', function() {
      $httpBackend.expectPOST(url).respond(resp);
      $scope.status = "ERROR";
      $scope.submit();
      $httpBackend.flush();
      console.log(store);
      console.log(resp.user.id);
      var id = resp.user.id;
      expect(store).toBeDefined();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

});