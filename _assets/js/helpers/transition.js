import $ from 'jquery';
import prefix from '../helpers/prefix';


function Transition(opts) {
	this.el = opts.el;
	this.activeClass = 'is-active';
	// callbacks
	this.openStart = opts.openStart;
	this.openComplete = opts.openComplete;
	this.closeStart = opts.closeStart;
	this.closeComplete = opts.closeComplete;
	var _this = this;

	function transitionEnd(el, fn) {
		function onEnd(e) {
			if(typeof fn == 'function') {
				fn();
			}
		}
		el.one(prefix.transitionEnd, onEnd);
	};

	function action(fn) {
		transitionEnd($(opts.el), () => {
			if(typeof fn === 'function') {
				fn();
			}
		});
	};

	this.trigger = function() {
		if(!$(opts.el).hasClass(this.activeClass)) {
			if(typeof this.openStart === 'function') {
				this.openStart();
			}
			action(this.openComplete.bind(this));	
		}
		else {
			if(typeof this.closeStart === 'function') {
				this.closeStart();
			}
			action(this.closeComplete.bind(this));	
		}
	}


};



// var transition = {

// 	transitionEnd(el, func) {
// 		function onEnd(e) {
// 			if(typeof func == 'function') {
// 				func();
// 			}
// 		}
// 		el.one(prefix.transitionEnd, onEnd);
// 	},


// 	transitionInOut(options) {
// 		var _this = this, 
// 			el = options.el;

// 		function action(fn) {
// 			_this.transitionEnd($(el), () => {
// 				if(typeof fn === 'function') {
// 					fn();
// 				}
// 			});
// 		}

// 		if(!$(el).hasClass('is-active')) {
// 			if(typeof options.openStart === 'function') {
// 				options.openStart();
// 			}
// 			action(options.openComplete);	
// 		}
// 		else {
// 			if(typeof options.closeStart === 'function') {
// 				options.closeStart();
// 			}
// 			close(options.openComplete);	
// 		}
// 	}
// }


export default Transition;

