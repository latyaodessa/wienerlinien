import * as React from "react";
import {getWLTickets, WLTicket} from "../../utils/WLAsyncStorage";
import {Image, Platform, ScrollView, View} from "react-native";
import {DrawerScreenProps} from "@react-navigation/drawer";
import {ActivityIndicator, Button, Card, Surface, Title, useTheme} from "react-native-paper";
import moment from "moment";
import {isTicketValid} from "../tickets/TicketsListScreen";
import * as Notifications from "expo-notifications";
import {sendNotificationNow} from "../../utils/WebNotificationUtil";

const SingleTicketScreen: React.FC<DrawerScreenProps> = ({route, navigation}) => {

    const {ticketId} = route.params;
    const [validTicket, setValidTicket] = React.useState<WLTicket | undefined>(undefined);
    const {colors} = useTheme();
    let isValid = validTicket ? isTicketValid(validTicket) : false;

    React.useEffect(() => {
        getWLTickets().then((tickets) => {
            const ticket = tickets.find(t => t.id === ticketId);
            setValidTicket(ticket);
        });
    }, [ticketId])

    const sendPushNotification = () => {


        if (Platform.OS === "web") {
            sendNotificationNow(`🚌 ${validTicket?.ticket.title} ticker is here`, 'Long press on this notification will show QR code', ticketId);


        } else {
            Notifications.cancelAllScheduledNotificationsAsync();

            Notifications.scheduleNotificationAsync({
                content: {
                    title: `🚌 ${validTicket?.ticket.title} ticker is here`,
                    body: 'Long press on this notification will show QR code',
                    data: {ticketId: ticketId},
                },
                trigger: null,
            });
        }


    }

    if (!validTicket) {
        return <ActivityIndicator/>;
    }

    return (<ScrollView style={{flex: 1}}>

        <Surface

            style={{
                backgroundColor: "#E30013",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
                margin: 0,
                borderWidth: 0,
                elevation: 5
            }}>

            <Title>Your Ticket</Title>

        </Surface>
        <View style={{padding: 5}}>

            <Card style={{
                borderWidth: 1,
                borderColor: "#FFF",
                borderStyle: "dashed",
                backgroundColor: isValid ? "#E30013" : colors.disabled
            }} onPress={() => {
                navigation.navigate('SingleTicketScreen', {
                    ticketId: validTicket.id
                });
            }}>
                <Card.Title title={validTicket.ticket.title} subtitle={isValid ? "Active" : "Expired"}/>
                <Card.Content>
                    <Image source={require('./../../assets/codes/1.png')}
                           style={{resizeMode: "contain", width: "100%", height: 400}}
                    />
                    <View>

                        <Title
                            style={{color: "#FFF"}}>{"Valid from: \n" + moment(validTicket.validFrom).format('YYYY-MM-DD HH:MM')}</Title>
                        <Title
                            style={{color: "#FFF"}}>{"Valid to: \n" + moment(validTicket.validTo).format('YYYY-MM-DD HH:MM')}</Title>
                    </View>
                </Card.Content>

            </Card>


            <View style={{justifyContent: "space-between"}}>

                <Button disabled={!isValid} mode="contained" style={{marginTop: 10}} onPress={sendPushNotification}>Send Push
                    Notification</Button>
                <Button  disabled={!isValid} mode="contained" style={{marginTop: 10}}>Add to Wallet</Button>
            </View>
        </View>
    </ScrollView>)
}


export default SingleTicketScreen;
