import Base from '../helpers/base'
import Slide from '../helpers/slide'



export class carousel extends Base {
	constructor(el) {
		super(el)
		this.carousel = new Slide(el, {
			buttonPreviousClass: 'js-slide-prev',
			buttonNextClass: 'js-slide-next',
			itemClass: 'slide__item',
			currentItemClass: 'slide__item--current',
			showPreviousClass: 'slide__item--showPrevious',
			showNextClass: 'slide__item--showNext',
			hidePreviousClass: 'slide__item--hidePrevious',
			hideNextClass: 'slide__item--hideNext',
			carousel: true,
			autoplay: true,
			delay: 5000,
			gestures: true,
			pager: true
		})
	}
}
