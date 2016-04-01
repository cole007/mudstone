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

	firstSegment() {
		return window.location.pathname.replace(/^\/([^\/]*).*$/, '$1').split('.')[0];
	},

	segmentCount() {
		return window.location.pathname.split('/').length - 1;
	},

	whatUrl() {
		var firstSegment = utils.firstSegment();
		return firstSegment != '' ? firstSegment : 'index';
	},

	// returns a function containing the data from an ajax request
	// only makes ajax request if no content is cache
	json: function(fn) {
		if(content === undefined) {
			$.getJSON( '/content.json').done(function( data ) {
				fn(data);
				content = data;
			});
		} else {
			fn(content);
		}
	},

	segment1s(string) {
		var urls = Object.keys(this.json);
		var result = false;
		urls.forEach((element) => {
			if(element === string) {
				result = true;
			}
		});

		return result;
	},

	getHourAngle(currentTime) {
		var hour = currentTime.getHours(),
			mins = currentTime.getMinutes() / 60,
			hour = hour > 12 ? (hour - 12 + mins) * 30 : (hour + mins) * 30;
			return hour;
	},

	getMinuteAngle(currentTime) {
		return currentTime.getMinutes() * 6;
	},

	rando(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
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