import Base from '../helpers/base'
import Expander from '../helpers/expander'


export class accordion extends Base {
	constructor(el) {
		super(el)

		const accordion = new Expander(el, {
			init: true
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
