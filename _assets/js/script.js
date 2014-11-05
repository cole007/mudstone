
/** 
 * Method used to create an object based on input string
 * @method namespace
 * @param  {String} namespaceString dot notation of object representation
 * @return {Object} parent returns object relative indepth to notation
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

// declare our JS framework, HT @jackfranklin
mud.oJqueryAction = {
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
    },
    // your functions
    doShowcase: function() {
      // create local instance of this
      var self = this;
    }
};

jQuery(function($){
  mud.doJqueryAction.init();
});
