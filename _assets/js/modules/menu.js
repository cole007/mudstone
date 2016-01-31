import $ from 'jquery';
import transition from '../helpers/transition';
import utils from '../helpers/utils';

function menu(container) {
	var lock = utils.lock();
	var $btn = $('.menu__btn');
	function clickHandle(e) {
		e.preventDefault();
		transition.transitionInOut({
			el: '.js-menu',	
			openStart: function() {
				$(this.el).addClass('is-animating-in');
				$btn.addClass('is-active');
				lock.capture();
			},
			openComplete: function() {
				$(this.el).addClass('is-active').removeClass('is-animating-in');
			},
			closeStart: function(){
				$(this.el).addClass('is-animating-out');
				$btn.removeClass('is-active');
				lock.release();
			},
			closeComplete: function(){
				$(this.el).removeClass('is-animating-out is-active');
			}
		});
	}
	container.on('click', '.menu__btn', clickHandle);
}

export default menu;