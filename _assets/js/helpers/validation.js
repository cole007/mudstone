// https://validatejs.org/
import validate from 'validate.js';


export default function ValidateForm(opts) {

	const defaults = {
		group: 'form__group',
		messageClassName: '.messages',
		errorClassName: 'is-error',
		validClassName: 'is-valid',
		messageClass: ['help-block', 'error'],
		messageEl: 'span',
		inputs: 'input[name], select[name], textarea[name]',
		emptyOnSuccess: true
	};


	this.options = {
		form: opts.form,
		url: opts.url || '',
		constraints: opts.constraints,
		inputs: opts.inputs || defaults.inputs,
		group: opts.group || defaults.group,
		messageClassName: opts.messageClassName || defaults.messageClassName,
		errorClassName: opts.errorClassName || defaults.errorClassName,
		validClassName: opts.validClassName || defaults.validClassName,
		messageClass: opts.messageClass || defaults.messageClass,
		messageEl: opts.messageEl || defaults.messageEl,
		ajax: opts.ajax,
		successCallback: opts.successCallback || null,
		errorCallback: opts.errorCallback || null,
		emptyOnSuccess: opts.emptyOnSuccess || defaults.emptyOnSuccess,
		postSettings: opts.postSettings || {}
	};

	$(opts.form).attr('novalidate', true);

	const _this = this;
	const _opts = this.options;
	const form = _opts.form;
	const constraints = _opts.constraints;
	const _array = Array.prototype.slice;

	form.addEventListener("submit", (e) => {
		// only preventDefault is ajax is true or there are errors on the page
		if(_opts.ajax === true || validate(form, constraints)) {
			e.preventDefault();
		}
		handleFormSubmit.call(this, form);
	});


	// Hook up the inputs to validate on the fly
	var inputs = form.querySelectorAll(_opts.inputs);
	// add blur events to all of the inputs
	for (let i = 0; i < inputs.length; ++i) {
		inputs.item(i).addEventListener("change", function(e) {
		  const errors = validate(form, constraints, {fullMessages: false}) || {};
		  showErrorsForInput(this, errors[this.name])
		});
	}

	function handleFormSubmit(form, input) {
		// validate the form aainst the constraints
		const errors = validate(form, constraints, {fullMessages: false});
		// then we update the form to reflect the results
		showErrors(form, errors || {});
		if (!errors) {
			showSuccess.call(this);
		}
	}

	// Updates the inputs with the validation errors
	function showErrors(form, errors) {
		// We loop through all the inputs and show the errors for that input
		const inputs = form.querySelectorAll(_opts.inputs);
		_array.call(inputs).forEach((input, index) =>  showErrorsForInput(input, errors && errors[input.name]));
	}

	// Shows the errors for a specific input
	function showErrorsForInput(input, errors) {
		// This is the root of the input
		const formGroup = closestParent(input.parentNode, _opts.group);
		// Find where the error messages will be insert into
		const messages = formGroup.querySelector(_opts.messageClassName);
		// First we remove any old messages and resets the classes
		resetFormGroup(formGroup);
		// If we have errors
		if (errors) {
			// we first mark the group has having errors
			formGroup.classList.add(_opts.errorClassName);
			// then we append all the errors
			errors.forEach((error) => addError(messages, error))
		} else {
		 	// otherwise we simply mark it as success
		 	formGroup.classList.add(_opts.validClassName);
		}
	}

	// Recusively finds the closest parent that has the specified class
	function closestParent(child, className) {
		if (!child || child == form) {
		  return null;
		}
		if (child.classList.contains(className)) {
		  return child;
		} else {
		  return closestParent(child.parentNode, className);
		}
	}

	function resetFormGroup(formGroup) {
	// Remove the success and error classes
		formGroup.classList.remove(_opts.errorClassName);
		formGroup.classList.remove(_opts.validClassName);
		const helpBlockErrors = formGroup.querySelectorAll(`.${_opts.messageClass.join('.')}`);

		// and remove any old messages
		_array.call(helpBlockErrors).forEach(function(el) {
		  el.parentNode.removeChild(el);
		});
	}

	// Adds the specified error with the following markup
	// <p class="help-block error">[message]</p>
	function addError(messages, error) {
		var block = document.createElement(_opts.messageEl);
		for(let i = 0; i < _opts.messageClass.length; i++) {
			block.classList.add(_opts.messageClass[i]);
		}
		block.innerText = error;
		messages.appendChild(block);
	}


	function emptyInputs() {
		const inputs = form.querySelectorAll(_opts.inputs);
		_array.call(inputs).forEach((input, index) =>  {
			input.value = '';
		});
	}


	function showSuccess() {
		if(_opts.ajax === true) {
			const data = $(form).serialize();

			const ajaxSettings = {
				url : _opts.url,
				method: 'POST',
				data: data,
				success: (response, textStatus, jqXHR) => {
					if(_opts.emptyOnSuccess === true) {
						emptyInputs();
					}
					if(_opts.successCallback) {
						_opts.successCallback.call(this, response, textStatus, jqXHR)
					}
				},
				error: (jqXHR, textStatus, errorThrown) => {
					if(_opts.errorCallback) {
						_opts.errorCallback.call(this, jqXHR, textStatus, errorThrown)
					}
				}
			}

			const o = $.extend({}, ajaxSettings, _opts.postSettings);
			$.ajax(o);
		}
	}
};
