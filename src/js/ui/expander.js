

import { mergeOptions } from '@/utils/helpers'
/**
 * Accordion UI Component
 *
 */

export default function accordion(el, opts = {}) {

	// default settings
	const defaults = {
		activeIndex: null,
		closeOthers: false,
		open: false,
		selector: '[data-accordion-btn]',
		name: 'accordion',
		init: true,
		buttonActiveClass: 'is-active',
		contentActiveClass: 'is-expanded',
		duration: 300,
		breakpoint: null,
		easing: function defaultEasing(t, b, c, d) {
			if((t /= d / 2) < 1) return c / 2 * t * t + b
			return -c / 2 * ((--t) * (t - 2) - 1) + b // eslint-disable-line
		}
	}

	let current
	let activated = false

	

	const settings = mergeOptions(defaults, opts, el, 'accordionOptions')

	let {
		breakpoint,
		buttonActiveClass,
		contentActiveClass,
		duration,
		easing,
		init,
		selector,
		closeOthers,
		activeIndex,
		open,
		name
	} = settings
	
	if(breakpoint) {
		init = false
	}

	let panes = []

	/**
	 * Animate $target from start to end
	 * @param {HTMLElement} $target
	 * @param {Object} options
	 * @return {Promise}
	 */
	function animate($target, options = {}) {
		const { easing, duration, start, end } = options
		const condition = (lastTick, next, end) => {
			return (start < end) ? (next < end && lastTick <= next) : (next > end && lastTick >= next)
		}



		let next = null
		let timeElapsed = null
		let timeStart = null
		let frame = null
		return new Promise((resolve) => { 
			const loop = (currentTime) => {
				let lastTick = next || start
				if(!timeStart) timeStart = currentTime
				timeElapsed = currentTime - timeStart

				next = Math.round(easing(timeElapsed, start, end - start, duration))
				if(condition(lastTick, next, end)) {
					frame = window.requestAnimationFrame(loop)
					$target.style.height = `${next}px`
				} else {
					resolve()
					window.cancelAnimationFrame(frame)
					timeElapsed = null
					timeStart = null
					frame = null
					lastTick = null
				}
			}
			frame = window.requestAnimationFrame(loop)
		})
	}

	/**
	 * Setup panels, add accessibility attributes
	 *
	 * @return {void}
	 */
	function createPanels() {
		panes = [...el.querySelectorAll(selector)].map(($button, index) => {
			$button.setAttribute('data-accordion-index', index)
			const { target } = $button.dataset
			const $target = el.querySelector(target)
			const state = open 
												? true
												: (!open && index === activeIndex ? true : false) 
													? true
													: false
			$button.setAttribute('aria-expanded', state)
			$button.setAttribute('aria-selected', state)
			$button.setAttribute('aria-controls', `${name}-${index}`)
			if(state) {
				$button.classList.add(buttonActiveClass)
				$target.classList.add(contentActiveClass)
			}
			$target.setAttribute('aria-labelledby', `${name}-${index}`)
			$target.setAttribute('aria-hidden', !state)
			$target.setAttribute('role', 'tabpanel')	
			return {
				$button,
				$target,
				index,
				open: state,
				isRunning: false
			}
		})

	}

	/**
	 * function called after the transition has completed
	 *
	 * @return {Accordion}
	 */
	function onEnd(pane) {
		const { $target, $button, open } = pane
		$target.style.willChange = null
		$target.style.height = null
		$target.style.display = null
		pane.isRunning = false
		$button.setAttribute('aria-expanded', open)
		$button.setAttribute('aria-selected', open)
		$target.setAttribute('aria-hidden', !open)
	}

	function delegated(e) {
		const event = e
		let { target } = e
		function match(target) {
			if(typeof target.matches === 'function') {
				if(target && target.matches(selector)) {
					clickHandle(event, target)
					return
				} 
				match(target.parentNode)
			}
		}

		match(target)
	}

	/**
	 * Attach the eventlisteners
	 *
	 * @private
	 * @return {void}
	 */
	function bindEvents() {
		el.addEventListener('click', delegated)
	}

	/**
	 * Remove the eventlisteners
	 *
	 * @private
	 * @return {void}
	 */
	function unBindEvents() {
		el.removeEventListener('click', delegated)
	}



	/**
	 * The delegated click event, open/close accordion pane
	 *
	 * @param {Object} event
	 * @param {HTMLElement} element
	 * @return {void}
	 */
	function clickHandle(event, element) {
		event.preventDefault()
		const { accordionIndex } = element.dataset
		const open = element.getAttribute('aria-expanded') === 'true' ? true : false
		if(closeOthers && current) {
			const { index } = current
			if(index !== parseInt(accordionIndex)) collapse(index)
		}
		open === true ? collapse(accordionIndex) : expand(accordionIndex)
		current = panes[accordionIndex]
	}

	/**
	 * Open animation
	 *
	 * @param {Number} index
	 * @return {void}
	 */
	function expand(index) {
		const pane = panes[index]
		if(!pane.isRunning) {
			const { $target, $button } = pane
			$target.style.display = 'block'
			const { height } = $target.getBoundingClientRect()
			$target.style.height = 0
			$target.style.willChange = 'height'
			pane.isRunning = true
			pane.open = true

			animate($target, {
				start: 0,
				end: Math.round(height),
				duration: duration,
				easing: easing
			}).then(() => {
				onEnd(pane)
				$button.classList.add(buttonActiveClass)
				$target.classList.add(contentActiveClass)
			})
		}
	}
	

	/**
	 * Close animation
	 *
	 * @param {Number} index
	 * @return {void}
	 */
	function collapse(index) {


		const pane = panes[index]
		if(!pane.isRunning) {
			pane.open = false
			const { $target, $button } = pane
			const { height } = $target.getBoundingClientRect()
			$target.style.height = `${height}px`
			$target.style.willChange = 'height'
			
			pane.isRunning = true
			animate($target, {
				start: Math.round(height),
				end: 0,
				duration: duration,
				easing: easing
			}).then(() => {
				onEnd(pane)
				$button.classList.remove(buttonActiveClass)
				$target.classList.remove(contentActiveClass)
			})
		}
	}


	/**
	 * Initalize accordion, add aria attributes, bind events, open/close etc etc
	 *
	 * @return {Accordion}
	 */
	function initalize() {
		if(activated) return
		activated = true
		bindEvents()
		el.setAttribute('role', 'tablist')
		el.setAttribute('aria-multiselectable', closeOthers)
		createPanels()
	}

	/**
	 * Destroy component, remove event listeners 
	 *
	 * @return {Accordion}
	 */
	function destroy() {
		if(!activated) return
		activated = false
		unBindEvents()
		el.removeAttribute('role')
		el.removeAttribute('aria-multiselectable')
		panes.forEach(({$button, $target}) => {
			$button.classList.remove(buttonActiveClass)
			$button.removeAttribute('aria-expanded')
			$button.removeAttribute('aria-selected')
			$button.removeAttribute('aria-controls')
			$button.removeAttribute('role', 'tab')
			$target.removeAttribute('aria-hidden')
			$target.removeAttribute('aria-labelledby')
			$target.removeAttribute('role', 'tabpanel')
			$target.classList.remove(contentActiveClass)
			$target.removeAttribute('style')
		})
	}

	init && initalize()

	return {
		initalize,
		expand,
		collapse,
		destroy,
		settings
	}
} 
