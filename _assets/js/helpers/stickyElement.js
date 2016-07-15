import { ReqAnimation } from '../helpers/utils';
import Viewport from '../helpers/viewport';
import { css3 } from '../helpers/prefix';


export default function stickyElement(container) {
	const $container = $(container);
    const scroll = new ReqAnimation();
    const $stickyElement = $container.find('img');
    const $stickyContainer = $container;
    const viewport = new Viewport();

    function getSizes() {
    	const element = $stickyElement.outerHeight();
    	const container = $container.outerHeight()

    	return {
    		element,
    		container,
    		max: container - element,
    		start: $container.offset().top
    	}
    }

    var sizes = getSizes();

    viewport.resize(function() {
    	sizes = getSizes();
    })

    $stickyElement.css({
    	position: 'relative',
    	willChange: 'transform'
    })

    scroll.loop = () => {
    	const moveBy = window.pageYOffset - sizes.start;
        if(window.pageYOffset > sizes.start && moveBy < sizes.max) {
        	$stickyElement[0].style[css3('transform')] = `translate3d(0, ${moveBy}px, 0)`;
        }
    }
}