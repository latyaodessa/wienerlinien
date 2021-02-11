/* eslint-env serviceworker */


self.addEventListener('installed', event => {
    console.log("installed");
    console.log(event);
    if (event.isUpdate) {
        if (confirm(`New content is available!. Click OK to refresh`)) {
            window.location.reload();
        }
    }
});
//
// self.addEventListener('activate', function(event) {
//     console.log("activate");
//     console.log(event);
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.filter(function(cacheName) {
//                     console.log(cacheName);
//                     // Return true if you want to remove this cache,
//                     // but remember that caches are shared across
//                     // the whole origin
//                     return true;
//                 }).map(function(cacheName) {
//                     return caches.delete(cacheName);
//                 })
//             );
//         })
//     );
// });

/**
 * Store notification icon string in service worker.
 * Ref: https://stackoverflow.com/a/35729334/2603230
 */
self.addEventListener('message', event => {
    let data;
    if (typeof event.data === 'string') {
        try {
            data = JSON.parse(event.data);
        } catch (e) {
        }
    }

    if (data && data.fromExpoWebClient) {
        self.notificationIcon = data.fromExpoWebClient.notificationIcon;
    }
});

/**
 * Add support for push notification.
 */
self.addEventListener('push', event => {
    let payload = {};
    try {
        payload = event.data.json();
    } catch (e) {
        // If `event.data.text()` is not a JSON object, we just treat it
        // as a plain string and display it as the body.
        payload = {title: '', body: event.data.text()};
    }

    const title = payload.title;
    const data = payload.data || payload.custom || {};
    const options = {
        body: payload.body,
        data,
    };
    options.icon = data._icon || payload.icon || self.notificationIcon || null;
    options.image =
        data._richContent && data._richContent.image ? options.data._richContent.image : payload.image;
    options.tag = data._tag || payload.collapseKey;
    if (options.tag) {
        options.renotify = data._renotify;
    }

    event.waitUntil(self.registration.showNotification(title, options));
});

// https://developer.mozilla.org/en-US/docs/Web/API/Clients
self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        (async () => {
            const allClients = await self.clients.matchAll({
                includeUncontrolled: true,
            });

            let appClient;

            const path = event.notification.data._webPath || '/';

            // If we already have a window open, use it.
            for (const client of allClients) {
                const url = new URL(client.url);

                if (url.pathname === path) {
                    client.focus();
                    appClient = client;
                    break;
                }
            }

            // If there is no existing window, open a new one.
            if (!appClient) {
                appClient = await self.clients.openWindow(path);
            }

            // Message the client:
            // `origin` will always be `'selected'` in this case.
            // https://docs.expo.io/versions/latest/sdk/notifications/#notification
            appClient.postMessage({
                origin: 'selected',
                data: event.notification.data,
                remote: !event.notification._isLocal,
            });
        })()
    );
});


// self.addEventListener('message', ({ data }) => {
//     console.log(data);
//     if (data.type === 'force-activate') {
//         self.skipWaiting();
//         self.clients.claim();
//         self.clients.matchAll().then((clients) => {
//             clients.forEach((client) => client.postMessage('reload-window'));
//         });
//     }
// });
//
// self.addEventListener('message', ({ data }) => {
//     console.log(data);
//     if (data.type === 'reload-window') {
//         window.location.reload();
//     }
// });


//
// self.addEventListener("message", (event) => {
//     console.log("MESSAGE")
//     console.log(event)
//     if (event.data.action === "SKIP_WAITING") {
//         console.log("SKIP_WAITING")
//         self.skipWaiting();
//     }
// });
//
// self.addEventListener('message', event => {
//     if (event.data.type === 'sync') {
//
//         console.log("SYNC message");
//
//         self.registration
//             .unregister()
//             .then(function () {
//                 console.log("match ALl");
//                 console.log(self.clients.matchAll());
//                 return self.clients.matchAll();
//             })
//             .then(function (clients) {
//                 console.log("navigate");
//                 console.log("clients");
//                 console.log(clients);
//                 // clients.forEach((client) => client.navigate(client.url));
//             });
//
//         // self.navigator.serviceWorker.getRegistrations().then(function (registrations) {
//         //     for (let registration of registrations) {
//         //         // registration.update();  does not work!
//         //         registration.unregister();
//         //     }
//         //     window.location.reload();
//         // });
//
//         // // get a unique id to save the data
//         // const id = uuid()
//         // syncStore[id] = event.data
//         // // register a sync and pass the id as tag for it to get the data
//         // self.registration.sync.register(id)
//     }
//     console.log(event.data)
// })

// TODO: Consider cache: https://github.com/expo/expo-cli/pull/844#issuecomment-515619883
// Import the script generated by workbox.
self.importScripts('service-worker.js');

