import $ from 'jquery';
import expand from '../helpers/expand';

function accordion(container) {
	var accordion = expand({
		wrapper: container,
		button: '.button',
		closeOthers: false,
		openStart: function() {},
		openEnd: function() {},
		closeStart: function() {},
		closeEnd: function() {},
	});
};

export default accordion;