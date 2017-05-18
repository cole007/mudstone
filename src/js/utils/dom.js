
export function DomClosest(el, selector, stopSelector = 'body') {
	let retval = null
	while(el) {
		if(el.matches(selector)) {
			retval = el
			break
		} else if(stopSelector && el.matches(stopSelector)) {
			break
		}
		el = el.parentElement
	}
	return retval
}

export function DomSiblings(element) {
	return Array.from(element.parentNode.children).filter(child => child !== element)
}