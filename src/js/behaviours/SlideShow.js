import Behaviour from '@/core'
import Slide from '@/ui/slide'

/**
 *
 * @extends Behaviour
 * @class SlideShow
 */
export class SlideShow extends Behaviour {
	
	/**
	 * @function constructor
	 * @param  {HTMLElement} el | the html element the behaviour is mounted on
	 * @return Accordion
	 */
	constructor(el) {
		super(el, 'SlideShow')
		this.slide = new Slide(el)
	}

	unmount() {
		this.slide.destroy()
	}
}
