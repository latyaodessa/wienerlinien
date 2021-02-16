const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(
        {
            ...env,
            // Passing true will enable the default Workbox + Expo SW configuration.
            offline: true,
        },
        argv
    );

    config.resolve.alias['react-native'] = 'react-native-web';
    config.resolve.alias['lottie-react-native'] = 'react-native-web-lottie';

    // Customize the config before returning it.

// // adjust Google Workbox (service worker) config to avoid caching problems
//     if (config['plugins']) {
//         config['plugins'].forEach((plugin) => {
//             // detect workbox plugin
//             if (plugin['config'] && plugin['config']['swDest'] === 'service-worker.js') {
//                 // // tell it never to cache index.html or service-worker.js
//                 // plugin['config']['exclude'].push(/index.html/);
//                 // plugin['config']['exclude'].push(/service-worker.js/);
//
//                 // (optional) tell it to start new service worker versions immediately, even if tabs
//                 // are still running the old one.
//                 plugin['config']['skipWaiting'] = false;
//             }
//         });
//     }

    return config;
};
