import VanillaModal from 'vanilla-modal'
import Concert from 'concert'
import Delegate from 'dom-delegate'
import { mergeOptions } from '@/utils/helpers'
import { DomInsertAfter, DomClass } from '@/utils/dom'


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
		resetOnClose: true
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

	constructor(el, options = {}) {
		super()
		this.options = mergeOptions(this.defaults, options, el, 'modalScreensOptions')
		this.modal = new VanillaModal({
			...this.modalOptions,
			...this.options.modalOptions,
			onBeforeOpen: this.onBeforeOpen,
			onBeforeClose: this.onBeforeClose,
			onOpen: this.onOpen,
			onClose: this.onClose
		})
		this.isOpen = false
		this.delegate = new Delegate(document)
		this.currentIndex = this.currentIndex || 0
		this.total = this.options.screens.length
		this.addEvents()
		this.clone
		this.screenNodes = this.options.screens.slice(1).map((screen, index) => {
			const $screen = document.getElementById(screen.split('#')[1])
			const $clone = $screen.cloneNode(true)
			const id = $screen.getAttribute('id')
			$clone.removeAttribute('id')
			$clone.setAttribute('data-id', id)
			$clone.setAttribute('data-index', index + 1)
			DomClass($clone).remove('modal-hider')
			DomClass($clone).add('modal-content')
			return $clone
		})
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
		this.trigger('modal:onOpen', this.modal)
		dom.modalContent.setAttribute('data-id', this.modal.current.getAttribute('id'))
		dom.modalContent.setAttribute('data-index', 0)
		this.insertedScreens = []
		this.screenNodes.reduce((prev, screen) => {
			DomClass(screen).add('u-hidden')
			const input = DomInsertAfter(screen, prev)
			this.insertedScreens.push(input)
			return input
		}, dom.modalContent)
		this.isOpen = true
		this.allScreens = [dom.modalContent, ...this.insertedScreens]
	}

	onClose = () => {
		if(!this.isOpen) return
		this.isOpen = false
		const { dom } = this.modal
		dom.modalContent.removeAttribute('data-id')
		dom.modalContent.removeAttribute('data-index')
		DomClass(dom.modalContent).remove('u-hidden')
		this.trigger('modal:onClose', this.modal)
		this.insertedScreens.forEach((screen) => {
			screen.parentNode.removeChild(screen)
		})
		this.insertedScreens = []
	}

	onClick = (event) => {
		event.preventDefault()
		const { screens } = this.options
		const screenToOpen = screens[0]
		this.modal.open(screenToOpen)
	}

	onClickNextScreen = (event) => {
		event.preventDefault()
		if(this.currentIndex === this.total - 1) return
		const currentIndex = this.currentIndex
		const k = currentIndex + 1
		const index = k < this.total ? k : false
		if(index) {
			this.goTo(index)
		}
	}

	onClickPrevScreen = (event) => {
		event.preventDefault()
		if(this.currentIndex === 0) return
		const currentIndex = this.currentIndex
		const k = currentIndex - 1
		const index = k > -1 ? k : false
		if(index > -1) {
			this.goTo(index)
		}
	}

	goTo = (index) => {
		const $prev = this.allScreens[this.currentIndex]
		const $next = this.allScreens[index]
		DomClass($prev).add('u-hidden')
		DomClass($next).remove('u-hidden')
		this.currentIndex = index
	}
}