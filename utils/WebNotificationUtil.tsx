const isSupported = () =>
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window

export function scheduleNotification(hours: number, minutes: number, ticketId?: string) {
    isSupported() && Notification && Notification.requestPermission(function (result) {
        console.log("granted");
        if (result === "granted") {
            const currentDate = new Date();
            currentDate.setHours(hours);
            currentDate.setMinutes(minutes);
            const timestamp = currentDate.getTime();

            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification('🕒 Your Wiener Linien Ticket', {
                    body: "This is scheduled notification, long press on this notification shows QR code",
                    tag: Math.random().toString(),
                    timestamp: timestamp,
                    data: {
                        url: window.location.href, // pass the current url to the notification
                        ticketId
                    },
                    image: 'https://wl.erfolg100.com/fixed/android_1.jpg',
                    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]

                });
            });
        } else {
            alert("Notification is not granted on this device")
        }
    });

    if (!isSupported()) {
        alert("Looks like your browser does not support push notification. Try it on Android phone");
    }

    if (isSupported()) {
        console.log(navigator);
        navigator?.serviceWorker?.controller?.postMessage({type: 'force-activate'})
    }
}


export function sendNotificationNow(title: string, body: string, ticketId?: string) {
    isSupported() && Notification && Notification.requestPermission(function (result) {
        console.log("granted");
        if (result === "granted") {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification(title, {
                    body: body,
                    tag: Math.random().toString(),
                    data: {
                        url: window.location.href, // pass the current url to the notification
                        ticketId: ticketId
                    },
                    timestamp: Date.parse('01 Jan 2000 00:00:00'),
                    image: 'https://wl.erfolg100.com/fixed/android_1.jpg',
                    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]

                });
            });
        } else {
            alert("Notification is not granted on this device")
        }
    });

    if (!isSupported()) {
        alert("Looks like your browser does not support push notification. Try it on Android phone");
    }


    if (isSupported()) {
        console.log(navigator);
        navigator?.serviceWorker?.controller?.postMessage({type: 'force-activate'})
    }
}
