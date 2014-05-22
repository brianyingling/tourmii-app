angular.module('tourmii.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
})

.service('toursService', function() {
  var tours;
  return {
    setTours: function(ts) {
      tours = ts;
    },
    getTours: function() {
      return tours;
    },
    getTour: function(id) {
      return _.where(tours, {id: parseInt(id,10)})[0];
    },
    getStep: function(tour, stepId) {
      return _.where(tour.steps, {id:parseInt(stepId,10)})[0];
    }
  };
})

.service('googlePlacesService', ['$http', function($http) {
  var GOOGLE_PLACES_API_KEY = "AIzaSyCvzuNHRQq5SRJZnyqPJ6c5nMzyeDm2kU0";
  var map     = new google.maps.Map(document.getElementById('map'));
  var service = new google.maps.places.PlacesService(map, {
    center: new google.maps.LatLng(40.859239040, -74.437774074),
    zoom: 15
  });

  return {
    getPlaceDetails: function(ref, callback) {
      var request = {reference:ref};
      service.getDetails(request, function(place, status) {
        callback(place);
      });
    }
  };
}]);
