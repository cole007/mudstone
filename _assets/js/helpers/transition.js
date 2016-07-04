// import $ from 'jquery';
import { transitionEnd } from '../helpers/prefix';

export default function Transition(opts) {
	this.el = opts.el;
	this.activeClass = opts.activeClass;
	// callbacks
	this.openStart = opts.openStart;
	this.openComplete = opts.openComplete;
	this.closeStart = opts.closeStart;
	this.closeComplete = opts.closeComplete;
	var _this = this;

	// transition end event
	function _transitionEnd(el, fn) {
		el.one(transitionEnd, function(e) {
			if(typeof fn == 'function') {
				fn();
			}
		});
	};
	// Complete callback wrapper
	function action(fn) {
		_transitionEnd($(opts.el), () => {
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
			if(typeof this.openComplete === 'function') {
				action(this.openComplete.bind(this));	
			}
		}
		else {
			if(typeof this.closeStart === 'function') {
				this.closeStart();
			}
			if(typeof this.closeComplete === 'function'){
				action(this.closeComplete.bind(this));	
				this.modalClosed.call(this);
			}
		}
	}

	this.modalClosed = function() {}

	this.destroy = function() {
		if(typeof this.closeStart === 'function') {
			this.closeStart();
		}
		if(typeof this.closeComplete === 'function'){
			action(this.closeComplete.bind(this));	
		}
	}
};

