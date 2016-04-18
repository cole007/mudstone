// https://github.com/meandmax/lory
import { lory } from 'lory.js';
import Viewport from '../helpers/viewport';

function carousel(container) {

    var viewport = new Viewport(),
        width = viewport.width,
        slidesToScroll = 1;
    switch (true) {
      case (width < 1024 && width >= 768): 
        slidesToScroll = 3;
        break;
      case (width >= 1024): 
        slidesToScroll = 5;
        break;
    }
    var opts = {
            infinite: false,
            enableMouseEvents: true,
            slidesToScroll: slidesToScroll,
            slideSpeed: 500,
            ease: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
            classNameFrame: 'js-carousel-frame',
            classNameSlideContainer: 'js-carousel-list',
            classNameActiveSlide: 'is-active',
            classNamePrevCtrl:'js-carousel-prev',
            classNameNextCtrl: 'js-carousel-next'
        }
    var slider = lory(container, opts);
    // initalize
    viewport.change(function(curr, prev) {
        if(curr === 'mobile') {
            slider.destroy();
            slider = lory(container, $.extend({}, opts, {slidesToScroll: 1}));
        }
        if(curr === 'tablet') {
            slider.destroy();
            slider = lory(container, $.extend({}, opts, {slidesToScroll: 3}));
        }
        if(curr === 'desktop') {
            slider.destroy();
            slider = lory(container, $.extend({}, opts, {slidesToScroll: 5}));
        }
    });
}

export default carousel;