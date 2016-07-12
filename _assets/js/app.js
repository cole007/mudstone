import WebFont from 'webfontloader';
import mud from './loader/behaviour';

// import svg4everybody from 'svg4everybody';
// object-fit polyfill https://github.com/bfred-it/object-fit-images
// import objectFitImages from 'object-fit-images';

import $ from 'jquery';
import Expand from './helpers/expand';


mud.Behaviours.accordion = function(container) {

	var accordion = new Expand({
		wrapper: $(container),
		button: '.button',
		closeOthers: false,
		activeClass: '.is-active',
		duration: 1000,
		openStart: function(el, target) {
			console.log('openStart callback');
			console.log('this', this, 'el', el, 'target', target);
		},
		openComplete: function(el, target) {
			console.log('openComplete callback');
			console.log('this', this, 'el', el, 'target', target);
		},
		closeStart: function(el, target) {
			console.log('closeStart callback')
			console.log('this', this, 'el', el, 'target', target);
		},
		closeComplete: function(el, target) {
			console.log('closeComplete callback')
			console.log('this', this, 'el', el, 'target', target);
		},
		onTick: function(v, el, target) {
			console.log('this', this, 'v', v, 'el', el, 'target', target);
		
		}
	});

}

// https://github.com/typekit/webfontloader
WebFont.load({
	// google: { families: ['Droid Sans', 'Droid Serif'] },
	typekit: { id: 'vcl8lns' },
	// custom: {
	// 	families: ['My Font', 'My Other Font:n4,i4,n7'],
	// 	urls: ['/_assets/css/fonts.css']
	// }
	active() {
		mud.onLoadFont();
	},
	inactive() {
		mud.onLoadFont();
	}
});

window.onload = function(){
    mud.onWindowLoad();
};

$(function() {
	mud.loadBehaviour();
	mud.loadRequestAnimationFrame();
	// svg4everybody();
	// var someImages = document.querySelectorAll('img.u-fit');
	// objectFitImages(someImages);
});

