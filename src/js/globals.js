export default {

	breakpoints: {
		from : {
			'mobile': '(min-width: 20em)',
			'mobile-large': '(min-width: 30em)',
			'tablet-small': '(min-width: 33.75em)',
			'tablet': '(min-width: 47.5em)',
			'desktop': '(min-width: 64em)',
			'wide': '(min-width: 90em)'
		}
	},

	isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

}