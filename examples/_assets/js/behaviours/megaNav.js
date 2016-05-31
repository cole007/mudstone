import MegaMenu from '../helpers/megaMenu';

var menu;

function megaNav(container) {
	menu = new MegaMenu({
		container: $(container),
		btn: '.js-menu-btn',
		target: ($btn) => $btn.next(),
		backBtn: '.js-menu-back',
		rootBtn: '.js-menu-root',
		activeClass: 'is-active',
		currentClass: '.is-current',
		openCurrentLevel: false,
		useAtBreakpoint: 1024,
		callback: function(e) {
			console.log('this', this, 'e', e);
		}
	})
};



export { megaNav, menu };