import Wallop from 'Wallop';
import Hammer from 'hammerjs';

var timeout;
var raf;
var delay = 5000;

function pager(container, slide) {
	var $activePagerLink;
	var total = container.find('.js-carousel-item').length;
	var pagerWrap = `<ul class="carousel__pager"></ul>`;
	var activeClass = 'is-active';
	var pagerItem = '';

	for(var i = 0; i < total; i++) {
		(function(k) {
			pagerItem += `<li class="carousel__pager-item"><a href="#" class="carousel__pager-link" data-index="${i}"></a></li>`;
		})(i)
	};

	$(pagerItem).appendTo($(container)).wrapAll(pagerWrap);

	slide.on('change', function(e) {
		if($activePagerLink !== undefined) $activePagerLink.removeClass(activeClass);
		$activePagerLink = $('.carousel__pager-item').eq(e.detail.currentItemIndex).children('a');
		$activePagerLink.addClass(activeClass);
	});

	function pagerHandle(e) {
		e.preventDefault();
		var index = $(this).data('index');
		slide.goTo(index);
		$activePagerLink.removeClass(activeClass);
		$(this).addClass(activeClass);
		$activePagerLink = $(this);
		// cancel the cycle loop
    	clearTimeout(timeout);
    	// clear the animationFrame
    	window.cancelAnimationFrame(raf);
    	// restart the cycle
    	cycle(slide)
	}

	
	$(container).on('click', '.carousel__pager-link', pagerHandle);
}

function cycle(slide) {

    timeout = setTimeout(function() {
        raf = window.requestAnimationFrame(cycle.bind(null, slide));
		slide.next();
    }, delay);

}


function gesture(container, slide) {
		// create a manager for that element 
	var mc = new Hammer.Manager(container, {
	    touchAction: 'auto',
	    recognizers: [
	        [Hammer.Pan,{ direction: Hammer.DIRECTION_HORIZONTAL }],
	    ]
	});
	var Pan = new Hammer.Pan();
	mc.add(Pan);
	mc.on('panend', function(e) {
	   if(e.additionalEvent === 'panleft') {
	   		slide.previous();
	   } else if(e.additionalEvent === 'panright') {
	   		slide.next();
	   }
	});
}

function slide(container) {
	var slide = {};
	slide = new Wallop(container, {
		// buttonPreviousClass: 'js-slide-prev',
		// buttonNextClass: 'js-slide-next',
		itemClass: 'js-carousel-item',
		currentItemClass: 'carousel__item--current',
		showPreviousClass: 'carousel__item--showPrevious',
		showNextClass: 'carousel__item--showNext',
		hidePreviousClass: 'carousel__item--hidePrevious',
		hideNextClass: 'carousel__item--hideNext',
		carousel: true
	});

	pager(container, slide);
	cycle(slide);
	gesture(container, slide);
};

export default slide;