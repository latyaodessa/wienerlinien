import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {Surface, Title, useTheme} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import QuickRideTicketsList from './QuickRideTicketsList';
import {getWLTickets, WLTicket} from "../../utils/WLAsyncStorage";
import {useIsFocused} from "@react-navigation/native";
import {BoughtTicketCard} from '../tickets/TicketsListScreen';


const SecondRoute = () => (
    <View style={[{backgroundColor: '#673ab7'}]}/>
);

const initialLayout = {width: Dimensions.get('window').width};

const AvailableTicketsScreen = () => {

    const {colors} = useTheme();


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Quick Ride'},
        {key: 'second', title: 'Tourist'},
        // {key: '123', title: 'Long Term'},
    ]);

    const renderScene = SceneMap({
        first: QuickRideTicketsList,
        second: SecondRoute,
    });

    return (
        <View style={{flex: 1}}>
            <CurrentTicket/>
            <TabView
                renderTabBar={props => <TabBar {...props} renderIcon={({route, focused, color}) => (
                    <MaterialCommunityIcons name="clock-outline" size={20} color={color}/>
                )}
                                               activeColor={colors.primary}
                                               inactiveColor={"grey"}
                                               indicatorStyle={{backgroundColor: colors.primary}}
                                               style={{backgroundColor: "#FFF"}}
                />}

                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
        </View>

    )
}

const CurrentTicket = () => {

    const [validTicket, setValidTicket] = React.useState<WLTicket | undefined>(undefined);
    const isFocused = useIsFocused();

    React.useEffect(() => {
        getWLTickets().then((tickets) => {
            const validTickets = tickets.filter(t => new Date(t.validTo) >= new Date());
            const currentTickets = validTickets.filter(t => new Date(t.validFrom) <= new Date());

            if (currentTickets.length > 0) {
                setValidTicket(currentTickets[0]);
            } else if (validTickets.length > 0) {
                setValidTicket(validTickets[0]);
            }
        });
    }, [isFocused])


    if (!validTicket) {
        return <View/>;
    }

    return (<View>


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

            <Title>Active Ticket</Title>

        </Surface>


        <BoughtTicketCard validTicket={validTicket}/>
    </View>)
}


export default AvailableTicketsScreen;
