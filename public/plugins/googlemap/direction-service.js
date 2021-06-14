(function(exports) {

    "use strict";

    function initMap() {
      var directionsRenderer = new google.maps.DirectionsRenderer();
      var directionsService = new google.maps.DirectionsService();
      var map = new google.maps.Map(document.getElementById("map"),{
          zoom:14,
          // center: {
          //   lat: latitude,
          //   lng: longitude
          // }
      });

      // var myLatLng = {lat: 37.766, lng: -122.460};
      // var marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: map,
      //   title: 'Transporter!'
      // });

      directionsRenderer.setMap(map);
      calculateAndDisplayRoute(directionsService, directionsRenderer);
      
    }

    function calculateAndDisplayRoute(
      directionsService,
      directionsRenderer
    ) {
      var selectedMode = 'DRIVING';
      directionsService.route(
        {
          origin: pickupLocations,
          // Haight.
          destination: deliverLocations,
          
          travelMode: google.maps.TravelMode[selectedMode]
        },
        function(response, status) {
          if (status == "OK") {
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }

    exports.calculateAndDisplayRoute = calculateAndDisplayRoute;
    exports.initMap = initMap;
  })((this.window = this.window || {}));