import Wallop from 'wallop'
import Hammer from 'hammerjs'
import domify from 'domify'
import { mergeOptions } from '@/utils/helpers'
import { DomClass } from '@/utils/dom'



export default class Slide extends Wallop {

	constructor(element, options) {
		const defaults = {
			buttonPreviousClass: 'c-slide__prev',
			buttonNextClass: 'c-slide__next',
			itemClass: 'c-slide__item',
			currentItemClass: 'c-slide__item--current',
			showPreviousClass: 'c-slide__item--showPrevious',
			showNextClass: 'c-slide__item--showNext',
			hidePreviousClass: 'c-slide__item--hidePrevious',
			hideNextClass: 'c-slide__item--hideNext',
			carousel: true,
			pagerWrapper: '<ul class="c-slide__pager"></ul>',
			pagerItem: '<li class="c-slide__pager-item"></li>',
			pagerActiveClass: 'is-current',
			delay: 3000,
			swipe: true,
			init: true,
			startIndex: 0
		}
		
		const opts = mergeOptions(defaults, options, element, 'slideOptions')

		super(element, opts)
		this.options = opts
		this.$tag = element
		this.slides = [...element.querySelectorAll(`.${opts.itemClass}`)]
		this.previousIndex = this.currentItemIndex

		opts.init && this.initialize()
	}

	initialize = () => {
		this.goTo(this.previousIndex)

		if(this.options.pager) {
			this.renderPager()
		}
		
		if(this.options.loop) {
			this.loop()
		}
		
		if(this.options.swipe) {
			this.addGestures()
		}

		this.listen()
	}

	renderPager = () => {
		const { pagerWrapper, pagerItem, pagerActiveClass } = this.options
		this.$pagerWrapper = this.$tag.appendChild(domify(pagerWrapper))
		this.$pagerWrapper.appendChild(domify(this.slides.map(() => pagerItem).join('')))
		this.$buttons = [...this.$pagerWrapper.children].map(($button, index) => {
			$button.setAttribute('data-index', index)
			if(index === this.currentItemIndex) {
				DomClass($button).add('is-current')
			}
			return $button
		})

		DomClass(this.$buttons[this.currentItemIndex]).add(pagerActiveClass)

		this.addPagerEvents()

		return this
	}

	addPagerEvents = () => {
		this.$buttons.forEach(button => button.addEventListener('click', this.onPagerClick))
	}

	removePagerEvents = () => {
		this.$buttons.forEach(button => button.removeEventListener('click', this.onPagerClick))
	}

	onPagerClick = (evt) => {
		evt.preventDefault()
		const { target } = evt
		const { index } = target.dataset

		
		this.goTo(index)
	}

	updatePagerLinks = (prev, next) => {
		const { pagerActiveClass } = this.options
		DomClass(this.$buttons[prev]).remove(pagerActiveClass)
		DomClass(this.$buttons[next]).add(pagerActiveClass)
	}

	listen() {
		this.on('change', this.onChange)
	}

	onChange = ({detail}) => {
		const { currentItemIndex } = detail
		if(this.options.pager) {
			this.updatePagerLinks(this.previousIndex, currentItemIndex)
		}

		if(this.options.loop) {
			this.cancelLoop()
			this.loop()
		}

		this.previousIndex = currentItemIndex
	}

	destroy() {
		this.removeAllHelperSettings()
		this.off('change', this.onChange)
		
		if(this.buttonPrevious) {
			this.buttonPrevious.setAttribute('disabled', true)
		}

		if(this.buttonNext) {
			this.buttonNext.setAttribute('disabled', true)
		}

		if(this.options.pager) {
			this.removePagerEvents()
			this.$pagerWrapper.parentNode.removeChild(this.$pagerWrapper)
		}
		
		if(this.options.loop) {
			this.cancelLoop()
		}
		
		if(this.options.swipe) {
			this.mc.destroy()
		}
	}
	
	loop = () => {
		this.timeout = setTimeout(() => {
			this.handle = requestAnimationFrame(this.loop)
			this.next()
		}, this.options.delay)
	}

	cancelLoop = () => {
		cancelAnimationFrame(this.handle)
		clearTimeout(this.timeout)
	}

	addGestures = () => {
		this.mc = new Hammer.Manager(this.$tag, {
			recognizers: [
				[Hammer.Pan, {
					direction: Hammer.DIRECTION_HORIZONTAL
				}]
			]
		})
		this.mc.add(new Hammer.Pan())
		this.mc.on('panend', this.onPanEnd)
	}

	onPanEnd = ({additionalEvent}) => {
		if(additionalEvent === 'panleft') {
			this.previous()
		} else if(additionalEvent === 'panright') {
			this.next()
		}
	} 
}