import {DarkTheme as NavigationDarkTheme, NavigationContainer,} from '@react-navigation/native';
import * as React from 'react';
import {DarkTheme, DarkTheme as PaperDarkTheme, Provider as PaperProvider} from 'react-native-paper';
import LinkingConfiguration from './LinkingConfiguration';
import DrawerNavigator from "./DrawerNavigator";
import {AlertProvider} from '../context/AlertContext';
import SnackBar from '../components/SnackBar';


export const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    roundness: 10,
    colors: {
        ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors, ...{
            primary: "#E30013",
            background: "#131313",
            surface: "#E30013",
            // accent: "yellow",
            text: "#FFF",
        }
    },
};


export default function Navigation() {
    return (

        <PaperProvider theme={{
            ...DarkTheme,
            roundness: 10,
            colors: {
                ...DarkTheme.colors,
                primary: "#E30013",
                background: "#131313"
            },
        }}>
            <AlertProvider>

                <NavigationContainer
                    linking={LinkingConfiguration}
                    theme={CombinedDarkTheme}>
                    <DrawerNavigator/>
                </NavigationContainer>
                <SnackBar/>
            </AlertProvider>
        </PaperProvider>

    );
}




