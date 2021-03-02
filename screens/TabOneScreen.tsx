import * as React from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';

export default function TabOneScreen() {
    return (
        <View>
            <Text>Tab One</Text>
            <EditScreenInfo path="rrrr"/>
        </View>
    );
}
