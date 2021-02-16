import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import * as React from 'react';
import {Appbar, IconButton} from "react-native-paper";
import {createDrawerNavigator} from '@react-navigation/drawer';
import NotFoundScreen from "../screens/NotFoundScreen";
import {Image} from "react-native";
import AvailableTicketsScreen from '../components/availabletickets/AvailableTicketsScreen';
import DrawerContent from './DrawerContent';
import {FontAwesome5, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import BuyTicketScreen from "../components/availabletickets/BuyTicketScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {


    return (
        <Drawer.Navigator
            drawerType="front"
            drawerPosition={"left"}
            drawerContent={(props) => <DrawerContent drawerProps={props}/>}
        >

            <Drawer.Screen options={{
                drawerLabel: "Your Tickets",
                drawerIcon: ({focused, color, size}) => {
                    return (<FontAwesome5 name="ticket-alt" size={size} color={color}/>)
                },
            }}
                           name={"TicketsStack"}
                           component={TicketsStack}/>

            {/*<Drawer.Screen options={{*/}
            {/*    drawerLabel: "Buy Ticket",*/}
            {/*    drawerIcon: ({focused, color, size}) => {*/}
            {/*        return (<MaterialCommunityIcons name="bus-stop" size={size} color={color}/>)*/}
            {/*    },*/}
            {/*}}*/}
            {/*               name={"BuyTicketsStack"}*/}
            {/*               component={TicketsStack}/>*/}

            {/*<Drawer.Screen options={{*/}
            {/*    drawerLabel: "Schedule Notifications",*/}
            {/*    drawerIcon: ({focused, color, size}) => {*/}
            {/*        return (<MaterialIcons name="notifications-active" size={size} color={color}/>)*/}
            {/*    },*/}
            {/*}}*/}
            {/*               name={"ScheduleNotifications"}*/}
            {/*               component={TicketsStack}/>*/}

        </Drawer.Navigator>
    );
}

const RootStackTicketsList = createStackNavigator<any>();


function TicketsStack() {
    return (
        <RootStackTicketsList.Navigator screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
        }}>
            <RootStackTicketsList.Screen name="AvailableTickets" component={AvailableTicketsScreen}/>
            <RootStackTicketsList.Screen name="BuyTicket" component={BuyTicketScreen}/>
            <RootStackTicketsList.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </RootStackTicketsList.Navigator>
    );
}

const CustomNavigationBar: React.FC<StackHeaderProps> = ({navigation, previous, scene}) => {
    const {options} = scene.descriptor;
    const title = options.title;
    return (
        <Appbar.Header focusable>
            <IconButton
                icon="menu"
                // color={Colors.red500}
                size={30}
                onPress={() => navigation?.toggleDrawer()}
            />

            {previous ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
            <Appbar.Content focusable title={title}/>
            <Image source={require('./../assets/images/wl-logo.png')}
                   style={{resizeMode: "contain", width: 200, height: 55}}
            />
        </Appbar.Header>
    );
}


export default DrawerNavigator;
