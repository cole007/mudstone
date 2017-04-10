import verge from 'verge'
import Concert from 'concert'

/*
	// just a plain old scroll, a wrapper around the 'smartscroll' event
	const scroll = new ScrollView()
	// custom event object, detail property has pageYOffset and direction values
	scroll.on('dom:scroll', (evt) => {
		log(evt)
	})

	// or do some fancy stuff with in/out of view elements

	<div data-behaviour="inview">
		<div class="js-sv"></div> * 10000
	</div>

	const view = new ScrollView(el, {
		selector: '.js-sv'
	})
	// the evt object has two properties, element and the custom event
	view.on('element:entrance', (evt) => {
		evt.element.style.opacity = 1
		evt.element.style.backgroundColor = '#e4a'
	})

	view.on('element:exit', (evt) => {
		evt.element.style.opacity = 0
	})

*/


export default class ScrollView extends Concert {
	constructor(el, obj = {}) {
		super()
		this.container = el || document
		this.selector = obj.selector || '.js-sv'
		this.elements = Array.from(this.container.querySelectorAll(this.selector))
		this.reverse = [...this.elements.reverse()]
		this.dispatch = this.dispatch.bind(this)
		this.initialize()
	}

	dispatch(evt) {
		const {
			direction
		} = evt.detail
		if(this.elements.length > 0) {
			this.inView(direction)
			this.outView(direction)
		}
		this.trigger('dom:scroll', evt)
	}

	inView(direction = 'down') {
		this.elements.filter((element) => verge.inY(element))
			.forEach((element) => {
				this.trigger('element:entrance', {
					element,
					direction
				})
			})
	}

	outView(direction = 'up') {
		const array = direction === 'up' ? 'reverse' : 'elements'
		this[array]
			.filter((element) => !verge.inY(element))
			.filter((element) => verge.inY(element, 1200))
			.forEach((element) => {
				this.trigger('element:exit', {
					element,
					direction
				})
			})
	}

	initialize() {
		window.addEventListener('smartscoll', this.dispatch)
	}

	destroy() {
		window.removeEventListener('smartscoll', this.dispatch)
	}
}
