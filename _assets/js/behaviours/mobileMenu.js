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

		setTimeout(() => {
			this._removeEvents()
		}, 5000)

	}

	actions() {
		return [
			'click .menu__item > a : clickHandle',
			'click .logo : otherClickHandle'
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
