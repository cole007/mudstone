

/**
 * Smarter Resize Event
 * detail property on the custom event includes the window width/height
 */

;(function() {
	const throttle = function(type, name, obj = window) {
		let running = false
		const func = function() {
			if (running) {
				return
			}
			running = true
			requestAnimationFrame(function() {
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
