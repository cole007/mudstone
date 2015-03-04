 /**
 * Create module for configuring loading external fonts
 * @module WebFontConfig
 */
// var html = document.getElementsByTagName('html')[0];
// html.className += '  wf-loading';
// setTimeout(function() {
//   html.className = html.className.replace(' wf-loading', ' wf-fail');
// }, 1500);

 
// var WebFontConfig = {
//     typekit: {
//       id: 'wit0jva'
//     }
// };

// /** 
//  * Load external fonts
//  */
// (function() {
//   "use strict";
//     var wf = document.createElement('script');
//     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//     '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//     wf.type = 'text/javascript';
//     wf.async = 'true';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(wf, s); 
// })();


/** 
 * Method used to create an object based on input string
 * @method namespace
 * @param  {String} namespaceString dot notation of object representation
 * @return {Object} parent ret urns object relative indepth to notation
 * @example
 * var mrb = namespace('mrb.Application.Site');
 */
function namespace(namespaceString) {
	"use strict";
	var parts = namespaceString.split('.'),
		parent = window,
		currentPart = '';    
		
	for(var i = 0, length = parts.length; i < length; i++) {
		currentPart = parts[i];
		parent[currentPart] = parent[currentPart] || {};
		parent = parent[currentPart];
	}
	
	return parent;
}

 
var mud = namespace('mud.Application.Site');

mud.device = ($('html').hasClass('touch')) ? 'mobile' : 'desktop';

mud.breakpoint = {};
mud.breakpoint.name = '';
mud.breakpoint.width = '';
mud.breakpoint.height = '';


(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');



// debug.log(mud.device);

// declare our JS framework, HT @jackfranklin
mud.behaviour = {
    // variables you want available on page load
    getVars: function () {
        'use strict';

    	// eg this.accordion = $('.accordion');
    },    
    // functions you want to kick in on page load
    init: function () {
      'use strict';
      this.getVars();
    	// eg  this.doShowcase();
    }
};


