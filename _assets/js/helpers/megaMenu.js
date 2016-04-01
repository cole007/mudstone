import Viewport from '../helpers/viewport';

/*
	Example usage:
	See jade/source/examples/mega-menu.jade for example markup
	var menu = new MegaMenu({
		container: container,
		btn: '.js-menu-btn',
		target: function($el) {
			return $el.next()
		},
		backBtn: '.js-menu-back',
		rootBtn: '.js-menu-root',
		activeClass: 'is-active',
		currentClass: '.is-current',
		openCurrentLevel: false,
		useAtBreakpoint: 1024,
	})
*/

function MegaMenu(options) {
	// shome private vars
	var set = [];
	var viewport = new Viewport();
	// assign this to _this
	var _this = this;

	this.currentLevel = 0;
	this.container = options.container; // jquery object
	this.btn = options.btn; // css selector
	this.backBtn = options.backBtn; // css selector
	this.rootBtn = options.rootBtn; // css selector
	this.currentClass = options.currentClass; // css selector
	this.target = options.target; // function return jquery object 
	this.activeClass = options.activeClass; // string
	this.openCurrentLevel = options.openCurrentLevel; // boolean
	this.useAtBreakpoint = options.useAtBreakpoint; // pixel width
	this.callback = options.callback;


	this.updateUi = function(i = this.currentLevel) {
		this.container.attr('data-current-level', i);
	}
	// add the click events
	this.bindEvents = function() {
		this.container.on('click', this.btn, clickHandle);
		this.container.on('click', this.backBtn, backButtonHandle);
		this.container.on('click', this.rootBtn, rootButtonHandle);
		this.updateUi();
	}
	// remove the click events
	this.unBindEvents = function() {
		this.container.off('click', this.btn, clickHandle);
		this.container.off('click', this.backBtn, backButtonHandle);
		this.container.off('click', this.rootBtn, rootButtonHandle);
		this.container.removeAttr('data-current-level');
	}
	// watch for breakpoint changes
	// the function only gets called when a breakpoint changes
	// Used to unbind/bind the click event
	viewport.change(function(current, prev) {
		if(this.width >= _this.useAtBreakpoint) {
			_this.unBindEvents();
		}
		if(this.width < _this.useAtBreakpoint) {
			_this.bindEvents();
		}
	});

	// if onLoad the viewport is smaller than desktop
	if(viewport.width < this.useAtBreakpoint) {
		this.bindEvents();
		// update the UI on load
	}

	// Opens the deepest current section
	if(this.openCurrentLevel === true) {
		var $currents = this.container.find(this.currentClass).each(function() {
			_this.openLevel($(this));
		});
		this.updateUi($currents.length);
	}

	this.resetMenu = function() {
		var k = set.length - 1;
		// loop through each target and call the backAction
		// in reverse
		while(k > -1) {
			this.backAction(set[k]);
			k--;
		}
	};

	this.backAction = function(o) {
		this.currentLevel--;
		this.updateUi();
		// remove item from array
		set.splice(set.length - 1, 1);
		o.$target.removeClass(this.activeClass);
		o.$btn.removeClass(this.activeClass);
	};

	this.openLevel = function($el) {
		if(typeof this.target !== 'function') {
			console.warn('this.target must be a function. Use a function that returns a jquery object')
			return;
		}
		var $target = this.target($el);
		// add the target and current button to array
		set.push({
			$target: $target,
			$btn: $el
		});
		this.currentLevel++;
		this.updateUi();
		$el.addClass(this.activeClass);
		$target.addClass(this.activeClass);
	}


	// there is no close functionality attached to the expand buttons
	// a simple class check would suffice if the functionality is required
	function clickHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		_this.openLevel($(this));
		if(typeof _this.callback === 'function') {
			_this.callback.call(_this, this);
		}
	}

	function backButtonHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		_this.backAction(set[set.length - 1]);
	} 

	function rootButtonHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		_this.resetMenu();
	}
}

export default MegaMenu;