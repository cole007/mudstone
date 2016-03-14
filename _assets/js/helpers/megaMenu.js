import $ from 'jquery';
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
	this.container = options.container; // jquery object
	this.btn = options.btn; // css selector
	this.target = options.target; // function return jquery object 
	this.backBtn = options.backBtn; // css selector
	this.rootBtn = options.rootBtn; // css selector
	this.activeClass = options.activeClass; // css selector
	this.currentClass = options.currentClass; // css selector
	this.openCurrentLevel = options.openCurrentLevel; // boolean
	this.useAtBreakpoint = options.useAtBreakpoint; // pixel width

	var deepTarget = [];
	var viewport = new Viewport();
	var currentLevel = 0;
	var _this = this;

	function clickHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		_this.openLevel($(this));
	}

	function backButtonHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		_this.backAction(deepTarget[deepTarget.length - 1]);
	} 

	function rootButtonHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		_this.resetMenu();
	}

	this.setCurrent = function() {
		var $currents = this.container.find(this.currentClass).each(function() {
			_this.openLevel($(this));
		});
		this.updateUi($currents.length);
	}

	// add the click events
	this.bindEvents = function() {
		this.container.on('click', this.btn, clickHandle);
		this.container.on('click', this.backBtn, backButtonHandle);
		this.container.on('click', this.rootBtn, rootButtonHandle);
	}
	// remove the click events
	this.unBindEvents = function() {
		this.container.off('click', this.btn, clickHandle);
		this.container.off('click', this.backBtn, backButtonHandle);
		this.container.off('click', this.rootBtn, rootButtonHandle);
	}


	// if onLoad the viewport is smaller than desktop
	if(viewport.width < this.useAtBreakpoint) {
		this.bindEvents();
	}
	// watch for breakpoint changes
	// the function only gets called when a breakpoint changes
	// Used to unbind the click event
	viewport.change(function(current, prev) {
		if(this.width >= _this.useAtBreakpoint) {
			_this.unBindEvents();
		}
		if(this.width < _this.useAtBreakpoint) {
			_this.bindEvents();
		}
	});

	this.updateUi = function(i = currentLevel) {
		this.container.attr('data-current-level', i);
	}

	this.resetMenu = function() {
		var len = deepTarget.length;
		var n = 0;
		var k = len - 1;
		// loop through each target and call the backAction
		while(n < len) {
			this.backAction(deepTarget[k]);
			n++;
			k--;
		}
	};

	this.backAction = function(o) {
		currentLevel--;
		this.updateUi();
		// remove item from array
		deepTarget.splice(deepTarget.length - 1, 1);
		o.$target.removeClass(this.activeClass);
		o.$btn.removeClass(this.activeClass);
	};

	this.openLevel = function($el) {
		var $target = this.target($el);
		console.log($el);
		// add the target and current button to array
		deepTarget.push({
			$target: $target,
			$btn: $el
		});
		currentLevel++;
		this.updateUi();
		$el.addClass(this.activeClass);
		$target.addClass(this.activeClass);
	}


	if(this.openCurrentLevel === true) {
		this.setCurrent()
	}


	this.updateUi();
}

export default MegaMenu;