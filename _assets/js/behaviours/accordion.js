import Base from '../helpers/base'
import Expander from '../helpers/expander'


export class accordion extends Base {
	constructor(el) {
		super(el)

		const accordion = new Expander(el, {
			init: true,
			button: '.js-expand-btn',
			activeClass: 'is-active',
			closeOthers: false,
			duration: 300,
			name: 'expander'
		})

		accordion.on('before:open', (...args) => {
			log('before:open', ...args)
		})
		accordion.on('after:open', (...args) => {
			log('after:open', ...args)
		})
		accordion.on('before:close', (...args) => {
			log('before:close', ...args)
		})
		accordion.on('after:close', (...args) => {
			log('after:close', ...args)
		})
	}
}
