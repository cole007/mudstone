// https://github.com/Carrooi/Js-GoogleMapsLoader
// https://developers.google.com/maps/documentation/javascript/
import GoogleMapsLoader from 'google-maps';

const KEY = 'AIzaSyBIwGoEP0hq627k4tsloqVDpCdjpH9sQxU';

function map(container) {

	this.update();
	this.add('map');

	GoogleMapsLoader.load(function(google){
		var marker;
		// must be loaded after google maps
		const infoBoxLib = require('google-maps-infobox');
		const infoboxOptions = {
               content: '<h1>Hello</h1>',
               disableAutoPan: false,
               maxWidth: 0,
               pixelOffset: new google.maps.Size(30, 20),
               zIndex: null,
               closeBoxMargin: "10px 10px 10px 0px",
               closeBoxURL: "/_assets/images/cross.png",
               infoBoxClearance: new google.maps.Size(1, 1),
               isHidden: false,
               pane: "floatPane",
               enableEventPropagation: false,
               alignBottom: true
            }

        


		GoogleMapsLoader.KEY = KEY;
		var location = new google.maps.LatLng(51.385892,-2.361695),
			mapOptions = {
				zoom: 16,
				center: location,
				styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				panControl: false,
				zoomControl: true,
				scaleControl: false,
				mapTypeControl: true,
				streetViewControl: false,
				scrollwheel: false,
				draggable: true,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_RIGHT
				}
			},
			map = map || new google.maps.Map(document.getElementById("map"), mapOptions);


	    function drop() {
	        setTimeout(addMarker, 200);
	    }
	    function addMarker() {
			var icon = new google.maps.MarkerImage("/_assets/images/map_marker.png");
			var marker = new google.maps.Marker({
				position: location,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				icon:icon
			});

		    google.maps.event.addListener(marker, 'click', function(){
	           	const infoBox = new infoBoxLib(infoboxOptions);
	            // if($('.infoBox').length > 0) {
	            //   $('.infoBox:eq(0)').remove();
	            // }
	            // update the center position
	            map.panTo(marker.getPosition());
	            // adjust the position vertically
	            map.panBy(0,0);
	            // open the infoBox
	            infoBox.open(map, this);
	        });
	    }
	    // drop icon
	    drop();
	});
};


export default map;