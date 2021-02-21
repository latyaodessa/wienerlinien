import * as React from "react";
import {getWLTickets, WLTicket} from "../../utils/WLAsyncStorage";
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import {DrawerScreenProps} from "@react-navigation/drawer";
import {ActivityIndicator, Card, Subheading, Surface, Title, useTheme} from "react-native-paper";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import Svg, {Circle} from "react-native-svg";
import moment from "moment";

const TicketsListScreen: React.FC<DrawerScreenProps> = ({route, navigation}) => {
    const isFocused = useIsFocused();

    const [tickets, setTickets] = React.useState<Array<WLTicket> | undefined>(undefined);

    React.useEffect(() => {
        getWLTickets().then((tks) => {
            setTickets(tks)
        });
    }, [isFocused])


    if (!tickets) {
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

            <Title>Your Tickets</Title>

        </Surface>
        {tickets.map(t => <BoughtTicketCard key={t.id} validTicket={t}/>)}
    </ScrollView>)
}


export const BoughtTicketCard: React.FC<{ validTicket: WLTicket }> = ({validTicket}) => {

    const navigation = useNavigation();
    const {colors} = useTheme();
    let isValid = isTicketValid(validTicket);

    return (<TouchableOpacity
        style={{padding: 10}}
    >

        <Svg height="50" width="50" viewBox="0 0 100 100"
             style={{position: "absolute", zIndex: 999, top: 90, left: -20}}>
            <Circle cx="50" cy="50" r="45" fill={colors.background}/>
        </Svg>

        <Svg height="50" width="50" viewBox="0 0 100 100"
             style={{position: "absolute", zIndex: 999, top: 90, right: -20}}>
            <Circle cx="50" cy="50" r="45" fill={colors.background}/>
        </Svg>
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
            <Card.Title title={validTicket.ticket.title} subtitle={isValid ? "Active" : "Inactive"}/>
            <Card.Content style={{flexDirection: "row", justifyContent: "space-around"}}>
                <Image source={require('./../../assets/codes/1.png')}
                       style={{resizeMode: "contain", width: 130, height: 130}}
                />
                <View>
                    <Subheading
                        style={{color: "#FFF"}}>{"Valid from: \n" + moment(validTicket.validFrom).format('YYYY-MM-DD HH:MM')}</Subheading>
                    <Title
                        style={{color: "#FFF"}}>{"Valid to: \n" + moment(validTicket.validTo).format('YYYY-MM-DD HH:MM')}</Title>
                </View>
            </Card.Content>
        </Card>
    </TouchableOpacity>)
}


export const isTicketValid = (wlTicket: WLTicket) => {
    return new Date(wlTicket.validTo) >= new Date() && new Date(wlTicket.validFrom) <= new Date();
}

export default TicketsListScreen;
