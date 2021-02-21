import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import {
    DarkTheme,
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider
} from 'react-native-paper';
import LinkingConfiguration from './LinkingConfiguration';
import merge from 'deepmerge';
import DrawerNavigator from "./DrawerNavigator";
import {AlertProvider} from '../context/AlertContext';
import SnackBar from '../components/SnackBar';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);


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
            // placeholder: "red"
        }
    },
};
// theme={
//     dark
//     ? {
//         ...DarkTheme,
//         roundness: 10,
//         colors: {
//             ...DarkTheme.colors,
//             // primary: '#F59E00',
//             // accent: '#FBBE5E',
//         },
//     }
//     : {
//         ...DefaultTheme,
//         roundness: 10,
//         colors: {
//             ...DefaultTheme.colors,
//             // primary: '#F59E00',
//             // accent: '#FBBE5E',
//         },
//     }
// }


export default function Navigation() {
    return (

        <PaperProvider theme={{
            ...DarkTheme,
            roundness: 10,
            colors: {
                ...DarkTheme.colors,
                primary: "#E30013",
                background: "#131313",
                // surface: "#E30013",
                // accent: "yellow",
                // text: "#FFF",
                // error: string;
                // onSurface: "yellow",
                // onBackground: string;
                // disabled: string;
                // placeholder: "yellow",
                // backdrop: "yellow",
                // notification: string;
            },
        }}>
            <AlertProvider>

                <NavigationContainer
                    linking={LinkingConfiguration}
                    theme={CombinedDarkTheme}>
                    {/*<RootNavigator/>*/}
                    <DrawerNavigator/>
                </NavigationContainer>
                <SnackBar/>
            </AlertProvider>
        </PaperProvider>

    );
}




