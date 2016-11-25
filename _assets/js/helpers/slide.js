import Wallop from 'Wallop'
import Hammer from 'hammerjs'
import raf from 'raf'


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
		this.pagerWrapper = this.$tag.append($('<ol class="carousel-indicators"></ol>'))
		this.pagerEl = this.slides
												.map((slide, index) => `<li data-target='${index}' class='js-pager-btn ${index === 0 ? 'active' : ''}'></li>`)
												.reduce((acc, current) => acc + current, '')
		$('.carousel-indicators').append(this.pagerEl)

		this.$tag.on('click', '.js-pager-btn', (e) => {
			const $btn = $(e.currentTarget)
			const index = $btn.data('target')
			$btn.addClass('active').siblings('li').removeClass('active')
			this.slide.goTo(index)
		})

		this.slide.on('change', (e) => {
			const index = e.detail.currentItemIndex
			$('.js-pager-btn').siblings('li').removeClass('active')
			$('.js-pager-btn').eq(index).addClass('active')
		})
	}

	autoPlaySlide(slide, delay) {
		this.timeout = setTimeout(() => {
			this.handle = raf(this.autoPlaySlide.bind(null, slide, delay))
			slide.next()
		}, delay)
	}
}
