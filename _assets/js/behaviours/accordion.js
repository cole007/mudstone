import Expand from '../helpers/expand';
import $ from 'jquery';

function accordion(container) {
	console.log('e');
	var accordion = new Expand({
		wrapper: container,
		button: '.button',
		closeOthers: true,
		activeClass: 'is-active',
		activeContentClass: 'is-active',
		openStart: function() {},
		openComplete: function() {},
		closeStart: function() {},
		closeComplete: function() {}
	});
};

export default accordion;