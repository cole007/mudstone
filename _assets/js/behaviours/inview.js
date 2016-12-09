import Base from '../helpers/base'
import ScrollView from '../helpers/scrollView'

export class inview extends Base {
	constructor(el) {
		super(el)
		// just a plain old scroll, a wrapper around the 'smartscroll' event
		const scroll = new ScrollView()
		// custom event object, detail property has pageYOffset and direction values
		scroll.on('dom:scroll', (evt) => {
			log(evt)
		})
		// or do some fancy stuff with in/out of view elements
		const view = new ScrollView(el)
		// the evt object has two properties, element and the custom event
		view.on('element:entrance', (evt) => {
			evt.element.style.opacity = 1
			evt.element.style.backgroundColor = '#e4a'
		})

		view.on('element:exit', (evt) => {
			evt.element.style.opacity = 0
		})
	}
}
