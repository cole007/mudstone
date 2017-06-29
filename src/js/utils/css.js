
/**
 * Returns the first matched parent node
 *
 * @memberOf utils/dom
 * @param  {HTMLElement} element, the target element
 * @param {String} selector, the selector to match against
 * @param {stopSelector} stopSelector, a selector to stop traversal
 * @return {HTMLElement}
 */
export function DomClosest(element, selector, stopSelector = 'body') {
	let parent = null
	while(element) {
		if(element.matches(selector)) {
			parent = element
			break
		} else if(stopSelector && element.matches(stopSelector)) {
			break
		}
		element = element.parentElement
	}
	return parent
}

/**
 * Returns an array of sibling elements
 *
 * @memberOf utils/dom
 * @param  {HTMLElement} the target element
 * @return {Array} Array of dom nodes
 */
export function DomSiblings(element) {
	return [...element.parentNode.children].filter(child => child !== element)
}

/**
 * Applies an object of css properties to the given dom node
 *
 * @memberOf utils/dom
 * @param  {String} element - the dom node to apply style to
 * @param {Object} properties - the css properties to apply
 * @return {Void}
 */
export function DomCss(element, properties) {
	const css3 = require('./css').css3
	const camelCase = require('./helpers').camelCase
	for (let property in properties) {
		if (properties.hasOwnProperty(property)) {
			element.style[css3(camelCase(property))] = properties[property]
		}
	}
}

/**
 * Simple wrapper around the classList method
 *
 * @memberOf utils/dom
 * @param  {HTMLElement} element | string
 * @param {HTMLElement} context
 * @return classList method
 */
export function DomClass(element, context = document) {
	const node = typeof element === 'string' ? context.querySelector(element) : element
	return node.classList
}


/**
 * Fires a callback once an image has loaded
 *
 * @memberOf utils/dom
 * @param  {HTMLElement} element - the containing dom node
 * @param {Function} complete - function to be invoke once the image has loaded
 * @return {Void}
 */
export function DomLazyLoadImagesLoaded(element, callback) {
	const config = {
		attributes: true,
		childList: false,
		characterData: false,
		subtree: true,
		attributeFilter: ['class']
	}

	const observer = new MutationObserver(() => {
		if(!element.querySelectorAll('.lazyloading, .lazyload').length){
			observer.disconnect()
			typeof callback === 'function' && callback()
		}	
	})
	
	observer.observe(element, config)
}
