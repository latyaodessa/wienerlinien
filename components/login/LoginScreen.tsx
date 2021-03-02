import * as React from "react";
import {Image, ScrollView, View} from "react-native";
import {DrawerScreenProps} from "@react-navigation/drawer";
import {ActivityIndicator, Button, Headline, Surface, TextInput, Title} from "react-native-paper";
import {getSession, resetTickets, storeSession, storeWLTicket, WLTicket} from "../../utils/WLAsyncStorage";
import {useIsFocused} from "@react-navigation/native";
import {TicketType, TicketTypeEnum} from "../../constants/Tickets";
import {CurrentTicket} from "../availabletickets/AvailableTicketsScreen";

const LoginScreen: React.FC<DrawerScreenProps> = ({route, navigation}) => {
    const isFocused = useIsFocused();
    
    const [loggedIn, setLoggedIn] = React.useState<boolean | undefined>(undefined);

    const auth = (login: boolean) => {


        if (login) {

            const ticket: TicketType = {
                id: "U1",
                title: "Jahreskarte",
                shortDesc: "Yearly subscription ticket",
                suggestion: "Jahreskarte",
                price: "360",
                info: [],
                type: TicketTypeEnum.LONG
            }
            const ticketValues: WLTicket = {
                id: "U1",
                ticket: ticket,
                station: "test station",
                validFrom: new Date("2020-06-22"),
                validTo: new Date("2021-06-22"),

            };

            storeWLTicket(ticketValues).then(async () => {
                storeSession(login);
                setLoggedIn(login);

            });
        } else {

            resetTickets().then(async () => {
                storeSession(login);
                setLoggedIn(login);

            });

        }

    }

    React.useEffect(() => {
        setLoggedIn(undefined);
        getSession().then((session) => {
            setLoggedIn(session);
        });
    }, [isFocused])

    if (loggedIn === undefined) {
        return <ActivityIndicator/>;
    }

    return (<ScrollView style={{flex: 1}}>

        {!loggedIn && <LoginForm auth={auth}/>}
        {loggedIn && <Profile auth={auth}/>}
    </ScrollView>)
}

const LoginForm: React.FC<{ auth: (v: boolean) => void }> = ({auth}) => {


    return (<Surface style={{flex: 1, padding: 5}}>
        <Headline>Login</Headline>
        <TextInput
            label="Email"
            value={"andriifedorenko@gmail.com"}
            // onChangeText={text => setText(text)}
        />
        <TextInput
            secureTextEntry={true}
            label="Password"
            value={"hello123"}
            // onChangeText={text => setText(text)}
        />
        <Button onPress={() => auth(true)} mode="contained">Login</Button>
    </Surface>)
}

const Profile: React.FC<{ auth: (v: boolean) => void }> = ({auth}) => {
    return (<View style={{flex: 1, alignItems: "center", padding: 10}}>
        <Image
            style={{
                width: 150,
                height: 150,
                borderColor: 'red',
                borderWidth: 2,
                borderRadius: 75
            }}
            source={require('./../../assets/images/pic.jpeg')}
            resizeMode={"cover"}
        />
        <Headline>Andrii Fedorenko</Headline>
        <Title>Abo: 1231511</Title>
        <Button style={{margin: 15}} onPress={() => auth(false)} mode="contained">Logout</Button>

        <CurrentTicket/>

    </View>)
}
export default LoginScreen;
