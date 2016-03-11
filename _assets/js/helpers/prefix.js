
var tool = {
	prefix: (function () {
	  var styles = window.getComputedStyle(document.documentElement, ''),
	    pre = (Array.prototype.slice
	      .call(styles)
	      .join('') 
	      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	    )[1],
	    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	  return {
	    dom: dom,
	    lowercase: pre,
	    css: '-' + pre + '-',
	    js: pre[0].toUpperCase() + pre.substr(1)
	  };
	})(),

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

	css3: function(prop) {
		var el = document.createElement('div');
		var prefix = this.prefix.js;
		function capitalize(str) {
		    return str.charAt(0).toUpperCase() + str.slice(1);
		}
		var prefixed = prefix + capitalize(prop);
		var test = [prop, prefixed];

	    for(var i = 0; i < test.length; i++) {
	        if(el && el.style[test[i]] !== undefined) {
	            return test[i];
	        }
	    }
		return false;
	}
};

export default tool;