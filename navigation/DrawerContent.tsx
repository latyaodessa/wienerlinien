import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import LottieView from "lottie-react-native";

const DrawerContent: React.FC<{ drawerProps: React.ComponentProps<typeof DrawerItemList> }> = ({drawerProps}) => {

    return (
        <>
            <DrawerContentScrollView {...drawerProps}>

                <View
                    // style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
                    style={{top: -40}}
                >
                    <LottieView
                        style={{position: "relative"}}
                        source={require('./../assets/lottie/bus.json')} autoPlay loop/>
                </View>
                <View
                    style={
                        styles.drawerContent
                    }
                >
                    {/*<LottieView*/}
                    {/*    style={{position: "relative", top: -5}}*/}
                    {/*    source={require('./../assets/lottie/header.json')} autoPlay loop/>*/}

                    <DrawerItemList
                        {...drawerProps}
                        // labelStyle={drawerBar.labelStyle ? drawerBar.labelStyle as StyleProp<any> : undefined}
                        // activeTintColor={drawerBar.activeTintColor ? drawerBar.activeTintColor : undefined}
                        // activeBackgroundColor={drawerBar.activeBackgroundColor ? drawerBar.activeBackgroundColor : undefined}
                        // inactiveTintColor={drawerBar.inactiveTintColor ? drawerBar.inactiveTintColor : undefined}
                        // inactiveBackgroundColor={drawerBar.inactiveBackgroundColor ? drawerBar.inactiveBackgroundColor : undefined}
                    />


                </View>

            </DrawerContentScrollView>


        </>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        zIndex: 9999,
        top: -25
    },
});
export default DrawerContent;
