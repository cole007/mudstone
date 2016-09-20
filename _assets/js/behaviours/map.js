// https://github.com/Carrooi/Js-GoogleMapsLoader
// https://developers.google.com/maps/documentation/javascript/
import GoogleMapsLoader from 'google-maps';

const KEY = 'AIzaSyBIwGoEP0hq627k4tsloqVDpCdjpH9sQxU';

function map(container) {

	const $container = $(container);
	const lat = parseFloat($container.data('latitude'));
	const lng = parseFloat($container.data('longitude'));

	GoogleMapsLoader.KEY = KEY;	
	GoogleMapsLoader.load(function(google){
		const position = {lat, lng};
		const options = {
			position,
			pov: {
			  heading: 34,
			  pitch: 10
			}
		}
		const panorama = new google.maps.StreetViewPanorama(document.getElementById('map'), options);
	})
};


export default map;