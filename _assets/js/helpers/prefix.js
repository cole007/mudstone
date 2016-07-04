
export const prefix = (function() {
  const styles = window.getComputedStyle(document.documentElement, '');
  const pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
  const dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

export const transitionEnd = (function(){
    const el = document.createElement('div');
    const transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    };
    for (let name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return transEndEventNames[name];
      }
    }
    return false;
})();

export function css3(prop) {
	const el = document.createElement('div');
	const _prefix = prefix.js;
	function capitalize(str) {
	    return str.charAt(0).toUpperCase() + str.slice(1);
	}
	const prefixed = _prefix + capitalize(prop);
	const test = [prop, prefixed];

    for(let i = 0; i < test.length; i++) {
        if(el && el.style[test[i]] !== undefined) {
            return test[i];
        }
    }
	return false;
}