import Behaviour from '@/core'

// use the unmount() method to remove any events, 
// kill plugins etc
export class A extends Behaviour {
	constructor(el) {
		super(el, 'A')
		log('init A')
	}

	mounted() {}

	unmount() {
		log('Unmount happened to A')
	}
}