import {ScrollView, View} from "react-native";
import LottieView from "lottie-react-native";
import {Headline, useTheme} from "react-native-paper";
import * as React from "react";
import TicketCard from "./TicketCard";
import {TICKETS_AIRPORT, TICKETS_VISITOR} from "../../constants/Tickets";
import {MaterialCommunityIcons} from "@expo/vector-icons";


const TouristsTicketsList = () => {

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
            }}>
                <LottieView
                    style={{position: "relative", height: 60, width: 55}}
                    source={require('./../../assets/lottie/star.json')} autoPlay loop/>
                <Headline style={{color: "black"}}>Popular Visitors Tickets</Headline>

            </View>

            {[...TICKETS_AIRPORT.filter(t => t.popular), ...TICKETS_VISITOR.filter(t => t.popular)].map((ticket, index) => {
                return <TicketCard key={index} ticket={ticket}/>
            })}
        </View>

        <View style={{
            backgroundColor: colors.background,
            top: -50,
            borderWidth: 0,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                margin: 0,
                borderWidth: 0,
            }}>
                <MaterialCommunityIcons name="city" size={40} color={colors.primary}
                                        style={{padding: 10}}/>
                <Headline style={{color: colors.text}}>Visitors Tickets</Headline>

            </View>
            {TICKETS_VISITOR.map((ticket, index) => {
                return <TicketCard key={index} ticket={ticket}/>
            })}
        </View>

        <View style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 0,
            borderWidth: 0,
        }}>
            <MaterialCommunityIcons name="airplane" size={40} color={colors.primary}
                                    style={{padding: 10}}/>
            <Headline style={{color: colors.text}}>Airport Tickets</Headline>

        </View>

        {TICKETS_AIRPORT.map((ticket, index) => {
            return <TicketCard key={index} ticket={ticket}/>
        })}

    </ScrollView>
};


export default TouristsTicketsList;
