// import $ from 'jquery';
// store the json


export function lock() {
	const $window = $(window);
	const $body = $('body');

	var windowTop;
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

export function ajax(url) {
	var data = {};
	return $.ajax({
		url: url,
		type: "get",
		data: data
	});
}

