import * as React from "react";
import {StyleProp, TextStyle, TouchableOpacity} from "react-native";
import {Headline, Paragraph, Surface, Title} from "react-native-paper";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {TicketType, TicketTypeEnum} from "../../constants/Tickets";
import {useNavigation} from '@react-navigation/native';

const TicketCard: React.FC<{ ticket: TicketType }> = ({ticket}) => {
    const navigation = useNavigation();

    return (<TouchableOpacity onPress={() => {
        navigation.navigate('BuyTicket', {
            ticket: ticket.id,
        });
    }}>
        <Surface style={{margin: 10, borderRadius: 15, elevation: 4, padding: 5}}>
            <Headline style={{color: "#FFF"}}>{ticket.title}</Headline>
            <Paragraph>{ticket.shortDesc}</Paragraph>
            <Title style={{color: "#FFF"}}>€{ticket.price}</Title>
            <CardIcon type={ticket.type}/>
        </Surface>
    </TouchableOpacity>)
}

export const CardIcon: React.FC<{ type: TicketTypeEnum }> = ({type}) => {
    let iconStyle: StyleProp<TextStyle> = {position: "absolute", bottom: 0, right: 0, opacity: 0.2};
    const size = 100;
    const color = "black";
    switch (type) {
        case TicketTypeEnum.TIME:
            return <MaterialCommunityIcons name="clock-outline" size={size} color={color}
                                           style={iconStyle}/>;
        case TicketTypeEnum.VISITOR:
            return <MaterialCommunityIcons name="clock-outline" size={size} color={color}
                                           style={iconStyle}/>;
        case TicketTypeEnum.STUDENT:
            return <MaterialCommunityIcons name="clock-outline" size={size} color={color}
                                           style={iconStyle}/>;
        case TicketTypeEnum.SCHOOL:
            return <MaterialCommunityIcons name="clock-outline" size={size} color={color}
                                           style={iconStyle}/>;
        case TicketTypeEnum.SINGLE:
            return <MaterialCommunityIcons name="arrow-right-bold-circle-outline" size={size} color={color}
                                           style={iconStyle}/>;
        case TicketTypeEnum.AIRPORT:
            return <MaterialCommunityIcons name="clock-outline" size={size} color={color}
                                           style={iconStyle}/>;
        default:
            return <MaterialCommunityIcons name="clock-outline" size={size} color={color}
                                           style={iconStyle}/>;

    }
}

export default TicketCard;
