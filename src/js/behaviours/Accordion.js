import Expander from '@/ui/expander'
import Behaviour from '@/core'

/**
 *
 * @extends Behaviour
 * @class Accordion
 */
export class Accordion extends Behaviour {
	
	/**
	 * @function constructor
	 * @param  {HTMLElement} el | the html element the behaviour is mounted on
	 * @return Accordion
	 */
	constructor(el) {
		super(el)
		new Expander(el)
	}
}
