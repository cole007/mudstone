import VanillaModal from 'vanilla-modal'
import Concert from 'concert'
import Delegate from 'dom-delegate'
import { mergeOptions, getJson, transitionSteps } from '@/utils/helpers'
import { DomInsertAfter, DomClass, DomCss, DomWrap, DomUnwrap } from '@/utils/dom'
import domify from 'domify'

/**
 * @class ModalScreens
 * @extends  Concert
 */

export default class ModalScreens extends Concert {

	defaults = {
		screens: [
			'#modal-1',
			'#modal-2',
			'#modal-3',
			'#modal-4',
			'#modal-5'
		],
		openSelector: '[data-modal-screen]',
		nextSelector: '[data-modal-next]',
		prevSelector: '[data-modal-prev]',
		resetOnClose: true,
		init: true
	}

	modalOptions = {
		modal: '.modal',
		modalInner: '.modal-inner',
		modalContent: '.modal-content',
		open: '[data-modal-open]',
		close: '[data-modal-close]',
		page: 'body',
		loadClass: 'vanilla-modal',
		class: 'modal-visible',
		clickOutside: true,
		closeKeys: [27],
		transitions: true
	}



	screenNodes = []
	currentKey = 0
	id = 0
	delegate = new Delegate(document)
	currentIndex = this.currentIndex || 0
	isOpen = false

	/**
	 * @param {HTMLELement} el, html element used to hold any inline options
	 * @param {Object} options
	 * @param  Concert
	 */
	constructor(el, options = {}) {
		super()
		this.options = mergeOptions(this.defaults, options, el, 'modalScreensOptions')
		this.options.init && this.initalize()
	}

	initalize = () => {
		this.modal = new VanillaModal({
			...this.modalOptions,
			...this.options.modalOptions,
			onBeforeOpen: this.onBeforeOpen,
			onBeforeClose: this.onBeforeClose,
			onOpen: this.onOpen,
			onClose: this.onClose
		})
		this.addEvents()
		this.screens = this.options
		this.selectors = this.screens
	}

	addEvents = () => {
		const { openSelector, nextSelector, prevSelector } = this.options
		this.delegate.on('click', openSelector, this.onClick)
		this.delegate.on('click', nextSelector, this.onClickNextScreen)
		prevSelector && this.delegate.on('click', prevSelector, this.onClickPrevScreen)
	}

	removeEvents = () => {
		const { openSelector, nextSelector, prevSelector } = this.options
		this.delegate.off('click', openSelector, this.onClick)
		this.delegate.off('click', nextSelector, this.onClickNextScreen)
		prevSelector && this.delegate.off('click', prevSelector, this.onClickPrevScreen)
	}

	onBeforeOpen = () => {
		this.trigger('modal:onBeforeOpen', this.modal)
	}

	onBeforeClose = () => {
		this.trigger('modal:onBeforeClose', this.modal)
	}


	onOpen = () => {
		this.currentIndex = 0
		const { dom } = this.modal
		const { screens } = this.screenNodes[this.currentKey]
		const id = this.modal.current.getAttribute('id')
		this.currentId = id
		DomClass(document.body).add(`is-modal-${id}-open`)
		this.trigger('modal:onOpen', this.modal)
		this.trigger('modal:prev', {screens: this.screenNodes[this.currentKey]})
		dom.modalContent.setAttribute('data-id', id)
		DomCss(dom.modalContent, {opacity: 1})
		const $wrap = DomWrap(dom.modalContent, domify('<div class="modal-box"></div>'))
		dom.modalContent.setAttribute('data-index', 0)
		this.insertedScreens = []
		if(screens) {
			screens.reduce((prev, screen) => {
				DomClass(screen).add('u-hidden')
				const input = DomInsertAfter(screen, prev.parentNode)
				const wrap = DomWrap(input, domify('<div class="modal-box"></div>'))
				this.insertedScreens.push(wrap)
				return input
			}, $wrap)
		}
		this.isOpen = true
		log(this.insertedScreens)
		this.allScreens = [$wrap, ...this.insertedScreens]
	}

