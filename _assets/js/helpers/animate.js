import $ from 'jquery';
import prefix from '../helpers/prefix';

var animate = {

	animateIn(el, func, activeClassName = 'is-active', animateClassName = 'is-animating-in') {
		function onEnd(e) {
			el.removeClass(animateClassName);
			if(typeof func == 'function') {
				func();
			}
		}
		el.addClass(`${animateClassName} ${activeClassName}`).one(this.transitionEnd, onEnd);
	},

	animateOut(el, func, activeClassName = 'is-active', animateClassName = 'is-animating-out') {
		function onEnd(e) {
			el.removeClass(animateClassName);
			if(typeof func == 'function') {
				func();
			}
		}
		el.addClass(animateClassName).removeClass(activeClassName).one(this.transitionEnd, onEnd);
	},

	animateInAnimdateOut(options) {

		var _this = this, 
			el = options.el;

		function open() {
			_this.animateIn($(el), () => {
				if(typeof options.openComplete === 'function') {
					options.openComplete();
				}
			});
		}

		function close() {
			_this.animateOut($(el), () => {
				if(typeof options.closeComplete === 'function') {
					options.closeComplete();
				}
			});
		};

		if(!$(el).hasClass('is-active')) {
			if(typeof options.openStart === 'function') {
				options.openStart();
			}
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


export default animate;

