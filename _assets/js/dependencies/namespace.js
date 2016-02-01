/** 
 * Method used to create an object based on input string
 * @method namespace
 * @param  {String} namespaceString dot notation of object representation
 * @return {Object} parent ret urns object relative indepth to notation
 * @example
 * var mud = namespace('mud.mudlication.Site');
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

export default namespace;