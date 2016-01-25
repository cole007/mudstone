import { debounce } from 'lodash';
import $ from 'jquery';


var viewport = function(opts) {

	function queryName() {
		return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
	}

	function getDimensions() {
		return {
			width: window.innerWidth ||  document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
			height: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
		}
	}

	this.initialQuery = queryName();
	this.breakpoint = this.initialQuery;
    this.width = getDimensions().width;
    this.height = getDimensions().height;
    this.current = this.initialQuery;
    
	var $window = $(window);	
	var query = function() {
		this.breakpoint = queryName();
	    this.width = getDimensions().width;
	    this.height = getDimensions().height;
		if(this.current !== this.breakpoint) {
			console.log('now');
			this.current = this.breakpoint;
			this.change();
		}
	};

	this.resize = function() {
		$window.on('resize', debounce(query.bind(this), 300));
		//return this;
	}


	this.change = function() {
		
	}
};

export default viewport;