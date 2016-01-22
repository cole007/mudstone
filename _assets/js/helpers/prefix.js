import $ from 'jquery';

var tool = {
	transitionEnd: (function() {
	    var el = document.createElement('div');
	    var transEndEventNames = {
	      WebkitTransition : 'webkitTransitionEnd',
	      MozTransition    : 'transitionend',
	      OTransition      : 'oTransitionEnd otransitionend',
	      transition       : 'transitionend'
	    };
	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return transEndEventNames[name];
	      }
	    }
	    return false;
	})(),

	transform: (function() {
		var el = document.createElement('div');
		var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    
	    for(var i = 0; i < prefixes.length; i++) {
	        if(el && el.style[prefixes[i]] !== undefined) {
	            return prefixes[i];
	        }
	    }
		return false;
	})(),

};

export default tool;