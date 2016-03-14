import MegaMenu from '../helpers/megaMenu';

var menu;

function megaNav(container) {
	menu = new MegaMenu({
		container: container,
		btn: '.js-menu-btn',
		target: function($el) {
			return $el.next()
		},
		backBtn: '.js-menu-back',
		rootBtn: '.js-menu-root',
		activeClass: 'is-active',
		currentClass: '.is-current',
		openCurrentLevel: false,
		useAtBreakpoint: 1024,
	})
};



export { megaNav, menu };