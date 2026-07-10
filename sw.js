// ══════════════════════════════════════════════════════════
//  sw.js — Service Worker ILCH avec mise à jour automatique
// ══════════════════════════════════════════════════════════

// ⚠️ IMPORTANT : Changez ce numéro à chaque mise à jour !
// Exemple : 'ilch-cache-v2', 'ilch-cache-v3', etc.
const CACHE_VERSION = 'ilch-cache-v4';
const CACHE_NAME = CACHE_VERSION;

const CACHE_URLS = [
  '/',
  '/index.html',
  '/apropos.html',
  '/vie-scolaire.html',
  '/admissions.html',
  '/evenements.html',
  '/plateforme.html',
  '/style.css',
  '/script.js',
  '/login.html',
  '/dashboard-eleve.html',
  '/dashboard-prof.html',
  '/dashboard-parent.html',
  '/dashboard-admin.html',
  '/dashboard-responsable.html',
  '/dashboard-infirmiere.html',
  '/dashboard-comptable.html',
  '/dashboard-bibliotheque.html',
  '/dashboard-owner.html',
  '/mobile.css',
  '/manifest.json',
];

// ── Installation ────────────────────────────────────────────
self.addEventListener('install', function(event) {
  console.log('[SW ILCH] Nouvelle version détectée — Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS.map(function(url) {
        return new Request(url, { mode: 'no-cors' });
      })).catch(function(err) {
        console.log('[SW] Erreur cache:', err);
      });
    })
  );
  // Activer immédiatement sans attendre
  self.skipWaiting();
});

// ── Activation — supprimer anciens caches ───────────────────
self.addEventListener('activate', function(event) {
  console.log('[SW ILCH] Activation — Nettoyage anciens caches...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          console.log('[SW] Suppression ancien cache:', name);
          return caches.delete(name);
        })
      );
    }).then(function() {
      // Prendre contrôle de tous les onglets ouverts
      return self.clients.claim();
    }).then(function() {
      // Notifier tous les onglets que la mise à jour est disponible
      return self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({
            type: 'SW_UPDATED',
            version: CACHE_VERSION,
            message: 'Nouvelle version disponible ! La page va se recharger.'
          });
        });
      });
    })
  );
});

// ── Interception requêtes ───────────────────────────────────
self.addEventListener('fetch', function(event) {
  // Ne pas intercepter Firebase
  if (event.request.url.includes('firebase') ||
      event.request.url.includes('firestore') ||
      event.request.url.includes('googleapis') ||
      event.request.url.includes('gstatic')) {
    return;
  }

  event.respondWith(
    // Stratégie : Network First pour les HTML, Cache First pour les assets
    fetch(event.request).then(function(networkResponse) {
      if (networkResponse && networkResponse.status === 200) {
        var responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(function() {
      // Hors ligne — utiliser le cache
      return caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) return cachedResponse;
        if (event.request.destination === 'document') {
          return caches.match('/login.html');
        }
      });
    })
  );
});

// ── Notifications Push ──────────────────────────────────────
self.addEventListener('push', function(event) {
  var data = event.data ? event.data.json() : {};
  var options = {
    body: data.corps || 'Vous avez une nouvelle notification',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/login.html' },
    actions: [
      { action: 'ouvrir', title: 'Ouvrir' },
      { action: 'fermer', title: 'Fermer' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(
      data.titre || 'ILCH — Nouvelle notification',
      options
    )
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action !== 'fermer') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/login.html')
    );
  }
});

console.log('[SW ILCH] Service Worker v3 chargé ✓');
