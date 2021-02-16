import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import QuickRideTicketsList from './QuickRideTicketsList';


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

    )
}


export default AvailableTicketsScreen;
