import ValidateForm from '../helpers/validation';
import Viewport from '../helpers/viewport';
import prefix from '../helpers/prefix';

function form(container) {
	var viewport = new Viewport();
	var successMessageHtml = `<div class="form-success" style="position: fixed; z-index: 10001; background-color: white; border: 1px solid black">
								<h1>Well that is belting</h1>
								<p>Your message has been successfully sent</p>
							  </div>`;
							  
	var validate = new ValidateForm({
		form: container,
		ajax: true,
		url: 'sproutForms/entries/saveEntry',
		constraints: {
			"fields[fullName]": {
				presence: {
					message: 'Full Name is required'
				},

			},
			'fields[email]': {
				presence: {
					message: 'Email is required'
				},
				email: {
					message: 'That\'s no email address'
				},
			},
			'fields[message]': {
				presence: {
					message: 'What do you want?'
				},
			}
		},
		inputs: '.js-validate',
		successCallback: function(response, textStatus, jqXHR) {
			var $el = $(successMessageHtml).appendTo($('body'));
			var { clientWidth, clientHeight } = $el[0];
			$el[0].style.top = `${viewport.height / 2 - clientHeight / 2}px`;
			$el[0].style.left = `${viewport.width / 2 - clientWidth / 2}px`;
			$el[0].style.opacty = 0;
			$el[0].style[prefix.css3('transition')] = 'opacity 3s';
			setTimeout(function() {
				$el[0].style.opacty = 1;
				setTimeout(function() {
					$el[0].style.display = 'none';
				}, 3000);
			}, 10);
		},
		errorCallback: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	})


};

export default form;