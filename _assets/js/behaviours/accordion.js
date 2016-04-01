// import the Expand module
// Paths are relative to the root, so we need to go up a level
import Expand from '../helpers/expand';
import Viewport from '../helpers/viewport';

// This function will be used as a data-behaviour method
// so we can pass in container
function accordion(container) {
	var viewport = new Viewport();
	var accordion = new Expand({
		wrapper: container,
		button: '.button',
		closeOthers: true,
		activeClass: 'is-active',
		activeContentClass: 'is-active',
		openStart: function() {},
		openComplete: function() {},
		closeStart: function() {},
		closeComplete: function() {},
	});


	viewport.change(function() {
		if(this.width > 1024) {
			accordion.destroy();
		}
		if(this.width < 1024) {
			accordion.init();
		}
	});
};

// this file only contains one function 
// so export it as the default
export default accordion;