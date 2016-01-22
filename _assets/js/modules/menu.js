import $ from 'jquery';
import animate from '../helpers/animate';
import utils from '../helpers/utils';




function menu(container) {
	var lock = utils.lock();

	function clickHandle(e) {
		e.preventDefault();
		animate.animateInAnimdateOut({
			el: '.js-menu',
			openStart: function() {
				console.log('openStart');
				//lock.capture();
			},
			openComplete: function() {
				console.log('openComplete');
			},
			closeStart: function(){
				//lock.release();
				console.log('closeStart');
			},
			closeComplete: function(){
				console.log('closeComplete');
			}
		});
	}
	container.on('click', '.menu__btn', clickHandle);
}

export default menu;