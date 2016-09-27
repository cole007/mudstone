import { lory } from 'lory.js';
import Viewport from '../helpers/viewport';
import raf from 'raf';

export const carousel = (container) => {
    // must get total before kicking off the carousel
    const $container = $(container);
    const total = container.querySelectorAll('.js-carousel-item').length;
    const viewport = new Viewport();
    const slidesToScroll = getSlidesToScroll(viewport.query());
    const opts = {
            infinite: total,
            enableMouseEvents: true,
            slidesToScroll: slidesToScroll,
            slideSpeed: 1500,
            ease: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
            classNameFrame: 'js-carousel-frame',
            classNameSlideContainer: 'js-carousel-list',
            classNameActiveSlide: 'is-active',
            classNamePrevCtrl:'js-carousel-prev',
            classNameNextCtrl: 'js-carousel-next'
        }
    const slider = slider || lory(container, opts);
    const delay = 5000;

    let handle;
    let timeout;
    let i = -1;

    function loop(slider) {
        timeout = setTimeout(() => {
            i = i < total - 1 ? slider.returnIndex() + 1 : 0;
            handle = raf(loop.bind(null, slider));
            slider.slideTo(i);
        }, delay);
    }

    function handleEnter() {
        raf.cancel(handle);
        clearTimeout(timeout);
    }

    function handleLeave() {
        loop(slider);
    }

    function getSlidesToScroll(query) {
        let items;
        switch(query) {
            case 'desktop':
                items = 6
                break;
            case 'tablet': 
                items = 4
                break;
            case 'mobile': 
                items = 2
                break;
        }
        return items
    }

    loop(slider);

    $container
        .on('mouseenter', handleEnter)
        .on('mouseleave', handleLeave);

    viewport.on('change', (prev, current) => {
        const count = getSlidesToScroll(current);
        Object.assign(opts, {slidesToScroll: count});
        slider.setup();
    });

}