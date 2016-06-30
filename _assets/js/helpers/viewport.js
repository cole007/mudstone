// import $ from 'jquery';
import debounce from 'lodash.debounce'; 

export default function Viewport(opts) {
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
	function query(fn, e) {
		this.breakpoint = queryName();
	    this.width = getDimensions().width;
	    this.height = getDimensions().height;
		if(this.current !== this.breakpoint) {
			let prev = this.current;
			let current = this.breakpoint;
			this.current = this.breakpoint;
			if(typeof this.change === 'function') {
				fn.call(this, current, prev);
			}
		}
		if(typeof fn === 'function') {
			fn.call(this);
		}
	};
	this.resize = function(fn) {
		$window.on('resize', debounce(query.bind(this, fn), this.debounceDelay));
	};
	this.change = function(fn) {
		$window.on('resize', debounce(query.bind(this, fn), this.debounceDelay));
	};
	this.destroy = function() {
		$window.off('resize', query);
	}
};