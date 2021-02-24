import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import * as React from 'react';
import {Appbar, IconButton} from "react-native-paper";
import {createDrawerNavigator} from '@react-navigation/drawer';
import NotFoundScreen from "../screens/NotFoundScreen";
import {Image} from "react-native";
import AvailableTicketsScreen from '../components/availabletickets/AvailableTicketsScreen';
import DrawerContent from './DrawerContent';
import {FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import BuyTicketScreen from "../components/availabletickets/BuyTicketScreen";
import SingleTicketScreen from '../components/availabletickets/SingleTicketScreen';
import TicketsListScreen from '../components/tickets/TicketsListScreen';
import ScheduleNotificationScreen from '../components/schedule/ScheduleNotificationScreen';
import LoginScreen from "../components/login/LoginScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {


    return (
        <Drawer.Navigator
            drawerType="front"
            drawerPosition={"left"}
            drawerContent={(props) => <DrawerContent drawerProps={props}/>}
        >


            <Drawer.Screen options={{
                drawerLabel: "Tickets Shop",
                drawerIcon: ({focused, color, size}) => {
                    return (<FontAwesome5 name="shopping-cart" size={size} color={color}/>)
                },
            }}
                           name={"TicketsStack"}
                           component={TicketsStack}/>

            <Drawer.Screen options={{
                drawerLabel: "Profile",
                drawerIcon: ({focused, color, size}) => {
                    return (<FontAwesome5 name="user-alt" size={size} color={color}/>)
                },
            }}
                           name={"Profile"}
                           component={LoginStack}/>

            <Drawer.Screen options={{
                drawerLabel: "Your Tickets",
                drawerIcon: ({focused, color, size}) => {
                    return (<FontAwesome5 name="ticket-alt" size={size} color={color}/>)
                },
            }}
                           name={"UserTicketsStack"}
                           component={UserTicketsStack}/>

            <Drawer.Screen options={{
                drawerLabel: "Schedule Notifications",
                drawerIcon: ({focused, color, size}) => {
                    return (<MaterialIcons name="schedule" size={size} color={color}/>)
                },
            }}
                           name={"ScheduleTicketsStack"}
                           component={ScheduleTicketsStack}/>

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

function LoginStack() {
    return (
        <RootStackTicketsList.Navigator screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
        }}>
            <RootStackTicketsList.Screen name="LoginScreen" component={LoginScreen}/>
            <RootStackTicketsList.Screen name="SingleTicketScreen" component={SingleTicketScreen}/>
            <RootStackTicketsList.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </RootStackTicketsList.Navigator>
    );
}


function TicketsStack() {
    return (
        <RootStackTicketsList.Navigator screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
        }}>
            <RootStackTicketsList.Screen name="AvailableTickets" component={AvailableTicketsScreen}/>
            <RootStackTicketsList.Screen name="BuyTicket" component={BuyTicketScreen}/>
            <RootStackTicketsList.Screen name="SingleTicketScreen" component={SingleTicketScreen}/>
            <RootStackTicketsList.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </RootStackTicketsList.Navigator>
    );
}

function UserTicketsStack() {
    return (
        <RootStackTicketsList.Navigator screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
        }}>
            <RootStackTicketsList.Screen name="TicketsListScreen" component={TicketsListScreen}/>
            <RootStackTicketsList.Screen name="SingleTicketScreen" component={SingleTicketScreen}/>
            <RootStackTicketsList.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </RootStackTicketsList.Navigator>
    );
}

function ScheduleTicketsStack() {
    return (
        <RootStackTicketsList.Navigator screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
        }}>
            <RootStackTicketsList.Screen name="ScheduleNotificationScreen" component={ScheduleNotificationScreen}/>
            <RootStackTicketsList.Screen name="SingleTicketScreen" component={SingleTicketScreen}/>
            <RootStackTicketsList.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </RootStackTicketsList.Navigator>
    );
}

const CustomNavigationBar: React.FC<StackHeaderProps> = ({navigation, previous, scene}) => {
    const {options} = scene.descriptor;
    const title = options.title;
    return (
        <Appbar.Header focusable style={{backgroundColor: "#E30013"}}>
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
