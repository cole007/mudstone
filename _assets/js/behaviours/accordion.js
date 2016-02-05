import $ from 'jquery';
import Expand from '../helpers/expand';

function accordion(container) {
	var accordion = new Expand({
		wrapper: container,
		button: '.button',
		closeOthers: true,
		activeClass: 'is-active',
		activeContentClass: 'is-active',
		openStart: function() {
			console.log('openStart');
		},
		openComplete: function() {
			console.log('openComplete');
		},
		closeStart: function() {
			console.log('closeStart')
		},
		closeComplete: function() {
			console.log('closeComplete')
		},
	});
};

export default accordion;