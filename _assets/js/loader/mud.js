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
export const mud = namespace('mud.mudlication.Site');