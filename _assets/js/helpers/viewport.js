import { debounce } from 'lodash';
import $ from 'jquery';
/* 
	var viewport = new Viewport({
		debounceDelay: 300
	});
	viewport.resize(function() {
		if(this.width > 768) {
			do something
		}
	});
	viewport.change(function(prev, current) {
		if(prev === 'smartphone') {
			// destroy some stuff
		}
		if(current === 'tablet') {
			// add some stuff
		}
	});
*/

var Viewport = function(opts) {
	var defaults = {
		debounceDelay: 300
	};
	this.debounceDelay = defaults.debounceDelay;
	this.initialQuery = queryName();
	this.breakpoint = this.initialQuery;
    this.width = getDimensions().width;
    this.height = getDimensions().height;
    this.current = this.initialQuery;
	var $window = $(window);	
	function queryName() {
		return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
	}
	function getDimensions() {
		return {
			width: window.innerWidth ||  document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
			height: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
		}
	}
	function query(e) {
		this.breakpoint = queryName();
	    this.width = getDimensions().width;
	    this.height = getDimensions().height;
		if(this.current !== this.breakpoint) {
			let prev = this.current;
			let current = this.breakpoint;
			this.current = this.breakpoint;
			if(typeof this.change === 'function') {
				this.onChange(prev, current);
			}
		}
		if(typeof this.onResize === 'function') {
			this.onResize();
		}
	};
	this.resize = function(fn) {
		this.onResize = fn;
		$window.on('resize', debounce(query.bind(this), this.debounceDelay));
	};
	this.change = function(fn) {
		this.onChange = fn;
		$window.on('resize', debounce(query.bind(this), this.debounceDelay));
	};
	this.destroy = function() {
		$window.off('resize', query);
	}
};

export default Viewport;