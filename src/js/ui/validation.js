import Concert from 'concert'
import validate from 'validate.js'
import domify from 'domify'
import Delegate from 'dom-delegate'
import { mergeOptopns } from '@/utils/helpers'
import { DomClass, DomClosest } from '@/utils/dom'

window.v = validate

export default class Validation extends Concert {

	defaults = {
		init: true,
		selector: '.js-validate',
		group: '.form-group',
		messageWrapper: '<span class="error"></span>',
		ajax: true,
		constraints: {
			email: {
				// Email is required
				presence: true,
				// and must be an email (duh)
				email: true
			},
			password: {
				// Password is also required
				presence: true,
				// And must be at least 5 characters long
				length: {
					minimum: 5
				}
			},
			'confirm-password': {
				// You need to confirm your password
				presence: true,
				// and it needs to be equal to the other password
				equality: {
					attribute: 'password',
					message: '^The passwords does not match'
				}
			},
			username: {
				// You need to pick a username too
				presence: true,
				// And it must be between 3 and 20 characters long
				length: {
					minimum: 3,
					maximum: 20
				},
				format: {
					// We don't allow anything that a-z and 0-9
					pattern: '[a-z0-9]+',
					// but we don't care if the username is uppercase or lowercase
					flags: 'i',
					message: 'can only contain a-z and 0-9'
				}
			},
			country: {
				// You also need to input where you live
				presence: true,
				// And we restrict the countries supported to Sweden
				inclusion: {
					within: ['SE'],
					// The ^ prevents the field name from being prepended to the error
					message: '^Sorry, this service is for Sweden only'
				}
			},
			zip: {
				// Zip is optional but if specified it must be a 5 digit long number
				format: {
					pattern: '\\d{5}'
				}
			},
			'number-of-children': {
				presence: true,
				// Number of children has to be an integer >= 0
				numericality: {
					onlyInteger: true,
					greaterThanOrEqualTo: 0
				}
			}
		}
	}

	constructor(el, options = {}) {
		super()
		this.$form = el
		this.options = mergeOptopns(this.defaults, options, el, 'validationOptions')
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
		const { constraints, group, messageWrapper } = this.options
		for(let key in constraints) {
			const nodes = [...this.$form.querySelectorAll(`[name='${key}']`)].map(($node) => {
				const $parent = DomClosest($node, group)
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