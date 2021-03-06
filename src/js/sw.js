/* eslint-disable */
const CACHE_NAME = 'mudstone-sw'
const urlsToCache = ['/', __CSS__, __JS__]
/* eslint-enable */

function addToCache(request, response) {
	if (response.ok) {
		const copy = response.clone()
		caches.open(CACHE_NAME).then(cache => {
			cache.put(request, copy)
		})
		return response
	}
}

function fetchFromCache(event) {
	return caches.match(event.request).then(response => {
		if (!response) {
			// A synchronous error that will kick off the catch handler
			throw Error('${event.request.url} not found in cache')
		}
		return response
	})
}

function offlineResponse() {
	return new Response('Sorry, the application is offline.')
}

function respondFromNetworkThenCache(event) {
	// Check network first, then cache
	const request = event.request
	event.respondWith(
		fetch(request)
			.then(response => addToCache(request, response))
			.catch(() => fetchFromCache(event))
			.catch(() => offlineResponse())
	)
}

function respondFromCacheThenNetwork(event) {
	// Check cache first, then network
	const request = event.request
	event.respondWith(
		fetchFromCache(event)
			.catch(() => fetch(request))
			.then(response => addToCache(request, response))
			.catch(() => offlineResponse())
	)
}

function shouldHandleFetch(event) {
	return (
		event.request.method.toLowerCase() === 'get' &&
		event.request.url.indexOf('/icons/') === -1 &&
		event.request.url.indexOf('/browser-sync/') === -1 &&
		event.request.url.indexOf('google-analytics.com') === -1
	)
}

// Open cache and store assets
self.addEventListener('install', event => {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(urlsToCache)
		})
	)
})

self.addEventListener('fetch', event => {
	if (shouldHandleFetch(event)) {
		if (event.request.headers.get('Accept').indexOf('text/html') >= 0) {
			respondFromNetworkThenCache(event)
		} else {
			respondFromCacheThenNetwork(event)
		}
	}
})

self.addEventListener('activate', event => {
	const cacheWhitelist = [CACHE_NAME]
	// Clean up old cache versions
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})
