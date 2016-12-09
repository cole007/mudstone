import Base from '../helpers/base'
import Expander from '../helpers/expander'


export class accordion extends Base {
	constructor(el) {
		super(el)

		new Expander(el, {
			init: true,
			button: '.js-expand-btn',
			activeClass: 'is-active',
			closeOthers: true,
			duration: 300,
			name: 'expander'
		})
	}
}
