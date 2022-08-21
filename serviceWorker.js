const staticSimpleTaskList = 'simple-task-list-v1';
const assets = [
    '/',
    'index.html',
    '/js/script.js'
];

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
      caches.open(staticSimpleTaskList).then(cache => {
        cache.addAll(assets)
      })
    )
  });

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  });
