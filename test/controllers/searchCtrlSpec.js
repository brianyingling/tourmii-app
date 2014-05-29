describe('SearchCtrl', function() {
  var $injector, $rootScope, $scope, $httpBackend, $controller, searchCtrl, googlePlacesService;

  beforeEach(module('tourmii'));

  beforeEach(inject(function(_$injector_, _$httpBackend_) {
    // mock out 'map' because its not on the test page
    spyOn(document, 'getElementById').andReturn(document.createElement('div').id = 'map');

    // rest of the necessary variables
    $injector           = _$injector_;
    $httpBackend        = _$httpBackend_;
    $controller         = $injector.get('$controller');
    $rootScope          = $injector.get('$rootScope');
    $scope              = $rootScope.$new();
    searchCtrl          = $controller('SearchCtrl', {'$scope':$scope});
    googlePlacesService = $injector.get('googlePlacesService');
  }));

  it('has a SearchCtrl', function() {
    expect(searchCtrl).toBeDefined();
  });

  describe('.search', function() {
    it('queries the GooglePlacesService service when submitting a search', function() {
      // expect(googlePlacesService.search()).toHaveBeenCalled();
    });
  });

  // it receives a search query
  // it queries Google Places with that search
  // it takes the results and spits them out in a list form
  //

});