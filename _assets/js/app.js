import WebFont from 'webfontloader';
import mud from './loader/behaviour';

// import svg4everybody from 'svg4everybody';
// object-fit polyfill https://github.com/bfred-it/object-fit-images
// import objectFitImages from 'object-fit-images';

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

