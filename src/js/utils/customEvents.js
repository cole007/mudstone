import raf from 'raf'

// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent


/*
	Smarter Scroll Event
	detail property on the custom event includes the y offset and the direction of scroll
*/
;(function() {
	let prev = 0
	const throttle = function(type, name, obj = window) {
		let running = false
		const func = function() {
			if (running) {
				return
			}
			running = true
			raf(function() {
				const y =  window.pageYOffset
				const direction = y > prev ? 'down' : 'up'
				// this is very nice... custom events... fancy
				obj.dispatchEvent(new CustomEvent(name, {
					detail: {
						y,
						direction
					}
				}))
				prev = y
				running = false
			})
		}
		obj.addEventListener(type, func)
	}

	/* init - you can init any event */
	throttle('scroll', 'smartscoll')
})()


/*
	Smarter Resize Event
	detail property on the custom event includes the window width/height
*/
;(function() {
	const throttle = function(type, name, obj = window) {
		let running = false
		const func = function() {
			if (running) {
				return
			}
			running = true
			raf(function() {
				const width = window.innerWidth || document.documentElement.clientWidth
				const height = window.innerHeight || document.documentElement.clientHeight
				obj.dispatchEvent(new CustomEvent(name, {
					detail: {
						width,
						height
					}
				}))
				running = false
			})
		}
		obj.addEventListener(type, func)
	}

	/* init - you can init any event */
	throttle('resize', 'smartresize')
})()
