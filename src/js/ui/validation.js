import Concert from 'concert'
import validate from 'validate.js'
import domify from 'domify'
import Delegate from 'dom-delegate'
import axios from 'axios'
import { mergeOptions } from '@/utils/helpers'
import { DomClass, DomClosest } from '@/utils/dom'


export default class Validation extends Concert {

	defaults = {
		init: true,
		group: false,
		messageWrapper: '<span class="error"></span>',
		ajax: true,
		emptyFieldsOnComplete: true,
		constraints: {
			'questions[test_email]': {
				presence: {
					'message': 'Please enter your email'
				},
				email: {
					'message': 'Please enter a valid email address'
				}
			},
			'questions[test_name]': {
				presence: {
					'message': 'Please enter your name'
				},
			},
			'questions[test_message]': {
				presence: {
					'message': 'Please enter your message'
				}
			}
		}
	}

	constructor(el, options = {}) {
		super()
		this.$form = el
		this.options = mergeOptions(this.defaults, options, el, 'validationOptions')

		const rules = this.$form.querySelector('[data-validation-rules]')
		
		if(rules) {
			try {
				this.options.constraints = JSON.parse(rules.innerHTML)
			} catch(error) {
				log(error)
			}
		}

		this.options.init && this.initalize()
	}

	setForm = (el) => this.$form = el

	addEvents = () => {
		this.delegate.on('change', '[data-validate]', this.onChange)
		this.$form.addEventListener('submit', this.onSubmit)
	}

	removeEvents = () => {
		this.delegate.off('change', '[data-validate]', this.onChange)
		this.$form.removeEventListener('submit', this.onSubmit)
	}

	onChange = (event, element) => {
		this.showError(element)
	}

	showError = (element) => {
		const name = element.getAttribute('name')
		const instance = this.collection.find(item => item.name === name)
		const input = {}
		const constraints = {}
		constraints[name] = instance.constraints
		input[name] = element.value
		const errors = validate(input, constraints, {fullMessages: false}
		) || {}

		if(errors[name]) {
			this.renderMessage(instance, errors[name])

		} else {
			this.removeError(instance)
		}
	}

	onSubmit = (event) => {
		const { constraints, ajax } = this.options
		const errors = validate(this.$form, constraints, {fullMessages: false})

		if(ajax || errors) {
			event.preventDefault()
		}

		if(errors) {
			this.collection.forEach(({$node}) => this.showError($node, 'submit'))
		}
		
		!errors && this.postForm()
	}

	postForm = () => {
		const data = new FormData(this.$form)
		const { emptyFieldsOnComplete } = this.options

		axios({
			method: 'post',
			url: '',
			data
		})
			.then(function (response) {
				emptyFieldsOnComplete && this.$form.reset()
				this.trigger('form:success', response)
			})
			.catch(function (error) {
				this.trigger('form:success', error)
			})

	}

	renderMessage = ({$message, $parent, $node}, message) => {
		if(message[0] === $message.textContent) return
		$message.textContent = ''
		$message.textContent = message[0]
		DomClass($parent).add('is-error')
		DomClass($node).add('is-error')
	}

	removeError = ({$message, $parent, $node}) => {
		$message.textContent = ''
		DomClass($parent).remove('is-error')
		DomClass($node).remove('is-error')
	}

	setDelegate = (el = this.$form) => {
		this.delegate = new Delegate(el)
	}

	setupDom = () => {
		this.$form.setAttribute('novalidate', true)
		
		const { constraints, group, messageWrapper } = this.options
		for(let key in constraints) {
			const nodes = [...this.$form.querySelectorAll(`[name='${key}']`)].map(($node) => {
				const $parent = group ? DomClosest($node, group) : $node.parentNode
				const $message = $parent.appendChild(domify(messageWrapper))
				$node.setAttribute('data-validate', true)
				return {
					$node,
					$parent,
					$message,
					name: key,
					constraints: constraints[key]
				}
			})
			this.collection = [...this.collection, ...nodes]
		}
	}

	initalize = () => {
		this.collection = []
		this.setDelegate()
		this.setupDom()
		this.addEvents()
	}

	destroy = () => {
		this.collection = []
		this.removeEvents()
	}
}