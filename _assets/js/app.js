import WebFont from 'webfontloader';
import mud from './loader/behaviour';

import { obj1, obj2, obj3 } from './behaviours/obj';

mud.Behaviours.obj1 = obj1;
mud.Behaviours.obj2 = obj2;
mud.Behaviours.obj3 = obj3;


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
	// svg4everybody();
	// var someImages = document.querySelectorAll('img.u-fit');
	// objectFitImages(someImages);
});
