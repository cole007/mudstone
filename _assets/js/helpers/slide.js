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

new Slide(el, {
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

export default class Slide extends Wallop {
	constructor(el, options) {
		const defaults = {
			buttonPreviousClass: 'js-slide-prev',
			buttonNextClass: 'js-slide-next',
			itemClass: 'm-slide__item',
			currentItemClass: 'm-slide__item--current',
			showPreviousClass: 'm-slide__item--showPrevious',
			showNextClass: 'm-slide__item--showNext',
			hidePreviousClass: 'm-slide__item--hidePrevious',
			hideNextClass: 'm-slide__item--hideNext',
			carousel: true,
			pagerElClassName: 'slide-pager__item',
			delay: 5000,
			autoplay: false,
			pager: false,
			getures: false
		}

		const opts = {...defaults, ...options}

		super(el, opts)

		this.opts = opts
		this.tag = el
		this.$tag = $(this.tag)
		this.slides = Array.from(el.querySelectorAll(`.${opts.itemClass}`))

		this.pagerElClassName = opts.pagerElClassName

		if(opts.pager) {
			this.onPagerClickHandle = this.onPagerClickHandle.bind(this)
			this.addPagerHTML()
					.addPagerEvents()
		}

		opts.gestures && this.addGestures()
		opts.autoplay && this.autoPlaySlide()

		this.on('change', this.onChange.bind(this))
	}

	addGestures() {
		this.mc = new Hammer.Manager(this.tag, {
			touchAction: 'auto',
			recognizers: [
				[Hammer.Pan, {
					direction: Hammer.DIRECTION_HORIZONTAL
				}]
			]
		})
		const Pan = new Hammer.Pan()
		this.mc.add(Pan)
		this.mc.on('panend', (e) => {
			if(e.additionalEvent === 'panleft') {
				this.previous()
			} else if(e.additionalEvent === 'panright') {
				this.next()
			}
		})
	}


	onChange(e) {
		const { currentItemIndex } = e.detail
		const { pager, autoplay } = this.opts
		if(pager) {
			this.activePager.classList.remove('is-active')
			this.activePager = this.pagerElements[currentItemIndex]
			this.activePager.classList.add('is-active')
		}

		if(autoplay) {
			clearTimeout(this.timeout)
			raf.cancel(this.handle)
			this.autoPlaySlide()
		}
	}

	addPagerHTML() {
		const pagerElements = this.slides.map((slide, index) => {
			return `<li role="button" tabindex="0" aria-role="button" data-target='${index}' class='${this.opts.pagerElClassName} ${index === 0 ? 'is-active' : ''}'></li>`
		}).reduce((acc, current) => acc + current, '')

		const ul = document.createElement('ul')
		ul.classList.add('r-ul', 'slide-pager')
		ul.innerHTML = pagerElements
		this.tag.append(ul)
		this.pagerElements = this.tag.querySelectorAll(`.${this.opts.pagerElClassName}`)
		this.activePager = this.tag.querySelector(`.${this.opts.pagerElClassName}.is-active`)
		return this
	}

	addPagerEvents() {
		this.$tag.on('click', `.${this.opts.pagerElClassName}`, this.onPagerClickHandle)
	}

	onPagerClickHandle(e) {
		const el = e.currentTarget
		const { target } = el.dataset
		this.goTo(target)
		this.activePager.classList.remove('is-active')
		this.activePager = el
		this.activePager.classList.add('is-active')
	}

	autoPlaySlide() {
		this.timeout = setTimeout(() => {
			this.handle = raf(this.autoPlaySlide)
			this.next()
		}, this.opts.delay)
	}
}
