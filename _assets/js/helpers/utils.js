import $ from 'jquery';

var utils = {
	lock() {
		var $window = $(window),
			$body = $('body'),
			windowTop;

		return {
			capture() {
				windowTop = $window.scrollTop();
				$body.css({position: 'fixed', height: '100%', top: windowTop * -1 + 'px', overflow: 'hidden', width: '100%'});
			},
			release() {
				$body.css({position: '', height: '', width: '', overflow: '', top: ''});
				$window.scrollTop(windowTop);
			}
		}
	}
}


export default utils;