var config = {
	tween: {
		easing: (t, b, c, d) => {
			if ((t/=d/2) < 1) { 
				return c/2*t*t + b
			}
			return -c/2 * ((--t)*(t-2) - 1) + b
		},
		duration: 1000
	},

	debounceDelay: 300,
	
	breakpoints: {
		mobile: 0,
		tablet: 778,
		desktop: 1024
	}
}

export default config;