import Base from '../helpers/base'
import SideNav from '../helpers/sidenav'

export class mobileMenu extends Base {
	constructor(el) {
		super(el)
		const viewport = this.viewport

		const sidenav = new SideNav(el.querySelector('.js-mobile-nav-btn'), {
			init: false,
			lock: true
		})

		viewport.at(
			'(max-width: 46.25em)',
			(e) => {
				sidenav.addEvents()
				log(e)
			},
			(e) => {
				sidenav.destroy()
				log(e)
			}
		)
	}
}
