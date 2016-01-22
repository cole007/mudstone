import $ from 'jquery';

var tool = {
	transitionEnd: (function() {
	    var el = document.createElement('div');
	    var transEndEventNames = {
	      WebkitTransition : 'webkitTransitionEnd',
	      MozTransition    : 'transitionend',
	      OTransition      : 'oTransitionEnd otransitionend',
	      transition       : 'transitionend'
	    };
	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return transEndEventNames[name];
	      }
	    }
	    return false;
	})(),

	transform: (function() {
		var el = document.createElement('div');
		var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    
	    for(var i = 0; i < prefixes.length; i++) {
	        if(el && el.style[prefixes[i]] !== undefined) {
	            return prefixes[i];
	        }
	    }
		return false;
	})(),

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

};

export default tool;