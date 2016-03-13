import Tweezer from 'tweezer.js';
import debounce from 'lodash.debounce';
import config from '../dependencies/config';
import $ from 'jquery';

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
		duration: 1000
	};
	// API
	this.$wrapper = opts.wrapper || defaults.wrapper;
	this.button = opts.button || defaults.button;
	this.closeOthers = opts.closeOthers || defaults.closeOthers;
	this.activeClass = opts.activeClass || defaults.activeClass;
	this.activeContentClass = opts.activeContentClass || defaults.activeContentClass;
	this.duration = opts.duration || defaults.duration;
	this.easing = config.tween.easing;
	// callbacks 
	this.openStart = opts.openStart;
	this.openComplete = opts.openComplete;
	this.closeStart = opts.closeStart;
	this.closeComplete = opts.closeComplete;
	// prev
	this.activeLink = null;

	// Private Variables
	// get hold of this
	let _this = this;

	function clickHandle(e) {
		e.preventDefault();
	 	e.stopPropagation();
		if(_this.closeOthers && _this.activeLink !== null) {
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
	(function init() {
		// loop through all of the buttons
		// create an array of elements,
		// set initial states
		// give each button an index data attribute
		this.$wrapper.find(this.button).each(function(i) {
			var $target = $($(this).data('target'));
			var state = $(this).hasClass(_this.activeClass) ? true : false;
			// if active, add the active class to the target element
			this._state = state;
			this._isRunning = false;
			this.$target = $target;
			if(state === true) {
				$target.addClass(_this.activeContentClass);
				_this.activeLink = this;
			}
		});
	}.bind(this))();
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
			if(typeof this.openStart === 'function') {
				this.openStart(el);
			}
			$target.css({display: 'block'});
			height = $target.outerHeight(true);
			$target.css({height: 0, overflow: 'hidden', position: 'relative'});
		} else {
			if(typeof this.closeStart === 'function') {
				this.closeStart(el);
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
	 				$target.css({overflow: '', position: '', height: ''}).addClass(_this.activeContentClass);
	 				$el.addClass(_this.activeClass);
					if(typeof _this.openComplete === 'function') {
						_this.openComplete(el);
					}
				} else {
					$target.css({display: 'none', position: '', height: ''}).removeClass(_this.activeContentClass);
	 				$el.removeClass(_this.activeClass);
					if(typeof _this.closeComplete === 'function') {
						_this.closeComplete(el);
					}
				}
			})
			.begin();
			el._isRunning = true;
		}
	};
	// this.close = function() {
	// 	this.$wrapper.find(this.button).each(function() {
	// 		if(this._state === true) {
	// 			this._state = false;
	// 			_this.tween(this);
	// 		}
	// 	});
	// };
	// this.open = function() {
	// 	this.$wrapper.find(this.button).each(function() {
	// 		if(this._state === false) {
	// 			this._state = true;
	// 			_this.tween(this);
	// 		}
	// 	});
	// };
	this.$wrapper.on('click', this.button, clickHandle);
};


export default Expand;