import * as React from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';

export const LAYOUT_STYLE: StyleProp<ViewStyle> = {flex: 1, maxWidth: 600, alignSelf: "center"};
const ScreensLayout: React.FC = ({children}) => {

    return <ScrollView style={{flex: 1}}>{children}</ScrollView>
}

export default ScreensLayout;
