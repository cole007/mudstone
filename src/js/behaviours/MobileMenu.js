import SideNav from '@/ui/SideNav'
import Behaviour from '@/core'

/**
 *
 * @extends Behaviour
 * @class MobileMenu
 */
export class MobileMenu extends Behaviour {
	
	/**
	 * @function constructor
	 * @param  {HTMLElement} el | the html element the behaviour is mounted on
	 * @return MobileMenu
	 */
	constructor(el) {
		super(el)
		new SideNav(el)
	}

	
}
