import $ from 'jquery';
import tool from '../helpers/tools';




function menu(container) {
	function clickHandle(e) {
		e.preventDefault();
		tool.animateInAnimdateOut({
			el: '.js-menu',
			openStart: function() {
				console.log('openStart');
			},
			openComplete: function() {
				console.log('openComplete');
			},
			closeStart: function(){
				console.log('closeStart');
			},
			closeComplete: function(){
				console.log('closeComplete');
			}
		});
	}
	container.on('click', 'a', clickHandle);
}

export default menu;