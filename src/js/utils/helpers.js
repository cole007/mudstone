/**
 * Helper function to lock the screen in the current position and prevent scrolling
 *
 * @function lock
 * @return {Object}, capture/release methods
 */
export const lock = () => {
	const { style } = document.body
	let windowTop

	return {
		capture() {
			windowTop = window.pageYOffset
			style.position = 'fixed'
			style.height = '100%'
			style.width = '100%'
			style.overflow = 'hidden'
			style.top = `${windowTop * -1}px`
		},
		release() {
			style.position = ''
			style.height = ''
			style.width = ''
			style.overflow = ''
			style.top = ''
			window.scrollTo(0, windowTop)
		}
	}
}


/**
 * Converts a hypenated string into camel case: margin-top => marginTop
 *
 * @memberOf utils/helpers
 * @param  {String} str
 * @return {String} str
 */
export function camelCase(str) {
	return str.replace(/-([a-z])/g, function($0, $1) { return $1.toUpperCase() }).replace('-','')
}
