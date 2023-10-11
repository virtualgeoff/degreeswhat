const VERSION = "v0.2";

const CACHE_NAME = `SunClock-${VERSION}`;

const APP_RESOURCES = [
	"./",
	"index.html",
	"main.js",
	"data.js",
	"main.css",
];

// Install: cache the static resources
self.addEventListener("install", (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			cache.addAll(APP_RESOURCES);
		})(),
	);
});

// Activate: delete old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		(async () => {
			const names = await caches.keys();
			await Promise.all(
				names.map((name) => {
					if (name !== CACHE_NAME) {
						return caches.delete(name);
					}
				}),
			);
			await clients.claim();
		})(),
	);
});

// Fetch: intercept server requests and get from cache instead of network
self.addEventListener("fetch", (event) => {
	// As a single page app, direct app to always go to cached home page.
	if (event.request.mode === "navigate") {
		event.respondWith(caches.match("./"));
		return;
	}

	// For all other requests, go to the cache first, and then the network.
	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			const cachedResponse = await cache.match(event.request.url);
			if (cachedResponse) {
				// Return the cached response if it's available.
				return cachedResponse;
			}
			// If resource isn't in the cache, return a 404.
			return new Response(null, { status: 404 });
		})(),
	);
});
