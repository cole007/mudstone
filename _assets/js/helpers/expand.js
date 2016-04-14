import Tweezer from 'tweezer.js';
import config from '../dependencies/config';

/* 
Example Usage 
Javascript:  
var accordion = new Expand({
	wrapper: '.js-accordion',
	button: '.button',
	closeOthers: false,
	activeClass: '.is-active',
	duration: 1000,
	openStart: function(el, target) {
		console.log('openStart callback');
		console.log('this', this, 'el', el, 'target', target);
	},
	openComplete: function(el, target) {
		console.log('openComplete callback');
		console.log('this', this, 'el', el, 'target', target);
	},
	closeStart: function(el, target) {
		console.log('closeStart callback')
		console.log('this', this, 'el', el, 'target', target);
	},
	closeComplete: function(el, target) {
		console.log('closeComplete callback')
		console.log('this', this, 'el', el, 'target', target);
	},
	onTick: function(v, el, target) {
		console.log('this', this, 'v', v, el', el, 'target', target);
	
	}
});
// remove the click events
accordion.unbind();
// remove styles applied by the accordion
accordion.removeStyles();
// remove classes applied by the accordion
accordion.removeClasses();
// unbind, removeStyles. removeClasses
accordion.destroy();
// set new accordion options
accordion.setOptions($.extend({}, defaults, desktopOptions));
// kick off
accordion.init();
// change the state of an accordion
accordion.tween($('.button')) // this will/open close the selected element
accordion.close(); // will close all accordions
Html: 
<!-- data-target string or href must match the target elements id -->
<div class="js-accordion">
	<button data-target="#c1" class="button">1</button>
	<div id="c1" class="accordion__content"></div>
	<button data-target="#c2" class="button">1</button>
	<div id="c2" class="accordion__content"></div>
</div>
SCSS:
.accordion__content {
	display: none;
	&.is-active {
		display: block;
	}
}
*/
function Expand(opts) {
	// setup some default, 
	// these will be used for missing opts
	var defaults = {
		wrapper: $('.js-accordion'),
		button: '.button',
		closeOthers: false,
		activeClass: 'is-active',
		activeContentClass: 'is-active',
		duration: 800,
		autoInitialize: true
	};

	// the options
	this.options = {
		// API
		$wrapper: opts.wrapper || defaults.wrapper, // jquery object
		button: opts.button || defaults.button, // css selector
		closeOthers: opts.closeOthers || defaults.closeOthers, // boolean
		activeClass: opts.activeClass || defaults.activeClass, // string
		activeContentClass: opts.activeContentClass || defaults.activeContentClass, // string
		duration: opts.duration || defaults.duration, // number
		easing: config.tween.easing, // easing function
		autoInitialize: opts.autoInitialize || defaults.autoInitialize, // boolean
		// callbacks 
		openStart: opts.openStart, // function
		openComplete: opts.openComplete, // function
		closeStart: opts.closeStart, // function
		closeComplete: opts.closeComplete, // function
		onTick: opts.onTick // function
	}
	
	// some component hooks
	this.activeLink = null;
	this.componentState = false;

	// get shome closure
	let _this = this;
	let _opts = this.options;

	// we go clicky click
	function clickHandle(e) {
		// kill the things
		e.preventDefault();
	 	e.stopPropagation();
	 	// if we wanna close other links, and there is a link to close and that link isn't this
	 	// close the other one
		if(_opts.closeOthers && _this.activeLink !== null && _this.activeLink !== this) {
			_this.activeLink._state = false;
			_this.tween(_this.activeLink);
		}
		// update the activeLink state, used to closeOthers
		_this.activeLink = this;
		// if we're not already animating
		if(!this._isRunning) {
			// flip the state
			this._state = !this._state;
			// the context of this in side the clickHandle is the DOM element 
			// which was clicked,
			// so use the _this hook, bind() won't work here
			_this.tween(this);
		}
	};
	// the initalizer
	this.init = function() {
		_opts = _this.getOptions();
		// set the compontent state
		this.componentState = true;
		// loop through the buttons,
		_opts.$wrapper.find(_opts.button).each(function() {
			// get each target
			var $target = $($(this).data('target'));
			// get the current state, based on active class
			var state = $(this).hasClass(_opts.activeClass) ? true : false;
			// add the properties to this
			this._state = state;
			this._isRunning = false;
			this.$target = $target;

			// is the state is true, update the DOM and active link ref
			if(state === true) {
				$target.addClass(_opts.activeContentClass);
				_this.activeLink = this;
			}
		});
		
		// bind the click event
		_opts.$wrapper.on('click', _opts.button, clickHandle);
	}

	// goes all tweeny like
	// accepts a string
	this.tween = function(el) {
		// get the dom node
		var $el = $(el);
		// we need a target
		var $target = $(el.$target);
		// get the current height
		var height = $target.outerHeight(true);
		// if the state is true
		// add the initCss style
		// hides $target before it expands
		if(el._state === true) {
			if(typeof _opts.openStart === 'function') {
				_opts.openStart(el, $target);
			}
			$target.css({display: 'block'});
			height = $target.outerHeight(true);
			if($target.css('position') !== 'absolute' && $target.css('position') !== 'fixed') {
				$target.css({position: 'relative'});
			}
			$target.css({height: 0, overflow: 'hidden'});
		} else {
			if(typeof _opts.closeStart === 'function') {
				_opts.closeStart(el, $target);
			}
		}
		// if we're not already animating
		if (!el._isRunning) {
			// init new Tweezer
			var t = t || new Tweezer({
				start: el._state ? 0 : height,
				end: el._state ? height : 0,
				duration: _opts.duration,
				easing: _this.easing
			})
			// update height value on each 'tick'
			.on('tick', (v) => {
				$target.css({height: v + 'px', overflow: 'hidden'})
				if(typeof _opts.onTick === 'function') {
					_opts.onTick.call(el, v, $target);
				}
			})
			.on('done', ()=> {
				el._isRunning = false;
				if(el._state === true) {
					// remove the transition initCss styles and add the active class
	 				$target.css({overflow: '', height: ''}).addClass(_opts.activeContentClass);
	 				$el.addClass(_opts.activeClass);
	 				// callback
	 				_this.activeTarget = $target;
					if(typeof _opts.openComplete === 'function') {
						_opts.openComplete(el, $target);
					}
				} else {
					// reset shit
					$target.css({display: 'none', height: ''}).removeClass(_opts.activeContentClass);
	 				$el.removeClass(_opts.activeClass);
	 				// callback
					if(typeof _opts.closeComplete === 'function') {
						_opts.closeComplete(el, $target);
					}
				}
			})
			.begin();
			el._isRunning = true;
		}
	};
	// kill it.. kill it dead
	this.destroy = function() {
		// update the component state
		this.componentState = false;
		// remove click handler
		this.unbind();
		this.removeClasses();
		this.removeStyles();
	};

	this.unbind = function() {
		this.activeLink = null;
		_opts = _this.getOptions();
		_opts.$wrapper.off('click', _opts.button, clickHandle);
	}

	this.removeClasses = function() {
		_opts = _this.getOptions();
		// remove component classes and styles
		_opts.$wrapper.find(_opts.button).each(function() {
			$(this).removeClass(_opts.activeClass)
			this.$target.removeClass(_opts.activeContentClass)
		});
	}

	this.removeStyles = function() {
		_opts = _this.getOptions();
		// remove component classes and styles
		_opts.$wrapper.find(_opts.button).each(function() {
			$(this).removeAttr('style');
			this.$target.removeAttr('style')
		});
	}

	// update the options with new ones
	this.setOptions = function(o) {
        this.options = $.extend({}, _opts, o);
	}

	this.getOptions = function() {
		return this.options;
	}

	this.getActiveLink = function() {
		return this.activeLink;
	}

	this.getActiveTarget = function() {
		return this.activeTarget;
	}

	// what's the state yeah?
	this.getState = function() {
		return this.componentState;
	}

	this.close = function() {
		this.activeLink._state = false
		this.tween(this.activeLink);
	}

	// wanna auto boot?
	if(_opts.autoInitialize === true) {
		this.init();
	}
};


export default Expand;