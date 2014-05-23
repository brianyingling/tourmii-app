describe('toursServiceSpec', function() {
  var $injector, $httpBackend, toursService;

  beforeEach(module('tourmii'));
  beforeEach(module('tourmii.services'));
  beforeEach(inject(function(_$injector_) {
    $injector    = _$injector_;
    $httpBackend = $injector.get('$httpBackend');
    toursService = $injector.get('toursService');
    toursService.setTours(tours);
  }));

  var tours = [
    {
      description:'blah',
      id:7,
      lat:40.3498779,
      lng:-74.6590076,
      name:'new ghost tours',
      steps: [
        {
          address:'116 Nassau Street, Princeton, NJ, United States',
          id:22,
          lat:40.3523181,
          lng:-74.6509184,
          name:'Princeton Tour Company',
          position: 1,
          reference:"CoQBdAAAAGOkriTuXLLlNDUbQNnMDB9lORvLUD-he0B5yg4ivgniUQc_2EovHss8DMZ1aWzWGE_0IclQh3-_TKAQVNotLdFgiPZHEZjUcvzquBATDQ9M0NjBf1VyHHpNO2zwMVQnlHq6eG6N_SOLzW0qVaKPpeXhg5DJBMV7UzrbbhZfhQulEhDjy96m2QJYjonzUIKxucsTGhSZfiuUwSBphGjtQc4eXXZwHZSiag",
          tour_id:7
        },
        {
          address:"627 Cookman Avenue, Asbury Park, NJ, United States",
          id:22,
          lat:40.3523181,
          lng:-74.6509184,
          name:'Paranormal Books and Curiosities',
          position: 2,
          reference:"CoQBfQAAAGzwrxJr3MN8bBw8xWrYS2xx4Qea5ps0l2MVZ6X1J2rT2iFY9vegiesXC7G8sxA1PM6fFk4olDFaqLNUvkfw90QkZLUI5w5JsGmfVU2n9XC4PW96uSfMULESa8K3Zt7kDxAxc1NSYgaYjjqEr94VEbCFOY9UtchsIxCASwPOTtALEhA9PucNJNbu4ZWZPU3ucgmGGhSAdmCZ7vUuZnQQG6zInHxy6Jj-uw",
          tour_id:7
        }
      ]
    },
    {}
  ];

  describe('setTours', function() {
    it('sets the tours to the toursService object', function() {
      expect(toursService.getTours()).toBeDefined();
      expect(toursService.getTours()).toBe(tours);
    });
  });

  describe('getTours', function() {
    it('gets all the tours for a user', function() {
      expect(toursService.getTours()).toBe(tours);
    });
  });

  describe('getTour', function() {
    it('returns a specific tour based on ID', function() {
      expect(toursService.getTour(7)).toBeDefined();
    });
    it('does not return a tour if it cant find one', function() {
      expect(toursService.getTour(100)).not.toBeDefined();
    });
  });

  describe('getStep', function() {
    it('returns a step of a given tour', function() {
      var tour = toursService.getTour(7);
      var step = toursService.getStep(tour, 22);
      expect(step).toBeDefined();
    });
    it('does not return a step if it cant find one', function() {
      var tour = toursService.getTour(7);
      var step = toursService.getStep(tour, 100);
      expect(step).not.toBeDefined();
    });
  });

});