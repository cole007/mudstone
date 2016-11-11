import Barba from 'barba.js'
import { events } from '../helpers/events'

export const Dispatcher = (loader, behaviour) => {

	let clicked
	/*
	* set clicked to true
	*/
	Barba.Dispatcher.on('linkClicked', () => {
		clicked = true
	})
	

	Barba.Dispatcher.on('initStateChange', function(currentStatus) {

	})
	
	/*
	* only loaded behaviour is a click event has occurred
	*/
	Barba.Dispatcher.on('transitionCompleted', (currentStatus, oldStatus) => {

	})

	Barba.Dispatcher.on('newPageReady', () => {
		
	})
}