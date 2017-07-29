export function groupBy(input, key) {
	return input.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x)
		return rv
	}, {})
}

export function isFunc(fn) {
	return typeof fn === 'function'
}