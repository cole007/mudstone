import $ from 'jquery';
import prefix from '../helpers/prefix';

var transition = {

	transitionEnd(el, func) {
		function onEnd(e) {
			if(typeof func == 'function') {
				func();
			}
		}
		el.one(prefix.transitionEnd, onEnd);
	},


	animateInAnimdateOut(options) {
		var _this = this, 
			el = options.el;

		function open() {
			_this.transitionEnd($(el), () => {
				if(typeof options.openComplete === 'function') {
					
					options.openComplete();
				}
			});
		}

		function close() {
			_this.transitionEnd($(el), () => {
				if(typeof options.closeComplete === 'function') {
					options.closeComplete();
				}
			});
		};

		if(!$(el).hasClass('is-active')) {
			if(typeof options.openStart === 'function') {
				options.openStart();
			}
			console.log('a');
			open();	
		}
		else {
			if(typeof options.closeStart === 'function') {
				options.closeStart();
			}
			close();
		}
	}
}


export default transition;

