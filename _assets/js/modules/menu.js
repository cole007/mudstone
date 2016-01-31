import $ from 'jquery';
import Transition from '../helpers/transition';
import utils from '../helpers/utils';
import Viewport from '../helpers/viewport';
import config from '../dependencies/config';

function menu(container) {
	var lock = utils.lock();
	var $btn = $('.menu__btn');
	var viewport = new Viewport();
	var { breakpoints } = config;
	
	var transition = new Transition({
		el: '.js-menu',	
		openStart: function() {
			$(this.el).addClass('is-animating-in');
			$btn.addClass('is-active');
			lock.capture();
			console.log('open start');
		},
		openComplete: function() {
			$(this.el).addClass('is-active').removeClass('is-animating-in');
			console.log('open complete');
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

	function clickHandle(e) {
		e.preventDefault();
		transition.trigger();
	}
	// if onLoad the viewport is smaller than tablet
	if(viewport.width < breakpoints.tablet) {
		container.on('click', '.menu__btn', clickHandle);
	}
	// watch for breakpoint changes
	// the function only gets called when a breakpoint changes
	viewport.change(function(prev, current) {
		if(prev === 'tablet' && current === 'desktop') {
			console.log('desktop');
			container.off('click', '.menu__btn', clickHandle);
		}
		if(prev === 'desktop' && current === 'tablet') {
			console.log('tablet');
			container.on('click', '.menu__btn', clickHandle);
		}
	});
}

export default menu;