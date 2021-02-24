import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';


const isSupported = () =>
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window

export default function App() {
    const isLoadingComplete = useCachedResources();


    // React.useEffect(() => {
    //     function showNotification() {
    //         console.log("inside notification");
    //         isSupported() && Notification && Notification.requestPermission(function (result) {
    //             console.log("granted");
    //             if (result === "granted") {
    //                 navigator.serviceWorker.ready.then(function (registration) {
    //                     registration.showNotification(Math.random().toString(), {
    //                         body: 'Long press on this notification will show QR code',
    //                         tag: Math.random().toString(),
    //                         timestamp: Date.parse('01 Jan 2000 00:00:00'),
    //                         image: '/static/media/wl-logo.6c7b66c8.png',
    //                         vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
    //
    //                     });
    //                 });
    //             }
    //         });
    //
    //         if (isSupported()) {
    //             console.log(navigator);
    //             navigator?.serviceWorker?.controller?.postMessage({type: 'force-activate'})
    //         }
    //     }
    //
    //     showNotification();
    // }, [])


    // React.useEffect(() => {
    //     if(isSupported()) {
    //         navigator?.serviceWorker?.register({
    //             onUpdate: registration => {
    //                 // setWaitingServiceWorker(registration.waiting);
    //                 // setUpdateAvailable(true);
    //             }
    //         });
    //     }
    // }, []);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation/>
            </SafeAreaProvider>
        );
    }
}
