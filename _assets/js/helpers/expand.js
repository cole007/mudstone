import Tweezer from 'tweezer.js';
import debounce from 'lodash.debounce';
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
	openStart: function() {
		console.log('openStart callback');
	},
	openComplete: function() {
		console.log('openComplete callback');
	},
	closeStart: function() {
		console.log('closeStart callback')
	},
	closeComplete: function() {
		console.log('closeComplete callback')
	},
});
// change the state of an accordion
accordion.tween($('.button')) // this will/open close the selected element
accordion.close(); // will close all accordions
accordion.open(); // will open all accordions
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
	var defaults = {
		wrapper: $('.js-accordion'),
		button: '.button',
		closeOthers: false,
		activeClass: 'is-active',
		activeContentClass: 'is-active',
		duration: 1000,
		autoInitialize: true
	};

	this.options = {
		// API
		$wrapper: opts.wrapper || defaults.wrapper,
		button: opts.button || defaults.button,
		closeOthers: opts.closeOthers || defaults.closeOthers,
		activeClass: opts.activeClass || defaults.activeClass,
		activeContentClass: opts.activeContentClass || defaults.activeContentClass,
		duration: opts.duration || defaults.duration,
		easing: config.tween.easing,
		autoInitialize: opts.autoInitialize || defaults.autoInitialize,
		// callbacks 
		openStart: opts.openStart,
		openComplete: opts.openComplete,
		closeStart: opts.closeStart,
		closeComplete: opts.closeComplete
	}
	// prev
	this.activeLink = null;
	this.componentState = false;

	// Private Variables
	// get hold of this
	let _this = this;
	let _opts = this.options;

	console.log(_opts);

	function clickHandle(e) {
		e.preventDefault();
	 	e.stopPropagation();
		if(_opts.closeOthers && _this.activeLink !== null && _this.activeLink !== this) {
			_this.activeLink._state = false;
			_this.tween(_this.activeLink);
		}
		_this.activeLink = this;
		if(!this._isRunning) {
			this._state = !this._state;
			// the context of this in side the clickHandle is the DOM element 
			// which was clicked,
			// so use the _this hook, bind() won't work here
			_this.tween(this);
		}
	};
	// immediately invoked function
	this.init = function() {
		this.componentState = true;
		// loop through all of the buttons
		// create an array of elements,
		// set initial states
		// give each button an index data attribute
		_opts.$wrapper.find(_opts.button).each(function(i) {

			var $target = $($(this).data('target'));
			var state = $(this).hasClass(_opts.activeClass) ? true : false;
			// if active, add the active class to the target element
			this._state = state;
			this._isRunning = false;
			this.$target = $target;
			if(state === true) {
				$target.addClass(_opts.activeContentClass);
				_this.activeLink = this;
			}
		});
	}


	// public api, pass in the qQuery object to transition
	// transition will be based on the current state
	// do the tweening
	this.tween = function(el) {
		var $el = $(el);
		var $target = $(el.$target);
		var height = $target.outerHeight(true);
		// if the state is true
		// add the initCss style
		// hides $target before it expands
		if(el._state === true) {
			if(typeof _opts.openStart === 'function') {
				_opts.openStart(el);
			}
			$target.css({display: 'block'});
			height = $target.outerHeight(true);
			$target.css({height: 0, overflow: 'hidden', position: 'relative'});
		} else {
			if(typeof _opts.closeStart === 'function') {
				_opts.closeStart(el);
			}
		}

		if (!el._isRunning) {
			// init new Tweezer
			var t = t || new Tweezer({
				start: el._state ? 0 : height,
				end: el._state ? height : 0,
				duration: _this.duration,
				easing: _this.easing
			})
			// update height value on each 'tick'
			.on('tick', (v) => $target.css({height: v + 'px', overflow: 'hidden', position: 'relative'}))
			.on('done', ()=> {
				el._isRunning = false;
				if(el._state === true) {
					// remove the transition initCss styles and add the active class
	 				$target.css({overflow: '', position: '', height: ''}).addClass(_opts.activeContentClass);
	 				$el.addClass(_opts.activeClass);
					if(typeof _opts.openComplete === 'function') {
						_opts.openComplete(el);
					}
				} else {
					$target.css({display: 'none', position: '', height: ''}).removeClass(_opts.activeContentClass);
	 				$el.removeClass(_opts.activeClass);
					if(typeof _opts.closeComplete === 'function') {
						_opts.closeComplete(el);
					}
				}
			})
			.begin();
			el._isRunning = true;
		}
	};

	this.destroy = function() {
		this.componentState = false;
		_opts.$wrapper.off('click', _opts.button, clickHandle);
		_opts.$wrapper.find(_opts.button).each(function(i) {
			$(this).removeClass(_opts.activeClass).removeAttr('style');
			this.$target.removeClass(_opts.activeContentClass).removeAttr('style')
		});
	};


	this.setOptions = function() {
        var options = $.extend({}, _opts, o);
        this.options = options;
	}

	this.getState = function() {
		return this.componentState;
	}

	if(_opts.autoInitialize === true) {
		this.init();
	}

	_opts.$wrapper.on('click', _opts.button, clickHandle);
};


export default Expand;