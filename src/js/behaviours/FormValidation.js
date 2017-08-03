import Behaviour from '@/core'
import Validation from '@/ui/Validation'


/**
 *
 * @extends Behaviour
 * @class FormValidation
 */
export class FormValidation extends Behaviour {
	
	/**
	 * @function constructor
	 * @param  {HTMLElement} el | the html element the behaviour is mounted on
	 * @return Accordion
	 */
	constructor(el) {
		super(el)
		this.validate = new Validation(el)
	}

	unmount() {
		this.validate.destroy()
	}
}