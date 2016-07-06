import Tweezer from 'tweezer.js';

function scrollTo(target, end, e) {
    // we don't know how many arugments are going to be supplied
    // so loop through them, if the argument has a property of 'type'
    // then clear preventDefault
    Array.prototype.slice.call(arguments).forEach((e) => e.type ? e.preventDefault() : null);

    new Tweezer({
        start: window.scrollY,
        end: target
    }).on('tick', v => window.scrollTo(0, v)).on('done', () => {
        typeof end === 'function' ? end() : '';
    }).begin();
};

export default scrollTo;