import ModalScreens from '@/ui/ModalScreens'
import Behaviour from '@/core'

/**
 *
 * @extends Behaviour
 * @class ModalSteps
 */
export class ModalSteps extends Behaviour {

	/**
	 * @function constructor
	 * @param  {HTMLElement} el | the html element the behaviour is mounted on
	 * @return ModalSteps
	 */
	constructor(el) {
		super(el)
		this.screens = new ModalScreens(el)
	}
}
