describe('SearchCtrl', function() {
  var $injector, $rootScope, $scope, $controller, searchCtrl;

  beforeEach(module('tourmii'));

  beforeEach(inject(function(_$injector_) {
    $injector   = _$injector_;
    $controller = $injector.get('$controller');
    $rootScope  = $injector.get('$rootScope');
    $scope      = $rootScope.$new();
    searchCtrl  = $controller('SearchCtrl', {'$scope':$scope});
  }));

  it('has a SearchCtrl', function() {
    expect(searchCtrl).toBeDefined();
  });

});