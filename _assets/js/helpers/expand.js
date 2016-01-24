import $ from 'jquery';
import Tweezer from 'tweezer.js';
import { debounce } from 'lodash';

function expand(opts) {
	// options
	let $wrapper = opts.wrapper;
	let button = opts.button || '.button';
	let closeOthers = opts.closeOthers || true;

	let $window = $(window);
	let collection = [];

	function setHeight() {
		collection.forEach((element) => element.height = (element.state === true) ? getHeight(element.$target) : element.$target.outerHeight(true));
	};

	function getHeight($target) {
		var height = 0;
		$target.children().each(function() {
			height += $(this).outerHeight(true);
		})	
		return height;
	}

	function tween($el) {
		var index = $el.data('expand-index');
		var obj = collection[index];

		if(obj.state === true) {
			obj.$target.css({
				display: 'block',
				height: 0,
				overflow: 'hidden',
				position: 'relative'
			});
		}
		if (!obj.isRunning) {
			console.log('running');
			new Tweezer({
				start: obj.currentHeight,
				end: obj.state ? obj.height : 0
			})
			.on('tick', (v) => obj.$target.css({height: v + 'px', overflow: 'hidden', position: 'relative'}))
			.on('done', ()=> {
				obj.shouldGrow = !opts.shouldGrow;
				obj.isRunning = false;
				if(obj.state === true) {
	 				obj.$target.css({overflow: '', position: '', height: ''}).addClass('is-active');
	 				obj.$el.addClass('is-active');
				} else {
					obj.$target.css({display: 'none'}).removeClass('is-active');
	 				obj.$el.removeClass('is-active');
				}
			})
			.begin();
			obj.isRunning = true;
		}
	}

	function closeOther(i) {
		collection.find(function(el, index) {
			if(el.state === true && i !== index) {
				el.state = !el.state;
				el.currentHeight = el.height;
				tween(el.$el);
				el.$el.removeClass('is-active');
			}
		});
	}

	function clickHandle(e) {
		e.preventDefault();
		var $this = $(this);
		var index = $this.data('expand-index');
		var el = collection[index];
		if(closeOthers) closeOther(index);
		el.currentHeight = el.state === true ? el.height : 0;
		el.state = !el.state;
		if(!el.isRunning) {
			tween(el.$el);
		}
	}

	function init() {
		$wrapper.find(button).each(function(i) {
			var $target = $($(this).data('target'));
			var state = $(this).hasClass('is-active') ? true : false;
			// if active, add the active class to the target element
			if(state === true) {
				$target.addClass('is-active');
			}

			var height = (state === true) ? getHeight($target) : $target.outerHeight(true);
			$(this).attr('data-expand-index', i);
			collection.push({
				$el: $(this),
				$target: $target,
				state: state,
				height: height,
				currentHeight:  $(this).hasClass('is-active') === true ? height : 0,
				isRunning: false,
				shouldGrow: state
			});

		});
	}
	init();
	
	$window.on('resize', debounce(setHeight, 300));
	$wrapper.on('click', button, clickHandle);
}

export default expand;