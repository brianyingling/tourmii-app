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
    }
  };
})

.service('googlePlacesService', ['$http', function($http) {
  var GOOGLE_PLACES_API_KEY = "AIzaSyCvzuNHRQq5SRJZnyqPJ6c5nMzyeDm2kU0";
  return {
    getPlaceDetails: function(ref) {
      var url = "https://maps.googleapis.com/maps/api/place/details/json?"+
                "reference="+ref+
                "&sensor=true"+
                "&key="+GOOGLE_PLACES_API_KEY;

      var data;
      $http.get(url)
        .success(function(resp) {
          data = resp;
        })
        .error(function(resp) {
          data = resp;
        });

        return resp;
    }
  };
}]);
