import assignIn from 'lodash.assignin';
import Concert from 'concert';

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
/**
 * Module to hold behaviours
 * @module mrb
 * @submodule Behaviours
 */
var mud = namespace('mud.mudlication.Site');
 
mud.Behaviours = {};
mud.LoadWindow = {};
mud.LoadFont = {};
mud.Collection = [];
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

                    // Inheritable Observables
                    // https://github.com/moll/js-concert
                    assignIn(
                        BehaviourClass.prototype,
                        Concert
                    )

                    BehaviourClass.prototype.state = {};
                    BehaviourClass.prototype.el = element;

                    BehaviourClass.prototype.add = function(name) {
                        if(typeof mud.Collection[name] === 'undefined') {
                            mud.Collection[name] = this;
                        } else {
                            console.error(name, 'already existing in the collection');
                        }
                    }

                    BehaviourClass.prototype.get = function(name) {
                        if(typeof mud.Collection[name] !== 'undefined') {
                            return mud.Collection[name]
                        } else {
                            console.error(name, 'does not existing in the collection');
                        }
                    }

                    BehaviourClass.prototype.setState = function(state) {
                        Object.assign(this.state, state)
                    }

                    BehaviourClass.prototype.getState = function(state) {
                        var output = {};
                        for (var i in this.state) {
                            if (this.state.hasOwnProperty(i)) {
                                if(i === state) {
                                    output[i] = this.state[i]
                                }
                            }
                        }
                        return output;
                    }

                    const initializedBehaviour = new BehaviourClass(element);
                }else{
                    console.warn(behaviourName+' Behaviour not found');
                }
            }
            catch(e){
                console.error(e);
            }
        });
    })
};

mud.onWindowLoad = function(){
    // call loadWindow
    if(mud.LoadWindow){
      for(let k in mud.LoadWindow) {
        if(Object.keys(mud.LoadWindow).length > 0) {
          mud.LoadWindow[k]();
        } 
      }
    }
};



mud.onLoadFont = function(){
    // call loadWindow
    if(mud.LoadFont){
      for(let k in mud.LoadFont) {
        if(Object.keys(mud.LoadFont).length > 0) {
          mud.LoadFont[k]();
        } 
      }
    }
};

export default mud;