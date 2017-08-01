import Concert from 'concert'
import validate from 'validate.js'
import domify from 'domify'
import Delegate from 'dom-delegate'
import axios from 'axios'
import { mergeOptions } from '@/utils/helpers'
import { DomClass, DomClosest } from '@/utils/dom'


/**
 * 
 * @class Validation
 * @extends  Concert
 * @param  {HTMLElement} el : the form to validate
 * @param  {Object} options : validation options
 * 									init: Boolean // enable the validation
 * 									group: Boolean/String // field grouping element, if boolean input.parentNode is used
 * 									ajax: Boolean // to post via ajax
 * 									emptyFieldsOnComplete: Boolean // reset fields on submit
 * 									constraints: Object // the validation rules, see validatejs.org for more information
 */

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

	/**
	 * 
	 * @function constructor
	 * @param  {HTMLElement} el : the form to validate
	 * @param  {Object} options : validation options
	 * @return Validation
	 */
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

	/**
	 * Update the form to validate, useful when forms are within modals
	 * 
	 * @function setForm
	 * @param  {HTMLElement} el : the form to validate
	 * @return Validation
	 */
	setForm = (el) => {
		this.$form = el

		return this
	}

	/**
	 * Bind events
	 * 
	 * @function addEvents
	 * @return Validation
	 */
	addEvents = () => {
		this.delegate.on('change', '[data-validate]', this.onChange)
		this.$form.addEventListener('submit', this.onSubmit)

		return this
	}

	/**
	 * Unbind events
	 * 
	 * @function removeEvents
	 * @return Validation
	 */
	removeEvents = () => {
		this.delegate.off('change', '[data-validate]', this.onChange)
		this.$form.removeEventListener('submit', this.onSubmit)
		
		return this
	}

	/**
	 * The 'change' event handler
	 * 
	 * @function onChange
	 * @param  {Object} event : event object
	 * @param  {HTMLElement} element : the input that's changed
	 * @return Void
	 */
	onChange = (event, element) => {
		this.showError(element)
	}

	/**
	 * Checks the current input value against the constraints
	 * 
	 * @function showError
	 * @param  {HTMLElement} element : the input to validate
	 * @return Void
	 */
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

	/**
	 * The form 'submit' handler
	 * 
	 * @function showError
	 * @param  {Object} event : event object
	 * @return Void
	 */
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

	/**
	 * Post the form via ajax
	 * 
	 * @function postForm
	 * @return Void
	 */
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

	/**
	 * Add error message
	 * 
	 * @function renderMessage
	 * @param  {HTMLElement, HTMLElement, HTMLElement} $message, $parent, $node : deconstructed argument containing all of the relevant html elements
	 * @param  {Array} message : an array of messages, only the first[0] message is displayed
	 * @return Void
	 */
	renderMessage = ({$message, $parent, $node}, message) => {
		if(message[0] === $message.textContent) return
		$message.textContent = ''
		$message.textContent = message[0]
		DomClass($parent).add('is-error')
		DomClass($node).add('is-error')
	}

	/**
	 * Remove the error message
	 * 
	 * @function renderMessage
	 * @param  {HTMLElement, HTMLElement, HTMLElement} $message, $parent, $node : deconstructed argument containing all of the relevant html elements
	 * @return Void
	 */
	removeError = ({$message, $parent, $node}) => {
		$message.textContent = ''
		DomClass($parent).remove('is-error')
		DomClass($node).remove('is-error')
	}

	/**
	 * Set where to delegate the behaviours to, useful when forms are within modals
	 * 
	 * @function setDelegate
	 * @param  {HTMLElement} el, html element to delegate events
	 * @return Validation
	 */
	setDelegate = (el = this.$form) => {
		this.delegate = new Delegate(el)
		
		return this
	}

	/**
	 * Setup the dom, add error nodes to markup
	 * 
	 * @function setupDom
	 * @return Validation
	 */
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
		
		return this
	}

	/**
	 * Enable all the things
	 * 
	 * @function initalize
	 * @return Void
	 */
	initalize = () => {
		this.collection = []
		this.setDelegate()
				.setupDom()
				.addEvents()
	}

	/**
	 * Destroy all the things
	 * 
	 * @function destroy
	 * @return Void
	 */
	destroy = () => {
		this.collection = []
		this.removeEvents()
	}
}
