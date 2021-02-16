import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider
} from 'react-native-paper';
import LinkingConfiguration from './LinkingConfiguration';
import merge from 'deepmerge';
import DrawerNavigator from "./DrawerNavigator";

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
            text: "#FFF",
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
                {/*<RootNavigator/>*/}
                <DrawerNavigator/>
            </NavigationContainer>
        </PaperProvider>
    );
}




