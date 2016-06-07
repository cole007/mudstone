import WebFont from 'webfontloader';
import mud from './dependencies/load-behaviour';

import reveal from './behaviours/reveal';

mud.Behaviours.reveal = reveal;


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
