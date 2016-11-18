import Base from '../helpers/base'
import SideNav from '../helpers/sidenav'

export class mobileMenu extends Base {
	constructor(el) {
		super(el)
		const viewport = this.viewport
		/*const sidenav = */new SideNav(el.querySelector('.js-mobile-nav-btn'), {
			init: viewport.width > 960 ? false : true,
			lock: true
		})
	}

	actions() {
		return [
			'click .menu__item > a : clickHandle'
		]
	}

	clickHandle(e) {
		e.preventDefault()
		log('menu item clicked')
	}

	otherClickHandle(e) {
		e.preventDefault()
		log('logo clicked')
	}
}
