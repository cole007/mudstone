// import Barba from 'barba.js'
// import { Transition } from './transitions'
// import { Dispatcher } from './dispatcher'
import * as behaviours from '../behaviours'
import loader from '../loader'

export const views = () => {
	loader(behaviours)
	// Dispatcher(loader, behaviours)
	// Barba.Prefetch.init()
	// Barba.Pjax.start()
	// Barba.Pjax.getTransition = () => Transition
}
