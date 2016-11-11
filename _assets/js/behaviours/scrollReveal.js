import Base from '../helpers/base'
import ScrollReveal from 'scrollreveal'



export class scrollReveal extends Base {
	constructor() {
		super()
		const sr = new ScrollReveal()
		sr.reveal('.js-reveal', { duration: 300 }, 50)
		this.events.on('pagination', () => {
			sr.sync()
		})
	}
}
