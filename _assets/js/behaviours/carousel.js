// https://github.com/meandmax/lory
import { lory } from 'lory.js';
import Viewport from '../helpers/viewport';

function carousel(container) {
    // expose the raw dom object
    var carousel = container,
        viewport = new Viewport(), 
        options = {
            infinite: false,
            enableMouseEvents: true,
            slidesToScroll: 1,
            slideSpeed: 500,
            ease: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
            classNameFrame: 'js-carousel-frame',
            classNameSlideContainer: 'js-carousel-list',
            classNameActiveSlide: 'is-active',
            classNamePrevCtrl:'js-carousel-prev',
            classNameNextCtrl: 'js-carousel-next'
        },
        slider = lory(carousel, options);

    function handleEvent(e) {
       console.log(e.detail);
    }
    // attach events, with vanila js
    carousel.addEventListener('before.lory.init', handleEvent);
    carousel.addEventListener('after.lory.init', handleEvent);
    carousel.addEventListener('before.lory.slide', handleEvent);
    carousel.addEventListener('after.lory.slide', handleEvent);
    // carousel.addEventListener('on.lory.resize', handleEvent);
    // carousel.addEventListener('on.lory.touchend', handleEvent);
    // carousel.addEventListener('on.lory.touchmove', handleEvent);
    // carousel.addEventListener('on.lory.touchstart', handleEvent);
    // carousel.addEventListener('on.lory.destroy', handleEvent);
    // initalize
    // viewport.change(function(curr, prev) {
    //     if(curr === 'tablet') {
    //         slider.destroy();
    //         slider = lory(slide, $.extend({}, options, {slidesToScroll: 2}));
    //     }
    // });
}

export default carousel;