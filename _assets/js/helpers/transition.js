import prefix from '../helpers/prefix';

function Transition(opts) {
	this.el = opts.el;
	this.activeClass = opts.activeClass;
	// callbacks
	this.openStart = opts.openStart;
	this.openComplete = opts.openComplete;
	this.closeStart = opts.closeStart;
	this.closeComplete = opts.closeComplete;
	var _this = this;

	// transition end event
	function transitionEnd(el, fn) {
		el.one(prefix.transitionEnd, function(e) {
			if(typeof fn == 'function') {
				fn();
			}
		});
	};
	// Complete callback wrapper
	function action(fn) {
		transitionEnd($(opts.el), () => {
			if(typeof fn === 'function') {
				fn();
			}
		});
	};
	// method to call on 'event'
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

export default Transition;