	buildScreen = (screens) => {
		return screens.slice(1).map((screen, index) => {
			const $screen = document.getElementById(screen.split('#')[1])
			const $clone = $screen.cloneNode(true)
			$clone.removeAttribute('id')
			$clone.setAttribute('data-id', $screen.getAttribute('id'))
			$clone.setAttribute('data-index', index + 1)
			DomClass($clone).remove('modal-hider')
			DomClass($clone).add('modal-content')
			return $clone
		})
	}

	onClose = () => {
		if(!this.isOpen) return
		DomClass(document.body).add(`is-modal-${this.currentId}-open`)
		this.isOpen = false
		const { dom } = this.modal
		dom.modalContent.removeAttribute('style')
		dom.modalContent.removeAttribute('data-id')
		dom.modalContent.removeAttribute('data-index')
		DomClass(dom.modalContent).remove('u-hidden')
		DomUnwrap(dom.modalContent.parentNode)
		this.trigger('modal:onClose', this.modal)
		this.insertedScreens.forEach((screen) => {
			const p = screen.parentNode
			p.removeChild(screen)
			p.parentNode.removeChild(p)
		})
		this.insertedScreens = []

	}
	
	createScreenInstance = (element) => {
		const tmp = getJson(element, 'modalScreens') || this.screens
		const selectors  = tmp ? tmp : this.selectors	
		const total = selectors.length
		const screens = total > 1 ? this.buildScreen(selectors) : false
		this.screenNodes.push({
			selectors,
			screens,
			total
		})
		const modalKey = this.id
		element.setAttribute('data-key', this.id)
		this.id += 1
		return modalKey
	}
	
	onClick = (event, element) => {
		event.preventDefault()
		const { modalKey } = element.dataset
		const key = modalKey ? modalKey : this.createScreenInstance(element)
		const screenToOpen = this.screenNodes[key].selectors[0]
		this.currentKey = key
		this.modal.open(screenToOpen)
	}

	onClickNextScreen = (event, element) => {
		event.preventDefault()
		const { total } = this.screenNodes[this.currentKey]
		if(this.currentIndex === total - 1) return
		const currentIndex = this.currentIndex
		const k = currentIndex + 1
		const index = k < total ? k : false
		if(index) {
			this.trigger('modal:next', {element, index, previous: this.currentIndex, screens: this.screenNodes[this.currentKey]})
			this.goTo(index)
		}
	}

	onClickPrevScreen = (event, element) => {
		event.preventDefault()
		if(this.currentIndex === 0) return
		const currentIndex = this.currentIndex
		const k = currentIndex - 1
		const index = k > -1 ? k : false
		if(index > -1) {
			this.trigger('modal:prev', {element, index, previous: this.currentIndex, screens: this.screenNodes[this.currentKey]})
			this.goTo(index)
		}
	}

	goTo = (index) => {
		const $prev = this.allScreens[this.currentIndex]
		const $next = this.allScreens[index]
		const from = $prev.getBoundingClientRect()
		DomClass($prev).add('u-hidden')
		DomClass($next).remove('u-hidden')
		const to = $next.getBoundingClientRect()
		DomClass($prev).remove('u-hidden')
		DomClass($next).add('u-hidden')
		DomCss($next, {opacity: 0})
		DomCss($prev, {opacity: 1})
		const x = to.width / from.width
		const y = to.height / from.height

		DomCss($prev.parentNode, {
			transition: ''
		})

		transitionSteps($prev, {opacity: 0})
			.then(() => {
				return transitionSteps($prev.parentNode, {transform: `scale(${x}, ${y})`})
			})
			.then(() => {
				DomClass($prev).add('u-hidden')
				DomClass($next).remove('u-hidden')
				DomCss($next, {transitionDelay: '100ms'})
				return transitionSteps($next, {opacity: 1})
			})
			.then(() => {
				DomCss($prev.parentNode, {
					transition: 'none',
					transform: 'scale(1,1)'
				})
			})

		this.currentIndex = index
	}
}