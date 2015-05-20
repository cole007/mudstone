 /*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
window.debug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();


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


// https://github.com/cowboy/jquery-tiny-pubsub
(function($) {
 
  var o = $({});
 
  $.subscribe = function() {
    o.on.apply(o, arguments);
  };
 
  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };
 
  $.publish = function() {
    o.trigger.apply(o, arguments);
  };
 
}(jQuery));





/** 
 * Method used to create an object based on input string
 * @method namespace
 * @param  {String} namespaceString dot notation of object representation
 * @return {Object} parent ret urns object relative indepth to notation
 * @example
 * var mud = namespace('mud.Application.Site');
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

/**
 * Module to hold behaviours
 * @module mrb
 * @submodule Behaviours
 */
mud.Behaviours = {};

/** 
 * Method used to create an object based on input string
 * @method  mud.loadBehaviour
 * @param  {String} context Context within dom that behaviour will look at
 * @example
 * by default set context to the $(document);
 * this could be call specifically on a DOM element e.g. mud.loadBehaviour($('#myElement'))
 */
mud.loadBehaviour = function(context){
 
    if(context === undefined){
        context = $(document);
    }
     
    // iterate through each element with $('[data-behaviour]') in DOM
    context.find("*[data-behaviour]").each(function(){
        // assign to variable
        var $el = $(this);
        // grab contents of behaviours
        var behaviours = $el.attr('data-behaviour');
            // split out behaviours as multiple behaviours can be defined on each DOM element e.g. data-behaviour="showVid ShowHide ..etd"
            $.each(behaviours.split(" "), function(index, behaviourName){
                try{
                    // assign instance of method object based on behaviour name e.g. mud.Behaviours.showVid to variable
                    var BehaviourClass = mud.Behaviours[behaviourName];
                    // instantiate method object
                    if(typeof mud.Behaviours[behaviourName] !== 'undefined'){
                        var initializedBehaviour = new BehaviourClass($el);
                    }else{
                        // log error if behaviour not found
                        console.log(behaviourName+' Behaviour not found');
                    }
                }
                catch(e){
                    // log error if behaviour not found
                    console.log(e);
                }
            });
    });
};

/** 
 * Method used to call mrb.loadBehaviour
 * @method mrb.onReady
 * @example
 * mrb.onReady()
 */
mud.onReady = function(){
    // onready call LoadBehaviour
    mud.loadBehaviour();
}

$(document).ready(function(){
    // use document on ready to insure that all js resources are loaded onto page
    mud.onReady();
});


