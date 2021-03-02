import {ScrollView, View} from "react-native";
import * as React from "react";
import {DrawerScreenProps} from "@react-navigation/drawer";
import {ALL_TICKETS, TicketType} from "../../constants/Tickets";
import {ActivityIndicator, Button, Headline, Paragraph, Subheading, Surface, Title, useTheme} from 'react-native-paper';
import {CardIcon} from "./TicketCard";
import LottieView from "lottie-react-native";
import {Formik} from 'formik';
import {storeWLTicket, uuidv4, WLTicket} from "../../utils/WLAsyncStorage";
import {useNavigation} from "@react-navigation/native";
import {AlertContext} from "../../context/AlertContext";

const BuyTicketScreen: React.FC<DrawerScreenProps> = ({route, navigation}) => {

    const {ticket} = route.params;
    const [ticketToBuy, setTicketToBuy] = React.useState<TicketType | undefined>(undefined);
    const {colors} = useTheme();


    React.useEffect(() => {
        setTicketToBuy(ALL_TICKETS.find(t => ticket === t.id));
    }, [ticket]);


    if (!ticketToBuy) {
        return <ActivityIndicator animating={true}/>;
    }

    return <ScrollView style={{flex: 1, backgroundColor: colors.surface}}>
        <TicketCard ticket={ticketToBuy}/>
    </ScrollView>
};


const BuyTicketForm: React.FC<{ ticket: TicketType }> = ({ticket}) => {
    const {colors} = useTheme();
    const navigation = useNavigation();
    const {dispatchAlert} = React.useContext(AlertContext);

    return (<View style={{
        zIndex: 9999,
        paddingTop: 10,
        margin: 10,
        backgroundColor: colors.background,
        top: -50,
        borderWidth: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }}>
        <Formik
            enableReinitialize={true}
            initialValues={ticket}
            onSubmit={(values, formikHelpers) => {

                formikHelpers.setSubmitting(true);

                const currentDate = new Date();
                currentDate.setMinutes(currentDate.getMinutes() + ticket.timeValid);

                const ticketValues: WLTicket = {
                    id: uuidv4(),
                    ticket: ticket,
                    station: "test station",
                    validFrom: new Date(),
                    validTo: currentDate,

                };

                storeWLTicket(ticketValues).then(async () => {


                    formikHelpers.setSubmitting(false);

                    dispatchAlert && dispatchAlert({
                        type: 'open',
                        alertType: 'success',
                        message: "Thank you for purchasing a ticket"
                    });

                    navigation.pop();
                    navigation.navigate('SingleTicketScreen', {
                        ticketId: ticketValues.id
                    });

                });

            }}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid, isSubmitting}) => {
                return (
                    <View style={{padding: 5}}>
                        <Button
                            loading={isSubmitting}
                            mode="contained"
                            onPress={handleSubmit}
                        >
                            Buy Ticket
                        </Button>
                    </View>
                )
            }}
        </Formik>
    </View>)
}

const TicketCard: React.FC<{ ticket: TicketType }> = ({ticket}) => {

    return <Surface style={{flex: 1, margin: 0, borderRadius: 0, elevation: 4, padding: 5}}>
        <View style={{paddingBottom: 50}}>
            <Headline style={{paddingTop: 5, paddingBottom: 10}}>{ticket.title}</Headline>
            <Subheading>{ticket.suggestion}</Subheading>


            <Surface
                style={{
                    backgroundColor: "#E30013",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 0,
                    borderWidth: 0,
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50
                }}>

                <Title>Ticket information</Title>
                <LottieView
                    style={{position: "relative", height: 60, width: 55}}
                    source={require('./../../assets/lottie/info.json')} autoPlay loop/>
            </Surface>


            <View style={{
                margin: 0,
                borderWidth: 0,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15
            }}>
                <Paragraph>• {ticket.shortDesc}</Paragraph>
                {ticket.info.map(info => (<Paragraph key={info}>• {info}</Paragraph>))}


            </View>
            <Title style={{color: "#FFF"}}>€{ticket.price}</Title>

            <CardIcon type={ticket.type}/>

        </View>
        <BuyTicketForm ticket={ticket}/>
    </Surface>
}
export default BuyTicketScreen;
