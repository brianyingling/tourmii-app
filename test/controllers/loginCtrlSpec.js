describe('LoginCtrl', function() {
  var $scope, $rootScope, $controller, $httpBackend;
  var loginCtrl;

  beforeEach(module('tourmii.controllers'));
  beforeEach(inject(function($injector){
    $rootScope   = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope       = $rootScope.$new();
    $controller  = $injector.get("$controller");
    loginCtrl    = $controller("LoginCtrl", {'$scope':$scope});
  }));

  it('has a LoginCtrl controller', function() {
      expect(loginCtrl).toBeDefined();
  });

  describe('.submit', function() {
    var resp;
    beforeEach(function() {
      resp = {
          user: {
            tours: [
              {description:'tours'},
              {descrioption:'more tours'}
            ]
          }
        };
      $httpBackend.expectPOST('http://localhost:3000/login')
          .respond(resp);
      $scope.submit();

    });
    it('receives a user obj on successful HTTP request', function() {
        expect($scope.user).toBeDefined();
        $httpBackend.flush();
    });

    it('saves the session id to localStorage on successful HTTP request', function() {
      expect(localStorage['tourmii_session_id']).toBeDefined();
      $httpBackend.flush();
    });

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});