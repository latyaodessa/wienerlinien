import {Picker, Platform, ScrollView, View} from "react-native";
import * as React from "react";
import {DrawerScreenProps} from "@react-navigation/drawer";
import {ALL_TICKETS, TicketType} from "../../constants/Tickets";
import {
    ActivityIndicator,
    Button,
    Caption,
    Headline,
    Paragraph,
    Subheading,
    Surface,
    TextInput,
    Title,
    useTheme
} from 'react-native-paper';
import {CardIcon} from "./TicketCard";
import LottieView from "lottie-react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Formik} from 'formik';
import {storeWLTicket, uuidv4, WLTicket} from "../../utils/WLAsyncStorage";
import {useNavigation} from "@react-navigation/native";
import usePushNotification from "../../hooks/usePushNotification";
import * as Notifications from "expo-notifications";

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
        {/*<LinearGradient*/}
        {/*    style={{flex: 1}}*/}
        {/*    colors={[colors.surface, colors.background]}>*/}
        <TicketCard ticket={ticketToBuy}/>

        {/*</LinearGradient>*/}
    </ScrollView>
};


const BuyTicketForm: React.FC<{ ticket: TicketType }> = ({ticket}) => {
    const {colors} = useTheme();
    const navigation = useNavigation();

    return (<View style={{
        zIndex: 9999,
        paddingTop: 10,
        margin: 10,
        backgroundColor: colors.background,
        top: -50,
        // marginTop: 15,
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
                currentDate.setMinutes(currentDate.getMinutes() + 80);

                const ticketValues: WLTicket = {
                    id: uuidv4(),
                    ticket: ticket,
                    station: "test station",
                    validFrom: new Date(),
                    validTo: currentDate,

                };

                storeWLTicket(ticketValues).then(async () => {



                    formikHelpers.setSubmitting(false);

                    navigation.pop();
                    navigation.navigate('SingleTicketScreen', {
                        ticketId: ticketValues.id
                    });

                });

            }}
            // validationSchema={Yup.object().shape(validationSchema)}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid, isSubmitting}) => {
                return (
                    <View style={{padding: 5}}>
                        {/*{formC.subComponents?.map((subComponent, index) => {*/}
                        {/*    return <ComponentSelector key={subComponent.id}*/}
                        {/*                              component={subComponent}*/}
                        {/*                              screenProps={screenProps}*/}
                        {/*                              bindingValues={bindingValues}*/}
                        {/*                              screenId={screenId}*/}
                        {/*    />*/}
                        {/*})}*/}

                        <Caption>Quantity</Caption>
                        <Picker
                            style={{
                                // width: 200,
                                height: 60,
                                backgroundColor: colors.background,
                                borderColor: 'grey',
                                borderWidth: 1,
                                color: colors.text
                            }}
                            itemStyle={{
                                height: 60,
                                color: colors.text
                            }}
                            // selectedValue={this.state.firstLanguage}
                            // onValueChange={(itemValue) => this.setState({firstLanguage: itemValue})}
                        >
                            {Array(10).fill(1).map((r, index) => {
                                const count = index + 1;
                                return <Picker.Item key={count} label={count.toString()} value={count}/>
                            })}


                        </Picker>

                        <TextInput
                            // onChangeText={handleChange(fieldId)}
                            // onBlur={() => handleBlur(fieldId)}
                            // mode={inputFieldC.mode === InputFieldCModeEnum.FLAT ? "flat" : "outlined"}
                            label={"Count"}
                            // value={value}
                            // error={isError}
                            keyboardType={"numeric"}
                        />


                        <Button
                            loading={isSubmitting}
                            mode="contained"
                            onPress={handleSubmit}
                            // onPress={handleSubmit}
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
