import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import LottieView from "lottie-react-native";

const DrawerContent: React.FC<{ drawerProps: React.ComponentProps<typeof DrawerItemList> }> = ({drawerProps}) => {

    return (
        <>
            <DrawerContentScrollView {...drawerProps}>

                <View
                    style={{top: -40}}
                >
                    <LottieView
                        style={{position: "relative", height: 200}}
                        source={require('./../assets/lottie/bus.json')} autoPlay loop/>
                </View>
                <View
                    style={
                        styles.drawerContent
                    }
                >
                    <DrawerItemList
                        {...drawerProps}
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
