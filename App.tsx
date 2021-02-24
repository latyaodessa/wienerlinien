import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {Button, Platform, View} from 'react-native';
import registerForPushNotifications from './hooks/registerForPushNotifications';
import 'intl';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


export default function App() {
    const isLoadingComplete = useCachedResources();

    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    const [notification, setNotification] = React.useState(false);
    // const [c, setC] = React.useState('');
    //
    // React.useEffect(() => {
    //     qrcodeGen.generate('123123', function (qrcode) {
    //         setC(qrcode);
    //     });
    // }, [])

    // React.useEffect(() => {
    //     registerForPushNotifications()
    // }, []);

    // React.useEffect(() => {
    //     const subscription = Notifications.addNotificationReceivedListener(response => {
    //
    //         console.log("NOTIFICATION GET");
    //     });
    //     return () => subscription.remove();
    // }, []);

    async function schedulePushNotification() {
        let body = `
▄▄▄▄▄▄▄ ▄▄  ▄ ▄▄▄▄▄▄▄
█ ▄▄▄ █ ▄▀▄ █ █ ▄▄▄ █
`;
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Hello world! \uD83C\uDF10',
                subtitle: "hello",
                body: "hello",
                data: {data: 'goes here'},
                sound: true,
            },
            trigger: {
                seconds: 2,
            },
        });
    }

    React.useEffect(() => {
        registerForPushNotificationsAsync();

        notificationListener.current = Notifications.addNotificationReceivedListener(ntf => {
            setNotification(ntf);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });




        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);


    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation/>
                {/*<View style={{padding: 100}}>*/}
                {/*<Button*/}
                {/*    title="Press to schedule a notification"*/}
                {/*    onPress={async () => {*/}
                {/*        await schedulePushNotification();*/}
                {/*    }}*/}
                {/*/>*/}
                {/*</View>*/}
            </SafeAreaProvider>
        );
    }
}

async function registerForPushNotificationsAsync() {

    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

}
