import $ from 'jquery';
import Tweezer from 'tweezer.js';
import { debounce } from 'lodash';

/* 
Example Usage 

Javascript: 

var accordion = new Expand({
	wrapper: container,
	button: '.button',
	closeOthers: false,
	activeClass: '.is-active',
	openStart: function() {
		console.log('openStart');
	},
	openComplete: function() {
		console.log('openComplete');
	},
	closeStart: function() {
		console.log('closeStart')
	},
	closeComplete: function() {
		console.log('closeComplete')
	},
});

Html:
<div data-behaviour="accordion" class="wrapper accordion">
	<button data-target="#c1" class="button accordion__btn">1</button>
	<div id="c1" class="accordion__content">
	<button data-target="#c2" class="button accordion__btn">1</button>
	<div id="c2" class="accordion__content">
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
		activeContentClass: 'is-active'
	};
	// API
	this.$wrapper = opts.wrapper || defaults.wrapper;
	this.button = opts.button || defaults.button;
	this.closeOthers = opts.closeOthers || defaults.closeOthers;
	this.activeClass = opts.activeClass || defaults.activeClass;
	this.activeContentClass = opts.activeContentClass || defaults.activeContentClass;

	// callbacks 
	this.openStart = opts.openStart;
	this.openComplete = opts.openComplete;
	this.closeStart = opts.closeStart;
	this.closeComplete = opts.closeComplete;
	// Private Variables
	// get hold of this
	let _this = this;
	// save the window dom
	let $window = $(window);
	// init empty array for accordion items
	let collection = [];
	// base css for opening
	let initCss = { display: 'block', height: 0, overflow: 'hidden', position: 'relative' };
	// private function
	// set the height values for each item, called during window resize
	function setHeight() {
		collection.forEach((element) => element.height = (element.state === true) ? getHeight(element.$target) : element.$target.outerHeight(true));
	};
	// private function
	// get the height of all of the children 
	function getHeight($target) {
		var height = 0;
		$target.children().each(function() {
			height += $(this).outerHeight(true);
		})	
		return height;
	};

	function clickHandle(e) {
		e.preventDefault();
		var $this = $(this);
		var index = $this.data('expand-index');
		var el = collection[index];
		if(_this.closeOthers) _this.closeOther(index);
		el.currentHeight = el.state === true ? el.height : 0;
		if(!el.isRunning) {
			el.state = !el.state;
			// the context of this in side the clickHandle is the DOM element 
			// which was clicked,
			// so use the _this hook, bind() won't work here
			if(typeof _this.openStart === 'function' && el.state === true) {
				_this.openStart();
			}
			if(typeof _this.closeStart === 'function' && el.state === false) {
				_this.closeStart();
			}
			_this.tween(el.$el);
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
			if(state === true) {
				$target.addClass(_this.activeContentClass);
			}
			var height = (state === true) ? getHeight($target) : $target.outerHeight(true);
			$(this).attr('data-expand-index', i);
			collection.push({
				$el: $(this),
				$target: $target,
				state: state,
				height: height,
				currentHeight:  $(this).hasClass(_this.activeContentClass) === true ? height : 0,
				isRunning: false,
				shouldGrow: state
			});
		});
	}.bind(this))();
	// public api, pass in the qQuery object to transition
	// transition will be based on the current state
	// do the tweening
	this.tween = function($el) {
		var index = $el.data('expand-index');
		var obj = collection[index];
		// if the state is true
		// add the initCss style
		// hides $target before it expands
		if(obj.state === true) {
			obj.$target.css(initCss);
		}
		if (!obj.isRunning) {
			// init new Tweezer
			new Tweezer({
				start: obj.currentHeight,
				end: obj.state ? obj.height : 0
			})
			// update height value on each 'tick'
			.on('tick', (v) => obj.$target.css({height: v + 'px', overflow: 'hidden', position: 'relative'}))
			.on('done', ()=> {
				obj.shouldGrow = !opts.shouldGrow;
				obj.isRunning = false;
				if(obj.state === true) {
					// remove the transition initCss styles and add the active class
	 				obj.$target.css({overflow: '', position: '', height: ''}).addClass(_this.activeContentClass);
	 				obj.$el.addClass(_this.activeClass);
					if(typeof _this.openComplete === 'function') {
						_this.openComplete();
					}
				} else {
					obj.$target.css({display: 'none'}).removeClass(_this.activeContentClass);
	 				obj.$el.removeClass(_this.activeClass);
					if(typeof _this.closeComplete === 'function') {
						_this.closeComplete();
					}
				}
			})
			.begin();
			obj.isRunning = true;
		}
	};

	this.closeOther = function(i) {
		collection.find(function(el, index) {
			if(el.state === true && i !== index) {
				el.state = !el.state;
				el.currentHeight = el.height;
				this.tween(el.$el);
				el.$el.removeClass('is-active');
			}
		}.bind(this));
	};

	$window.on('resize', debounce(setHeight, 300));
	this.$wrapper.on('click', this.button, clickHandle);
};


export default Expand;