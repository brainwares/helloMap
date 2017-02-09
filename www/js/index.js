var map;
document.addEventListener("deviceready", function() {
  var div = document.getElementById("map_canvas");

  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);

  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);

function onMapReady() {
  var button = document.getElementById("button");
  button.addEventListener("click", cari_alamat);
  //alert("Map Ready");
  //$("#geocoder_input").keyup(cari_alamat);
}

function cari_alamat() {
	$("#infobox").val("Masuk sini");
	var request = {
		'address': $("#geocoder_input").val()
	};

	plugin.google.maps.Geocoder.geocode(request, function(results) {
		if (results.length) {
			var result = results[0];
			var position = result.position; 

			map.addMarker({
				'position': position,
				'title':  JSON.stringify(result)
			}, function(marker) {

				map.animateCamera({
					'target': position,
					'zoom': 17
				}, function() {
					marker.showInfoWindow();
				});

			});
		} else {
			alert("Not found");
		}
	});
}
