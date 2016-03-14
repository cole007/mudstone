import verge from 'verge';
import Viewport from  '../helpers/viewport';
import debounce from 'lodash.debounce';
import prefix from '../helpers/prefix';

function sticky(container) {

	var stickyTop = container.position().top,
		viewport = new Viewport(),
		$measure = $('.js-sticky-measure'),
		height = container.outerHeight(true),
		bottom = $measure.outerHeight(true) + $measure.position().top,
		frameTop = bottom - viewport.height,
		diff = viewport.height - height,
		transformVendor = prefix.css3('transform'),
		$window = $(window),
		lastScrollTop = $window.scrollTop();

		function handleScroll(e) {
			var s = $window.scrollTop();
			if(s < lastScrollTop) {
				scrollTest(s);
			} else {
				if(!verge.inViewport(container)) {
					scrollTest(s,function() {
						var r = frameTop - height + diff;
						container.css({[transformVendor]: `translate3d(0,${r}px,0)`});
					});
				}
			}
		   lastScrollTop = s;
		};
		function scrollTest(s,cb) {
			if(s < stickyTop) {
				container.css({[transformVendor]: `translate3d(0,0px,0)`});
			} else {
		   		var x1 = s - height;
		   		var x2 = x1 + height;
		   		if(x2 < frameTop + diff) {
					container.css({[transformVendor]: `translate3d(0,${x1 + 50}px,0)`});
				} else {
					if(cb) {
						cb();
					}
				}
			}
		};

		$window.off('scroll', handleScroll).on('scroll', debounce(handleScroll, 100));
}


export default sticky;