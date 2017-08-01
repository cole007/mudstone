import Behaviour from '@/core'
import Validation from '@/ui/validation'

export class Validate extends Behaviour {
	constructor(el) {
		super(el)

		new Validation(el)
	}
}