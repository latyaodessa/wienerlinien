/* eslint-env browser */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('SW_PUBLIC_URL/expo-service-worker.js', {scope: 'SW_PUBLIC_SCOPE'})
            .then(function (info) {
                console.info('Registered service-worker', info);


                // info.addEventListener('updatefound', () => {
                //     console.log('Service Worker update detected!');
                //     if (info.installing) {
                //         // wait until the new Service worker is actually installed (ready to take over)
                //         console.log(' wait until the new Service worker is actually installed (ready to take over)');
                //         info.installing.addEventListener('statechange', () => {
                //             if (info.waiting) {
                //                 // if there's an existing controller (previous Service Worker), show the prompt
                //                 console.log('if there\'s an existing controller (previous Service Worker), show the prompt');
                //                 if (navigator.serviceWorker.controller) {
                //                     // invokeServiceWorkerUpdateFlow(registration)
                //                     console.log('invokeServiceWorkerUpdateFlow');
                //                 } else {
                //                     // otherwise it's the first install, nothing to do
                //                     console.log('Service Worker initialized for the first time')
                //                 }
                //             }
                //         })
                //     }
                // });
                return info;

            })
            .then(function (reg) {
                console.log("AAAA");
                if (!navigator.serviceWorker.controller) {
                    return
                }
                console.log("BBB");
                reg.addEventListener('updatefound', function () {
                    console.log("updatefound");
                    const newWorker = reg.installing
                    newWorker.state

                    var refreshing

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state == 'activated') {
                            if (refreshing) return
                            window.location.reload()
                            refreshing = true
                        }
                    })

                    trackInstalling(reg.installing)
                })
            })
            .catch(function (error) {
                console.info('Failed to register service-worker', error);
            });
    });

    // navigator.serviceWorker.getRegistrations().then(function (registrations) {
    //     console.log("pre register");
    //     console.log(registrations);
    //     // for (let registration of registrations) {
    //     //     registration.update()
    //     // }
    // })
}
