import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import * as React from 'react';
import {
    Appbar,
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider
} from 'react-native-paper';
import {Image} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import merge from 'deepmerge';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);


export const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors, ...{
            primary: "#E30013",
            background: "#131313",
            surface: "#E30013",
            // accent: "yellow",
            // text: "white",
            // placeholder: "red"
        }
    },
};


export default function Navigation() {
    return (
        <PaperProvider theme={CombinedDarkTheme}>
            <NavigationContainer
                linking={LinkingConfiguration}
                theme={CombinedDarkTheme}>
                <RootNavigator/>
            </NavigationContainer>
        </PaperProvider>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
        }}>
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}

const CustomNavigationBar: React.FC<StackHeaderProps> = ({navigation, previous, scene}) => {
    const {options} = scene.descriptor;
    const title = options.title;
    return (
        <Appbar.Header focusable>
            {previous ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
            <Appbar.Content focusable title={title}/>
            <Image source={require('./../assets/images/wl-logo.png')}
                   style={{resizeMode: "contain", width: 200, height: 55}}
            />
        </Appbar.Header>
    );
}
