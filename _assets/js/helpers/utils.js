import local from 'local-links'


/**
 * Return the prefix used by the current browser
 * @return {Object} prefix object
 */
export const prefix = (function() {
	const styles = window.getComputedStyle(document.documentElement, '')
	const pre = (Array.prototype.slice
		.call(styles)
		.join('')
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		)[1]
	const dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1]
	return {
		dom: dom,
		lowercase: pre,
		css: '-' + pre + '-',
		js: pre[0].toUpperCase() + pre.substr(1)
	}
})()

/**
 * Return the prefix transitionEnd event name
 * @return {String} the transition end string
 */
export const transitionEnd = (function(){
	const el = document.createElement('div')
	const transEndEventNames = {
		WebkitTransition : 'webkitTransitionEnd',
		MozTransition    : 'transitionend',
		OTransition      : 'oTransitionEnd otransitionend',
		transition       : 'transitionend'
	}
	for (let name in transEndEventNames) {
		if (el.style[name] !== undefined) {
			return transEndEventNames[name]
		}
	}
	return false
})()

/**
 * Return the prefix css3 property
 * @param {prop} prop - the un prefix css property (camelCase)
 * @return {String} the css3 property
 */
export function css3(prop) {
	const el = document.createElement('div')
	const _prefix = prefix.js
	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}
	const prefixed = _prefix + capitalize(prop)
	const test = [prop, prefixed]

	for(let i = 0; i < test.length; i += 1) {
		if(el && el.style[test[i]] !== undefined) {
			return test[i]
		}
	}
	return false
}



/**
 * Return the prefix animationEnd event name
 * @return {String} the animation end string
 */
export const animationEnd = (function(){
	const el = document.createElement('div')
	const transEndEventNames = {
		WebkitTransition : 'webkitAnimationEnd',
		MozTransition    : 'animationend',
		OTransition      : 'oAnimationEnd oanimationend',
		transition       : 'animationend'
	}
	for (let name in transEndEventNames) {
		if (el.style[name] !== undefined) {
			return transEndEventNames[name]
		}
	}
	return false
})()


export const lock = () => {
	const $window = $(window)
	const $body = $('body')
	let windowTop

	return {
		capture() {
			windowTop = $window.scrollTop()
			$body.css({position: 'fixed', height: '100%', top: windowTop * -1 + 'px', overflow: 'hidden', width: '100%'})
		},
		release() {
			$body.css({position: '', height: '', width: '', overflow: '', top: ''})
			$window.scrollTop(windowTop)
		}
	}
}

export function ajax(url) {
	const data = {}
	return $.ajax({
		url: url,
		type: 'get',
		data: data
	})
}

export function externalLinks() {
	Array.from(document.querySelectorAll('a')).forEach((el) => {
		if(local.pathname(el) === null || el.getAttribute('href').indexOf('.pdf') > -1) {
			el.setAttribute('target', '_blank')
			el.setAttribute('rel', 'noopener')
		}
	})
}


export const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
