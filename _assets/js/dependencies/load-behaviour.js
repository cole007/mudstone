import $ from 'jquery';
import namespace from '../dependencies/namespace';


/**
 * Module to hold behaviours
 * @module mrb
 * @submodule Behaviours
 */
var mud = namespace('mud.mudlication.Site');
 
mud.Behaviours = {};
mud.LoadWindow = mud.LoadWindow || {};
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

mud.onWindowLoad = function(){
    // call loadWindow
    if(mud.LoadWindow){
      for(var k in mud.LoadWindow) {
        if(Object.keys(mud.LoadWindow).length > 0) {
          mud.LoadWindow[k]();
        } 
      }
    }
};

export default mud;