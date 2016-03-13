import $ from 'jquery';
import Viewport from '../helpers/viewport';
import config from '../dependencies/config';

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
		let { $target } = deepTarget[k];
		backAction($target);
		n++;
		k--;
	}
}
// remove active state from current level(s)
function backAction($target) {
	currentLevel--;
	container.attr('data-current-level', currentLevel);
	// remove item from array
	deepTarget.splice(deepTarget.length - 1, 1);
	$target.removeClass('is-active');
	console.log('h');
} 

function megaNav(container) {
	// the main click handle
	function clickHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		openLevel($(this));
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
		$target.addClass('is-active');
	}
	// back button function
	function backButtonHandle(e) {
		e.preventDefault();
		e.stopPropagation();
		var { $target } = deepTarget[deepTarget.length - 1];
		backAction($target);
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
		container.attr('data-current-level', $currents.length)
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