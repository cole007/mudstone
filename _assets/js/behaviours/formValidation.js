import Base from '../helpers/base'
import Validation from '../helpers/validation'


export class formValidation extends Base {
	constructor(el) {
		super(el)

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
	}
}
