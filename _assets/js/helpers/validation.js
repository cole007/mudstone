import validate from 'validate.js'
import Concert from 'concert'

/**
 * Creates a new form validator.

	<div class="form__group js-input-wrap">
		<label class="form__label" for="frm_name">Name</label>
		<input class="form__input" type="text" name="frm_name" id="frm_name" required>
	</div>

	new Validation(el, {
		constraints: {
			'frm_email': {
				presence: {
					message: 'Email is required'
				},
				email: {
					message: 'Please enter a valid email address'
				}
			},
			'frm_name': {
				presence: {
					message: 'Please enter your name'
				}
			},
			'frm_msg': {
				presence: {
					message: 'Please enter your message'
				}
			}
		}
	})


 * @class
 */

export default class Validation extends Concert {
	constructor(el, opts = {}) {
		super()
		// Dom node: the form elements
		this.form = el
		// Object: the validation constraints
		this.constraints = opts.constraints
		// String: tags to validate against
		this.selector = opts.selector || 'input, textarea, select'
		// String: classname for the div that surrounds the input
		this.inputWrapper = opts.inputWrapper || 'js-input-wrap'
		// String: classname used on error message block
		this.messageClassName = opts.messageClassName || 'message'
		// Function/String: the tag to be used to store the message
		// If a function is supplied the first argument is the error message
		this.messageEl = opts.messageEl || 'span'
		// String: classname used for errors
		this.errorClassName = opts.errorClassName || 'is-error'
		// String: classname used for success
		this.validClassName = opts.validClassName || 'is-valid'
		// Boolean: submit form with ajax
		this.ajax = opts.ajax || false

		// all of the valid inputs
		this.inputs = Array.from(this.form.querySelectorAll(this.selector))
		.filter(input => input.getAttribute('type') !== 'hidden')
		.filter(input => input.getAttribute('type') !== 'submit')
		// all of the required inputs
		this.requiredInputs = this.inputs.filter(input => input.required)
		log(this.requiredInputs)
		// bind methods
		this.showErrors = this.showErrors.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
		this.changeHandler = this.changeHandler.bind(this)
		this.showErrorsForInput = this.showErrorsForInput.bind(this)
		this.resetFormGroup = this.resetFormGroup.bind(this)
		this.addError = this.addError.bind(this)
		this.send = this.send.bind(this)
		this.reset = this.reset.bind(this)
		this.clearFields = this.clearFields.bind(this)
		// add the event listeners
		this.addEventListeners()
		// set the form to novalidate, prevents html5 form validatiopn
		this.form.setAttribute('novalidate', true)
		// add error message divs to each required group
		Validation.addMessageNodesToDom(this.requiredInputs, this.messageClassName, this.inputWrapper)

	}


	/**
	 * Bind the events
	 */

	addEventListeners() {
		this.form.addEventListener('submit', this.submitHandler)
		this.requiredInputs.forEach((input) => input.addEventListener('change', this.changeHandler))
	}

	/**
	 * Find the closest parent
	 * @param {Node} dom node - the required dom node
	 * @param {String} className - the class name to search for
	 */

	static closestParent(node, className, form) {
		if (!node || node === form) {
			return null
		}
		if (node.classList.contains(className)) {
			return node
		}
		return Validation.closestParent(node.parentNode, className, form)
	}

	/**
	 * Reset form, remove any classes add and empty the message element
	 * @param {formGroup} node - The form group being reset
	 */

	resetFormGroup(formGroup) {
		// Remove the success and error classes
		formGroup.classList.remove(this.errorClassName)
		formGroup.classList.remove(this.validClassName)
		formGroup.querySelector(`.${this.messageClassName}`).innerHTML = ''
	}

	/**
	 * Append div after every required input for messages
	 * @param {Array} inputs - The required fields array
	 * @param {String} inputWrapper - the input parent wrapper
	 * @param {String} className - the class name used for each
	 */

	static addMessageNodesToDom(inputs, className, inputWrapper) {
		inputs.forEach((input) => {
			try {
				const messageDiv = document.createElement('div')
				const parent = Validation.closestParent(input, inputWrapper, this.form)
				messageDiv.className = className
				parent.appendChild(messageDiv)
			} catch(e) {
				log('Validation addMessageNodesToDom', e)
			}
		})
	}

	/**
	 * Submit handler - handle the form submission, *this* is bound to the Instance, not the dom node
	 * @param {e} event
	 */

	submitHandler(e) {
		// validate the form aainst the constraints
		const errors = validate(this.form, this.constraints, {fullMessages: false})


		if(this.ajax || errors) {
			e.preventDefault()
		}
		// then we update the form to reflect the results
		this.showErrors(errors || {})

		!errors && this.send()
	}

	reset() {
		this.requiredInputs.forEach((input) => {
			const formGroup = Validation.closestParent(input.parentNode, this.inputWrapper, this.form)
			this.resetFormGroup(formGroup)
		})
		this.clearFields()
		return this
	}

	clearFields() {
		this.inputs.forEach((input) => input.value = '')
		return this
	}

	/**
	 * Change handler, called every time an input is changed, *this* is bound to the Instance, not the dom node
	 * @param {e} event
	 */

	changeHandler(e) {
		const input = e.srcElement
		const errors = validate(this.form, this.constraints, {fullMessages: false}) || {}
		this.showErrorsForInput(input, errors[input.name])
	}

	/**
	 * show success and post form the server
	 * @param {e} event
	 */

	send() {
		const data = new FormData(this.form)
		const _this = this

		const ajaxSettings = {
			url : this.url,
			method: 'POST',
			data: data,
			success: (response, textStatus, jqXHR) => {
				_this.trigger('submit:success', {response, textStatus, jqXHR, input: _this.getInputValues()})
				_this.clearFields()
			},
			error: (jqXHR, textStatus, errorThrown) => {
				_this.trigger('submit:error', {jqXHR, textStatus, errorThrown})
			}
		}

		const o = Object.assign({}, ajaxSettings, this.postSettings)
		$.ajax(o)
	}

	/**
	 * show errors - show all error messages, trigger by submission
	 * @param {Array} errors - the errors array
	 */

	showErrors(errors) {
		this.requiredInputs.forEach((input) => this.showErrorsForInput(input, errors && errors[input.name]))
	}

	/**
	 * addError - creates dom node and adds error message
	 * @param {Node} messages - the dom node
	 * @param {String} error - error message
	 */

	addError(messages, error) {
		let block
		if(typeof this.messageEl === 'function') {
			const node = this.messageEl(error)
			block = node instanceof jQuery ? node[0] : node
		} else {
			block = document.createElement(this.messageEl)
			block.classList.add('help-block')
			block.innerText = error
		}
		messages.appendChild(block)
	}

	/**
	 * showErrorsForInput - creates dom node and adds error message
	 * @param {Node} input - dom node
	 * @param {Array} all of the errors
	 */

	showErrorsForInput(input, errors) {
		// This is the root of the input
		const formGroup = Validation.closestParent(input.parentNode, this.inputWrapper, this.form)
		// Find where the error messages will be insert into
		const messages = formGroup.querySelector(`.${this.messageClassName}`)
		// First we remove any old messages and resets the classes
		this.resetFormGroup(formGroup)
		// If we have errors
		if (errors) {
			// we first mark the group has having errors
			formGroup.classList.add(this.errorClassName)
			// then we append all the errors
			errors.forEach((error) => this.addError(messages, error))
		} else {
			// otherwise we simply mark it as success
			formGroup.classList.add(this.validClassName)
		}
	}
}
