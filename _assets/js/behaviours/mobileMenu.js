import Base from '../helpers/base'
import SideNav from '../helpers/sidenav'

export class mobileMenu extends Base {
	constructor(el) {
		super(el)
		const viewport = this.viewport

		const sidenav = new SideNav(el.querySelector('.js-mobile-nav-btn'), {
			init: viewport.width > 960 ? false : true,
			lock: true
		})

		this.events.on('page:ready', () => {
			sidenav.open && sidenav.hideSideNav()
		})

		viewport.on('resize', (view) => {
			const { width } = view
			if(width > 960 && sidenav.state === true) {
				sidenav.destroy()
			}
			if(width <= 960 && sidenav.state === false) {
				sidenav.addEvents()
			}
		})
	}
}
