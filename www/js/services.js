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
.factory('googleMap', function(){
    return {
      createMap: function(element, options){
        return new google.maps.Map(element, options);
      },
      position: function(location){
        return new google.maps.LatLng(location.latitude, location.longitude);
      },
      geocode: function(search, successFun){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(search, successFun);
      },
      bounds: function(){
        return new google.maps.LatLngBounds();
      },
      placesService: function(map, lat, lng, zoom) {
        return new google.maps.places.PlacesService(map, {
          center: new google.maps.LatLng(lat, lng),
          zoom:   zoom
        });
      },
      mapOptions: {
          animation: google.maps.MapTypeId.DROP,
          maxZoom: 15,
          mapTypeControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM,
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
          }
      },
      markerOptions:{
          animation: google.maps.Animation.DROP,
          clickable: true
      }
    };
})
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&sensor=false&key=AIzaSyCvzuNHRQq5SRJZnyqPJ6c5nMzyeDm2kU0
.service('googlePlacesService', ['$q', '$http', 'googleMap', function($q, $http, googleMap) {
  var GOOGLE_PLACES_API_KEY = "AIzaSyCvzuNHRQq5SRJZnyqPJ6c5nMzyeDm2kU0";
  var map      = googleMap.createMap(document.getElementById('map'), googleMap.mapOptions);
  var service  = googleMap.placesService(map, 40.859239040, -74.437774074, 15);
  debugger;
  var sanitize = function(query) {
    return query.replace(' ', '+');
  };

  return {
    getPlaceDetails: function(ref) {
      var request  = {reference:ref};
      var deferred = $q.defer();
      service.getDetails(request, function(place, status) {
        deferred.resolve(place);
      });
      return deferred.promise;
    },

    search: function(query) {
      var req, resp, deferred;

      deferred = $q.defer();
      req = {
        // hardcoded -- dynamic coords will be added later.
        location: new google.maps.LatLng(40.859239040, -74.437774074),
        radius:   '500',
        query:    sanitize(query)
      };

      service.textSearch(req, function(results, status) {
        deferred.resolve(results);
      });
      return deferred.promise;
    }
  };
}]);
