import $ from 'jquery';
import Viewport from '../helpers/viewport';
import config from '../dependencies/config';
import Tweezer from 'tweezer.js';

var deepTarget = [];
var { breakpoints } = config;
var viewport = new Viewport();
var currentLevel = 0;
var container = $('[data-behaviour="megaNav"]');

function resetMenu() {
	var len = deepTarget.length;
	var n = 0;
	var k = len - 1;
	// loop through each target and call the backAction
	while(n < len) {
		backAction(deepTarget[k]);
		n++;
		k--;
	}
}
// remove active state from current level(s)
function backAction(o) {
	currentLevel--;
	updateUi();
	// remove item from array
	deepTarget.splice(deepTarget.length - 1, 1);
	o.$target.removeClass('is-active');
	o.$btn.removeClass('is-active');
} 

function updateUi(i = currentLevel) {
	container.attr('data-current-level', i);
}

function megaNav(container) {
	// the main click handle
	function clickHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		openLevel($(this));
		// maybe replace this with tweezer, for smoother animations
		container.animate({
			scrollTop: 0
		})
	}
	// the open event
	function openLevel($el) {
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
	// back button function
	function backButtonHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		backAction(deepTarget[deepTarget.length - 1]);
	}
	// root button function
	function rootButtonHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		resetMenu();
	}
	// set the current state on load, 
	function init() {
		var $currents = container.find('.is-current').each(function() {
			openLevel($(this));
		});
		updateUi($currents.length);
	}
	// add the click events
	function bindEvents() {
		container.on('click', '.js-menu-btn', clickHandle);
		container.on('click', '.js-menu-back', backButtonHandle);
		container.on('click', '.js-menu-root', rootButtonHandle);
	}
	// remove the click events
	function unBindEvents() {	
		container.off('click', '.js-menu-btn', clickHandle);
		container.off('click', '.js-menu-back', backButtonHandle);
		container.off('click', '.js-menu-root', rootButtonHandle);
	}
	// if onLoad the viewport is smaller than desktop
	if(viewport.width < breakpoints.desktop) {
		bindEvents();
	}
	// watch for breakpoint changes
	// the function only gets called when a breakpoint changes
	// Used to unbind the click event
	viewport.change(function(current, prev) {
		if(current === 'desktop' || this.width >= breakpoints.desktop) {
			unBindEvents();
		}
		if(current === 'tablet' || this.width < breakpoints.desktop) {
			bindEvents();
		}
	});
	// setup stuff
	init();
};

export { megaNav, resetMenu };