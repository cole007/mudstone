// store the json
var content;

const utils = {
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
	},

	

	ajax: function(url) {
		var data = {};
		return $.ajax({
			url: url,
			type: "get",
			data: data
		});
	}
}


export default utils;