import {ScrollView, View} from "react-native";
import LottieView from "lottie-react-native";
import {Headline, useTheme} from "react-native-paper";
import * as React from "react";
import TicketCard from "./TicketCard";
import {TICKETS_SINGLE, TICKETS_TIME} from "../../constants/Tickets";
import {MaterialCommunityIcons} from "@expo/vector-icons";


const QuickRideTicketsList = () => {

    const {colors} = useTheme();

    return <ScrollView style={{flex: 1}}>
        <View style={{
            backgroundColor: "#FFF",
            paddingBottom: 50,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFF",
                margin: 0,
                borderWidth: 0,
                // borderBottomLeftRadius: 15,
                // borderBottomRightRadius: 15
            }}>
                <LottieView
                    style={{position: "relative", height: 60, width: 55}}
                    source={require('./../../assets/lottie/star.json')} autoPlay loop/>
                <Headline style={{color: "black"}}>Popular Quick Ride Tickets</Headline>

            </View>

            {[...TICKETS_SINGLE.filter(t => t.popular), ...TICKETS_TIME.filter(t => t.popular)].map((ticket, index) => {
                return <TicketCard key={index} ticket={ticket}/>
            })}
        </View>

        <View style={{
            backgroundColor: colors.background,
            top: -50,
            // marginTop: 15,
            borderWidth: 0,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "#FFF",
                margin: 0,
                borderWidth: 0,
                // borderBottomLeftRadius: 15,
                // borderBottomRightRadius: 15
            }}>
                <MaterialCommunityIcons name="clock-outline" size={40} color={colors.primary}
                                        style={{padding: 10}}/>
                <Headline style={{color: colors.text}}>Time Tickets</Headline>

            </View>
            {TICKETS_TIME.map((ticket, index) => {
                return <TicketCard key={index} ticket={ticket}/>
            })}
        </View>

        <View style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 0,
            borderWidth: 0,
        }}>
            <MaterialCommunityIcons name="clock-outline" size={40} color={colors.primary}
                                    style={{padding: 10}}/>
            <Headline style={{color: colors.text}}>Single Ride Tickets</Headline>

        </View>

        {TICKETS_SINGLE.map((ticket, index) => {
            return <TicketCard key={index} ticket={ticket}/>
        })}

    </ScrollView>
};


export default QuickRideTicketsList;
