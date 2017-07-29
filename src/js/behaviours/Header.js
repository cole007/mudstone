import Behaviour from '@/core'

// use the unmount() method to remove any events, 
// kill plugins etc
export class Header extends Behaviour {
	constructor(el) {
		super(el, 'Header')
		log('init header')
	}

	mounted() {}

	unmount() {
		log('Unmounted header')
	}
}