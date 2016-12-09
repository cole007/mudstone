import Base from '../helpers/base'
import ScrollView from '../helpers/scrollView'

export class inview extends Base {
	constructor(el) {
		super(el)
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
