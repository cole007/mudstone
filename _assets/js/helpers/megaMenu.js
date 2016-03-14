import $ from 'jquery';
import Viewport from '../helpers/viewport';

function MegaMenu(options) {
	this.container = options.container; // jquery object
	this.btn = options.btn; // css selector
	this.target = options.target;
	this.backBtn = options.backBtn; // css selector
	this.rootBtn = options.rootBtn; // css selector
	this.activeClass = options.activeClass; // css selector
	this.currentClass = options.currentClass; // css selector
	this.openCurrentLevel = options.openCurrentLevel; // boolean
	this.useAtBreakpoint = options.useAtBreakpoint; // pixel width


	var deepTarget = [];
	var { breakpoints } = config;
	var viewport = new Viewport();
	var currentLevel = 0;
	var container = options.container;
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

	function init() {
		var $currents = this.container.find(this.currentClass).each(function() {
			_this.openLevel($(this));
		});
		this.updateUi($currents.length);
	}


	// add the click events
	this.bindEvents() {
		container.on('click', this.btn, clickHandle);
		container.on('click', this.backBtn, backButtonHandle);
		container.on('click', this.rootBtn, rootButtonHandle);
	}
	// remove the click events
	this.unBindEvents() {	
		container.off('click', this.btn, clickHandle);
		container.off('click', this.backBtn, backButtonHandle);
		container.off('click', this.rootBtn, rootButtonHandle);
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

	this.updateUi() {
		this.container.attr('data-current-level', i);
	}

	this.resetMenu() {
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

	this.backAction(o) {
		currentLevel--;
		updateUi();
		// remove item from array
		deepTarget.splice(deepTarget.length - 1, 1);
		o.$target.removeClass('is-active');
		o.$btn.removeClass('is-active');
	};

	this.openLevel() {
		var $target = $el.next();
		// add the target and current button to array
		deepTarget.push({
			$target: $target,
			$btn: $el
		});
		currentLevel++;
		updateUi();
		$el.addClass('is-active');
		$target.addClass('is-active');
	}


	if(this.openCurrentLevel === true) {
		init.call(this);
	}

}

export default MegaMenu;