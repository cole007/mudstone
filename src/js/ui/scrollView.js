import { DomClosest, DomCss } from '@/utils/dom'

export default class ScrollView {
	/**
	 *
	 * @memberOf ui/ScrollView
	 * @function constructor
	 * @param  {HTMLElement} el
	 * @param {Object} options
											selector {String}, Selector for elements to animate
											group {String}, Optional selector for grouping elements
											delay {Number}: Delay between transitions
											duration {Number}: Duration of transition
											exit {Object}: CSS properties for elements outside of the viewport
											entrance {Object}: CSS properties for elements inside of the viewport
											threshold {Number}: A threshold of 1.0 means that when 100% of the target is visible within the element specified by the root option, the callback is invoked
											repeat {Boolean}: Repeat animations?
	 */
	constructor(el, options = {}) {
		this.exit = options.exit || { opacity: 0 }
		this.entrance = options.entrance || { opacity: 1 }
		this.repeat = options.repeat || false

		const delay = options.delay || 500
		const duration = options.duration || 2000
		const easing = options.easing || 'ease'
		const threshold = options.threshold || 0.01
		const group = options.group || '[data-reveal-group]'
		const selector  = options.selector || '[data-reveal-item]'

		// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
		const thresholdSets = []
		for(let i = 0; i <= 1.0; i += threshold) {
			thresholdSets.push(i)
		}

		this.observer = new IntersectionObserver(this.inview.bind(this), {
			root: null,
			rootMargin: '0px',
			threshold: thresholdSets
		})

		// build a one dimensional array of nodes
		this.nodes = [...el.querySelectorAll(selector)].reduce((collection, node) => {
			const parent = DomClosest(node, group)
			if(parent) {
				[...parent.querySelectorAll(selector)].forEach((child, index) => {
					DomCss(child, {
						'transition': `all ${duration}ms ${index * delay}ms ${easing}`
					})
					if(!collection.includes(child)) {
						collection.push(child)
					}
				})
			} else {
				DomCss(node, {
					'transition': `all ${duration}ms ${delay}ms ${easing}`
				})
				collection.push(node)
			}
			this.observer.observe(node)
			return collection
		}, [])

	}

	/**
	 * 
	 * @function inview
	 * @param  {IntersectionObserverEntry } entries
	 * @return void
	 */
	inview(entries) {
		entries.forEach((entry) => {
			/*
				The current dom node
			*/
			const { target } = entry
			/*
				Get the style object
			*/
			const css = entry.isIntersecting ? this.entrance : this.exit

			/*
				if we do not want to repeat the animations remove the element from the IntersectionObserver
			*/
			if(entry.isIntersecting && !this.repeat) {
				this.observer.unobserve(target)
			}
			/*
				Apply the css to the current target
			*/
			DomCss(target, css)	
		})
	}
}
