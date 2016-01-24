import $ from 'jquery';
import transition from '../helpers/transition';
import utils from '../helpers/utils';




function menu(container) {
	var lock = utils.lock();
	function clickHandle(e) {
		e.preventDefault();
		transition.animateInAnimdateOut({
			el: '.js-menu',	
			openStart: function() {
				$(this.el).addClass('is-animating-in');
				lock.capture();
			},
			openComplete: function() {
				$(this.el).addClass('is-active').removeClass('is-animating-in');
				$('body').css({position: 'fixed', height: '100%', width: '100%'});
			},
			closeStart: function(){
				$(this.el).addClass('is-animating-out');
				$('body').css({position: '', height: '', width: ''});
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