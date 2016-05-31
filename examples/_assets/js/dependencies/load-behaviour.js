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
        context = document;
    }
    var nodes = context.querySelectorAll('*[data-behaviour]');
    Array.prototype.forEach.call(nodes, function(element) {
        //var k = element.getAttribute('data-behaviour');
        element.getAttribute('data-behaviour').split(" ").forEach(function(behaviourName) {
            try{
                // assign instance of method object based on behaviour name e.g. mud.Behaviours.showVid to variable
                var BehaviourClass = mud.Behaviours[behaviourName];
                // instantiate method object
                if(typeof mud.Behaviours[behaviourName] !== 'undefined'){
                    var initializedBehaviour = new BehaviourClass(element);
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
    })
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