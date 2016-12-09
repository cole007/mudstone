import Wallop from 'Wallop'
import Hammer from 'hammerjs'
import raf from 'raf'

/*

Just a wrapper around Wallop
Adds gestures and pager buttons

<div class="slide slide--right" data-behaviour="carousel">
	<div class="slice__list js-slide-wrapper">
		<div class="slide__item js-slide-item"><img class="slide__img" src="https://source.unsplash.com/category/buildings/1600x900" width="1600" height="900"></div>
		<div class="slide__item js-slide-item"><img class="slide__img" src="https://source.unsplash.com/category/nature/1600x900" width="1600" height="900"></div>
		<div class="slide__item js-slide-item"><img class="slide__img" src="https://source.unsplash.com/category/people/1600x900" width="1600" height="900"></div>
		<div class="slide__item js-slide-item"><img class="slide__img" src="https://source.unsplash.com/category/technology/1600x900" width="1600" height="900"></div>
		<div class="slide__item js-slide-item"><img class="slide__img" src="https://source.unsplash.com/category/objects/1600x900" width="1600" height="900"></div>
	</div>
</div>

const carousel = new Slide(el, {
	buttonPreviousClass: 'js-slide-prev',
	buttonNextClass: 'js-slide-next',
	itemClass: 'slide__item',
	currentItemClass: 'slide__item--current',
	showPreviousClass: 'slide__item--showPrevious',
	showNextClass: 'slide__item--showNext',
	hidePreviousClass: 'slide__item--hidePrevious',
	hideNextClass: 'slide__item--hideNext',
	carousel: true,
	autoplay: true,
	delay: 5000,
	gestures: true,
	pager: true
})

*/

export default class Slide {
	constructor(el, options) {
		this.tag = el
		this.$tag = $(el)

		this.options = {
			buttonPreviousClass: 'js-slide-prev',
			buttonNextClass: 'js-slide-next',
			itemClass: 'm-slide__item',
			currentItemClass: 'm-slide__item--current',
			showPreviousClass: 'm-slide__item--showPrevious',
			showNextClass: 'm-slide__item--showNext',
			hidePreviousClass: 'm-slide__item--hidePrevious',
			hideNextClass: 'm-slide__item--hideNext',
			carousel: true
		}
		this.slide = new Wallop(el, Object.assign({}, this.options, options))
		this.slides = Array.from(this.tag.querySelectorAll(`.${options.itemClass}`))

		this.pagerWrapperHtml = options.pagerWrappeHtml || '<ul class="slide-pager"></ul>'
		this.pagerElClassName = options.pagerElClassName || 'slide-pager__item'

		options.pager && this.addPager()
		options.gestures && this.addGestures()

		if(options.autoplay) {
			this.timeout = undefined
			this.handle = undefined
			this.autoPlaySlide = this.autoPlaySlide.bind(this)
			this.autoPlaySlide(this.slide, options.delay)
			this.slide.on('change', () => {
				clearTimeout(this.timeout)
				raf.cancel(this.handle)
				this.autoPlaySlide(this.slide, options.delay)
			})
		}

	}

	addGestures() {
		this.mc = new Hammer.Manager(this.tag, {
			touchAction: 'auto',
			recognizers: [
				[Hammer.Pan,{ direction: Hammer.DIRECTION_HORIZONTAL }]
			]
		})
		const Pan = new Hammer.Pan()
		this.mc.add(Pan)
		this.mc.on('panend', (e) => {
			if(e.additionalEvent === 'panleft') {
				this.slide.previous()
			} else if(e.additionalEvent === 'panright') {
				this.slide.next()
			}
		})
	}

	addPager() {
		const $pagerEl = $(this.pagerElClassName)

		this.pagerWrapper = this.$tag.append($(this.pagerWrapperHtml))
		this.pagerEl = this.slides
												.map((slide, index) => `<li aria-role="button" data-target='${index}' class='${this.pagerElClassName} ${index === 0 ? 'is-active' : ''}'><button class="button"></button></li>`)
												.reduce((acc, current) => acc + current, '')
		$('.slide-pager').append(this.pagerEl)

		this.$tag.on('click', `.${this.pagerElClassName}`, (e) => {
			const $btn = $(e.currentTarget)
			const index = $btn.data('target')
			$btn.addClass('is-active').siblings('li').removeClass('is-active')
			this.slide.goTo(index)
		})

		this.slide.on('change', (e) => {
			const index = e.detail.currentItemIndex
			$pagerEl.siblings('li').removeClass('active')
			$pagerEl.eq(index).addClass('active')
		})
	}

	autoPlaySlide(slide, delay) {
		this.timeout = setTimeout(() => {
			this.handle = raf(this.autoPlaySlide.bind(null, slide, delay))
			slide.next()
		}, delay)
	}
}
