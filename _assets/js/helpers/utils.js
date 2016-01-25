import $ from 'jquery';

var utils = {
	lock() {
		var $window = $(window),
			windowTop;

		return {
			capture() {
				windowTop = $window.scrollTop();
			},
			release() {
				$window.scrollTop(windowTop);
				console.log('a');
			}
		}
	}
}


export default utils;