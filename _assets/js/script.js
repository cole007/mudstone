// declare our JS framework, HT @jackfranklin
var doJqueryAction = {
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
  doJqueryAction.init();
});
