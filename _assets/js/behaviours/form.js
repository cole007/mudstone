import ValidateForm from '../helpers/validation';

function form(container) {
	var validate = new ValidateForm({
		form: container,
		constraints: {
			email: {
				// Email is required
				presence: true,
				// and must be an email (duh)
				email: true,
			},
			password: {
				// Password is also required
				presence: true,
				// And must be at least 5 characters long
				length: {
					minimum: 5
				}
			},
			"confirm-password": {
				// You need to confirm your password
				presence: true,
				// and it needs to be equal to the other password
				equality: {
					attribute: "password",
					message: "^The passwords does not match"
				}
			},
			options: {
				presence: true,
			},
			tock: {
				presence: true,
			},
			message: {
				presence: true,
			}
		},
		ajax: true,
		successCallback: function(response, textStatus, jqXHR) {
			console.log('success');
		},
		errorCallback: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	})

};

export default form;